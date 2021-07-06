import express from 'express'
import 'express-async-errors';

let tweets =[
    {
        id : '1',
        text : "back-end is so hard,, but fun!", 
        createdAt : Date.now().toString(),
        name : "Daisy",
        username : "DaisyPretty",
        url : "https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg"
    },
    {
        id : '2',
        text : "front-end is sooo good!", 
        createdAt : Date.now().toString(),
        name : "Bob",
        username : "bobbob",
        url : "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4-300x300.png"
    }
]
const router =  express.Router();

//GET /tweets
//GET /tweets?username=:username
router.get('/',(req,res,next) => {
    const username=req.query.username;
    const data = username ? tweets.filter(t => t.username === username)
    : tweets;
    res.status(200).json(data);
});
//GET /tweets/:id
router.get('/:id', (req,res,next) => {
    const id = req.params.id;
    const data = tweets.find(t => t.id === id);
    if(data){
        res.status(200).json(data);
    } else{
        res.status(404).json({message : `Tweet id(${id}) not found!`});
    }
    
})
//POST /tweets
router.post('/', (req,res,next) => {
    const {text,name, username} =req.body;
    const tweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date(),
        name,
        username,
    };
    tweets = [tweet,...tweets];
    res.status(201).json(tweet);
});
//PUT /tweets/id
router.put('/:id',(req,res,next) => {
    const id = req.params.id;
    const tweet = tweets.find(t => t.id === id);
    if(tweet){
        const {text} =req.body;
        tweet.text = text;
        res.status(201).json(tweet);
    } else {
        res.status(404).json({message : `Tweet id(${id}) not found!`});
    }
});
//DELETE /tweets/1
router.delete('/:id',(req,res,next) => {
    const id = req.params.id;
    tweets = tweets.filter(t => t.id !== id);
    res.sendStatus(204);
});
export default router;