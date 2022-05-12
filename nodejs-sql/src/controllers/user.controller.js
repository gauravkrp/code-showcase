const UserModel = require('../models/user.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
dotenv.config();

const secretKey = process.env.SECRET_JWT || "";

/******************************************************************************
 *                              User Controller
 ******************************************************************************/

class UserController {
  getAllUsers = async (req, res, next) => {
    let userList = await UserModel.find();
    if (!userList.length) {
      throw new HttpException(404, 'Users not found');
    }

    userList = userList.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    });

    res.send(userList);
  };

  getUserById = async (req, res, next) => {
    const user = await UserModel.findOne({ id: req.params.id });
    if (!user) {
      throw new HttpException(404, 'User not found');
    }

    const { password, ...userWithoutPassword } = user;

    res.send(userWithoutPassword);
  };

  getUserByEmail = async (req, res, next) => {
    const user = await UserModel.findOne({ email: req.params.email });
    if (!user) {
      throw new HttpException(404, 'User not found');
    }

    const { password, ...userWithoutPassword } = user;

    res.send(userWithoutPassword);
  };

  getCurrentUser = async (req, res, next) => {
    const { password, ...userWithoutPassword } = req.currentUser;

    res.send(userWithoutPassword);
  };

  createUser = async (req, res, next) => {
    this.checkValidation(req);      

    await this.hashPassword(req);

    const { body } = req;
    const id = uuidv4()
    body.id = id;

    const result = await UserModel.create(body);
    console.log(result);
    if (!result) {
      throw new HttpException(500, 'Something went wrong');
    }

    res.status(201).send({status: 'success', message: 'User was created!', user: body});
  };

  updateUser = async (req, res, next) => {
    this.checkValidation(req);

    await this.hashPassword(req);
    const { body } = req;
    // do the update query and get the result
    // it can be partial edit
    const result = await UserModel.update(body, req.params.id);

    if (!result) {
      throw new HttpException(404, 'Something went wrong');
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows ? 'User not found' :
      affectedRows && changedRows ? 'User updated successfully' : 'Updated failed';

    const status = !affectedRows ? 'failed' :
      affectedRows && changedRows ? 'success' : 'failed';

    res.send({ message, info, status });
  };

  deleteUser = async (req, res, next) => {
    const result = await UserModel.delete(req.params.id);
    if (!result) {
      throw new HttpException(404, 'User not found');
    }
    res.send({ status: 'success', message: 'User was deleted!' });
  };

  userLogin = async (req, res, next) => {
    this.checkValidation(req);

    const { email, password: pass } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new HttpException(401, 'Unable to login!');
    }
    
    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      throw new HttpException(401, 'Incorrect password!');
    }

    // user matched!
    const token = jwt.sign({ user_id: user.id.toString() }, secretKey, {
      expiresIn: '24h'
    });

    const { password, ...userWithoutPassword } = user;

    res.send({ ...userWithoutPassword, token });
  };

  checkValidation = (req) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new HttpException(400, 'Validation failed', errors);
    }
  }

  // hash password if it exists
  hashPassword = async (req) => {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 8);
    }
  }
}


module.exports = new UserController;