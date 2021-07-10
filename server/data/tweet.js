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
];

export function getAll() {
    return tweets;
}

export function getAllByUserName(username){
    return tweets.filter((tweet) => tweet.username === username);
}

export function getAllById(id){
    return tweets.find((tweet) => tweet.id === id);
}

export function create(text,name,username){
    const tweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date(),
        name,
        username,
    };
    tweets = [tweet,...tweets];
    return tweet;
}

export function update(id, text) {
    const tweet=tweets.find((tweet) => tweet.id === id);
    if(tweet){
        tweet.text=text;
    }
    return tweet;
}

export function remove(id) {
    tweets = tweets.filter((tweet) => tweet.id !== id);
}