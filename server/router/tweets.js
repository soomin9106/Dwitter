import express from 'express'
import 'express-async-errors';
import * as tweetRepository from '../data/tweet.js';


const router =  express.Router();

//GET /tweets
//GET /tweets?username=:username
router.get('/',(req,res,next) => {
    const username=req.query.username;
    const data = username 
    ? tweetRepository.getAllByUserName(username)
    : tweetRepository.getAll();
    res.status(200).json(data);
});
//GET /tweets/:id
router.get('/:id', (req,res,next) => {
    const id = req.params.id;
    const data = tweetRepository.getAllById(id);
    if(data){
        res.status(200).json(data);
    } else{
        res.status(404).json({message : `Tweet id(${id}) not found!`});
    }
    
})
//POST /tweets
router.post('/', (req,res,next) => {
    const {text,name, username} =req.body;
    const tweet = tweetRepository.create(text,name,username);
    res.status(201).json(tweet);
});
//PUT /tweets/id
router.put('/:id',(req,res,next) => {
    const id = req.params.id;
    const text =req.body.text;
    const tweet = tweetRepository.update(id, text);
    if(tweet){
        res.status(201).json(tweet);
    } else {
        res.status(404).json({message : `Tweet id(${id}) not found!`});
    }
});
//DELETE /tweets/1
router.delete('/:id',(req,res,next) => {
    const id = req.params.id;
    tweetRepository.remove(id);
    res.sendStatus(204);
});
export default router;