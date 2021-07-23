import * as userRepository from './auth.js';
let tweets =[
    {
        id : '1',
        text : "back-end is so hard,, but fun!", 
        createdAt : new Date().toString(),
        userId:'1',
    },
    {
        id : '2',
        text : "front-end is sooo good!", 
        createdAt : new Date().toString(),
        userId:'1',
    }
];

export async function getAll() {
    return Promise.all(
        tweets.map(async (tweet) => {
            const {username,name,url} =await userRepository.findById(
                tweet.userId
            );
            return {...tweets,username,name,url};
        })
    );
}

export async function getAllByUserName(username){
    return getAll()
    .then((tweets) => tweets.filter((tweet) => tweet.username === username));
}

export async function getAllById(id){
    const found = tweets.find((tweet) => tweet.id === id);
    if(!found){
        return null;
    } 
    const {username,name,url} =await userRepository.findById(found.userId);
    return {...found,username,name,url};
}

export async function create(text,userId){
    const tweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date(),
        userId,
    };
    tweets = [tweet,...tweets];
    return getAllById(tweet.id);
}

export async function update(id, text) {
    const tweet=tweets.find((tweet) => tweet.id === id);
    if(tweet){
        tweet.text=text;
    }
    return getAllById(tweet.id);
}

export async function remove(id) {
    tweets = tweets.filter((tweet) => tweet.id !== id);
}