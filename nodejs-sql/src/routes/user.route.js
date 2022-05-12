const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const feedBackController = require('../controllers/feedback.controller');
const awaitHandler = require('../middleware/awaitHandler.middleware');
const auth = require('../middleware/auth.middleware');

const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');
const {
  getAllUsers,
  getUserById,
  getUserByEmail,
  getCurrentUser,
  createUser,
  updateUser,
  deleteUser,
  userLogin  
} = userController

const { fetchFeedback, assignForFeedback, askedForFeedback } = feedBackController

router.post('/login', validateLogin, awaitHandler(userLogin)); // login route

// user spec routes
router.get('/', auth(true), awaitHandler(getAllUsers));
router.get('/id/:id', auth(), awaitHandler(getUserById));
router.get('/email/:email', auth(), awaitHandler(getUserByEmail));
router.get('/me', auth(), awaitHandler(getCurrentUser));
router.post('/', auth(true),  createUserSchema, awaitHandler(createUser));
router.patch('/id/:id', auth(), updateUserSchema, awaitHandler(updateUser)); // using patch for partial update
router.delete('/id/:id', auth(true), awaitHandler(deleteUser));

// user specific but feedback routes
router.post('/id/:id/feedback/assign', auth(), awaitHandler(assignForFeedback));
router.get('/id/:id/feedback/asked', auth(), awaitHandler(askedForFeedback));
router.get('/id/:id/feedback', auth(), awaitHandler(fetchFeedback));


module.exports = router;