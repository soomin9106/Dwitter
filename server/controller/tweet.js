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
    const {text,userId} =req.body;
    const tweet = await tweetRepository.create(text,userId);
    res.status(201).json(tweet);
}

export async function updateTweet(req,res){
    const id = req.params.id;
    const text =req.body.text;
    const tweet = await tweetRepository.update(id, text);
    if(tweet){
        res.status(201).json(tweet);
    } else {
        res.status(404).json({message : `Tweet id(${id}) not found!`});
    }
}

export async function removeTweet(req,res){
    const id = req.params.id;
    await tweetRepository.remove(id);
    res.sendStatus(204);
}