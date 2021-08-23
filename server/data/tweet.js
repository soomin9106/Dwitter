import { db } from '../db/database.js';


const SELECT_JOIN = 'SELECT tw.id,tw.text,tw.createdAt,tw.userId,us.username,us.name,us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id';
const ORDER_DESC = 'ORDER BY tw.createdAt DESC';
export async function getAll() {
   return db
   .execute(`${SELECT_JOIN} ${ORDER_DESC}`)
   .then(result => {return result[0]});
}

export async function getAllByUserName(username){
    return db
    .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`,[username])
    .then(result => {return result[0]});
}

export async function getAllById(id){
    return db
    .execute(`${SELECT_JOIN} WHERE tw.id=?`,[id])
    .then(result => {return result[0][0]});
}

export async function create(text,userId){
    return db.execute(
        'INSERT INTO tweets (text,createdAt,userId) VALUES (?,?,?)',
        [text,new Date(),userId]
    )
    .then((result) => {
        getAllById(result[0].insertId)
    });
}

export async function update(id, text) {
    return db.execute(
        'UPDATE tweets SET text=? WHERE id=?',
        [text,id]
    )
    .then(() => getAllById(id));
}

export async function remove(id) {
   return db.execute('DELETE FROM tweets WHERE id=?',[id]);
}