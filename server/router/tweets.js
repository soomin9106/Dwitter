import express from 'express'
import 'express-async-errors';
import * as tweetController from '../controller/tweet.js';
import { body,param,validationResult } from 'express-validator';
import { validate } from '../middleware/validator.js';


const router =  express.Router();

//validate tweets.
const validateTweet = [
    body('text')
    .trim()
    .isLength({min:4})
    .withMessage('text should be at least 4 characters.'),
    validate,
];



//GET /tweets
//GET /tweets?username=:username
router.get('/',tweetController.getTweets);
//GET /tweets/:id
router.get('/:id', tweetController.getTweetsById)
//POST /tweets
router.post('/',validateTweet,tweetController.createTweet);
//PUT /tweets/id
router.put('/:id',validateTweet,tweetController.updateTweet);
//DELETE /tweets/1
router.delete('/:id',tweetController.removeTweet);
export default router;