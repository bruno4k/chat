
async function connect() {
    if(global.connection && global.connection.state !== 'disconnected'){
        return global.connection
    }
    const mysql = require("mysql2/promise")

    const connection = await mysql.createConnection("mysql://bcbe5bdb5fc06e:05367b77@us-cdbr-east-06.cleardb.net/heroku_0f212a5c8cb0feb");
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     password: '',
    //     database: 'chat'
    // })
    console.log("conectou no mysql")
    global.connection = connection
    return connection
}
connect()

async function insertMessage(message){
    const conn = await connect();
    const sql = 'INSERT INTO messages(author,message,color) VALUES (?,?,?);';
    const values = [message.author, message.message, message.color];
    return await conn.query(sql, values);
}

// async function selectMessage(){
//     const conn = await connect()
//     const [rows] = await conn.query('SELECT * FROM messages;')
//     return rows
// }

async function selectMessage(){
    const conn = await connect()
    const [rows] = await conn.query('SELECT * FROM messages;')
    //console.log(rows)
    return rows
}   

async function selectLastMessage(){
    const conn = await connect()
    const [last] = await conn.query('SELECT * FROM messages where id = (select max(id) from messages)')
    console.log("console dentro do db.js"+last[0])
    return last
} 

setInterval(function () {
    connection.query('SELECT 1');
}, 5000);

module.exports = {insertMessage, selectMessage, selectLastMessage}
