const FeedBackModel = require('../models/feedback.model');
const HttpException = require('../utils/HttpException.utils');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
dotenv.config();

/******************************************************************************
 *                              Controller
 ******************************************************************************/

class FeedBackController {
  assignForFeedback = async (req, res, next) => {
    const { body } = req;
    const { given_by_user_ids, assigned_on } = body;
    let records = [];
    const user_id = req.params.id;
    
    given_by_user_ids.map(given_by_user_id => {
      const id = uuidv4()
      records.push([id, user_id, given_by_user_id, assigned_on])
    })

    const result = await FeedBackModel.assign(records);

    if (!result) {
      throw new HttpException(500, 'Something went wrong');
    }

    res.status(201).send({ status: 'success', message: 'Feedback assigned!' });
  }

  createFeedback = async(req, res, next) => {
    const { body } = req;
    const result = await FeedBackModel.submit(body, req.params.id);

    if (!result) {
      throw new HttpException(404, 'Something went wrong');
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows ? 'Feedback not found' :
      affectedRows && changedRows ? 'Feedback submitted' : 'submission failed';

    const status = !affectedRows ? 'failed' :
      affectedRows && changedRows ? 'success' : 'failed';

    res.send({ message, info, status });
  }

  fetchFeedback = async (req, res, next) => {
    const user_id = req.params.id;
    
    const response = await FeedBackModel.fetchUserReviewFeedback({ id: user_id});
    
    if(response.length) {
      let feedbacks = response.map(f => ({ 
        id: f.id, 
        given_by_user_id: f.given_by_user_id,
        given_by_user: f.given_by_user,
        given_by_user_email: f.given_by_user_email, 
        feedback: f.feedback, 
        assigned_on: f.assigned_on,
        created_on: f.created_on
      }))
      
      let userReviewFeedback = {
        user_id: response[0].user_id,
        name: response[0].name,
        email: response[0].email,
        feedbacks
      }

      res.send({ userReviewFeedback, status: 'success' });
    }

    else res.send({ userReviewFeedback: [], user_id, status: 'failed' });

  }

  askedForFeedback = async (req, res, next) => {
    const user_id = req.params.id;
    const asked_for_feedback = await FeedBackModel.askedForFeedback({ id: user_id });

    res.send({ asked_for_feedback });
  }

  
}


module.exports = new FeedBackController;