const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback.controller');
const awaitHandler = require('../middleware/awaitHandler.middleware');
const auth = require('../middleware/auth.middleware');

const {
  createFeedback
} = feedbackController

// feedback routes
router.patch('/id/:id', auth(), awaitHandler(createFeedback));

module.exports = router;