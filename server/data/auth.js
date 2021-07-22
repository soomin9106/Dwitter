//data
let users = [
    {
        id : '1',
        username : 'bob',
        password : '$2b$12$SoFQ.gPbgXhE7vBGxEywt.6SZfPqhYc.thkY1coB2ERrKJO2sJk3a',
        name :'Bob John',
        email:'bobbob@naver.com',
        url :'',
    },
]


export async function findByUsername(username) {
    return users.find((user) => user.username === username);
}

export async function createUser(user){
    const created = {...user,id:Date.now().toString()};
    users.push(created);
    return created.id;
}