import express from 'express'
import 'express-async-errors';
import * as tweetController from '../controller/tweet.js';


const router =  express.Router();

//GET /tweets
//GET /tweets?username=:username
router.get('/',tweetController.getTweets);
//GET /tweets/:id
router.get('/:id', tweetController.getTweetsById)
//POST /tweets
router.post('/', tweetController.createTweet);
//PUT /tweets/id
router.put('/:id',tweetController.updateTweet);
//DELETE /tweets/1
router.delete('/:id',tweetController.removeTweet);
export default router;