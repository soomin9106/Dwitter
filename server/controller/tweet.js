import { getSocketIO } from '../connection/socket.js';
import * as tweetRepository from '../data/tweet.js';

export async function getTweets(req,res){
    const username=req.query.username;
    const data = await(username 
        ? tweetRepository.getAllByUserName(username)
        : tweetRepository.getAll());
    res.status(200).json(data);
}

export async function getTweetsById(req,res){
    const id = req.params.id;
    const data = await tweetRepository.getAllById(id);
    if(data){
        res.status(200).json(data);
    } else{
        res.status(404).json({message : `Tweet id(${id}) not found!`});
    }
    
}

export async function createTweet(req,res) {
    const {text} =req.body;
    const tweet = await tweetRepository.create(text,req.userId);
    res.status(201).json(tweet);
    getSocketIO().emit('tweets',tweet);
}

export async function updateTweet(req,res){
    const id = req.params.id;
    const text =req.body.text;
    const tweet = await tweetRepository.getAllById(id);
    if (!tweet) {
        return res.status(404).json({ message: `Tweet not found: ${id}` });
      }
      if (tweet.userId !== req.userId) { //로그인 된 사용자이지만 특별한 권한이 없을 때 
        return res.sendStatus(403);
      }
      const updated = await tweetRepository.update(id, text);
      return res.status(200).json(updated);
}

export async function removeTweet(req,res){
    const id = req.params.id;
    const tweet = await tweetRepository.getAllById(id);
    if(!tweet){
        return res.sendStatus(404);
    } 
    if(tweet.userId !== req.userId){
        return res.sendStatus(403);
    }
    await tweetRepository.remove(id);
    return res.status(204);
}