const EmployeeModel = require('../models/employee.model');
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
    let userList = await EmployeeModel.find();
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
    const user = await EmployeeModel.findOne({ id: req.params.id });
    if (!user) {
      throw new HttpException(404, 'User not found');
    }

    const { password, ...userWithoutPassword } = user;

    res.send(userWithoutPassword);
  };

  getUserByEmail = async (req, res, next) => {
    const user = await EmployeeModel.findOne({ email: req.params.email });
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

    const result = await EmployeeModel.create(body);

    if (!result) {
      throw new HttpException(500, 'Something went wrong');
    }

    res.status(201).send('User was created!');
  };

  updateUser = async (req, res, next) => {
    this.checkValidation(req);

    await this.hashPassword(req);

    // do the update query and get the result
    // it can be partial edit
    const result = await EmployeeModel.update(body, req.params.id);

    if (!result) {
      throw new HttpException(404, 'Something went wrong');
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows ? 'User not found' :
      affectedRows && changedRows ? 'User updated successfully' : 'Updated faild';

    res.send({ message, info });
  };

  deleteUser = async (req, res, next) => {
    const result = await EmployeeModel.delete(req.params.id);
    if (!result) {
        throw new HttpException(404, 'User not found');
    }
    res.send('User has been deleted');
  };

  userLogin = async (req, res, next) => {
    this.checkValidation(req);

    console.log(req.body)
    const { email, password: pass } = req.body;

    const user = await EmployeeModel.findOne({ email });

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
      throw new HttpException(400, 'Validation faild', errors);
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