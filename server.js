const express = require('express')
const db = require("./db.js")
const path = require('path')
const { Socket } = require('socket.io')
const app = express()

const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname,'public')))
app.set('views',path.join(__dirname,'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/',(req, res)=>{
    res.render('index.html')
})

//let messages = []

io.on('connection', socket => {
    console.log(`Socket Conectado ${socket.id}`);

    (async ()=>{
        const ms = await db.selectMessage();
        socket.emit('previousMessage', ms)
        // for(messages of ms){

        // }
    })();



    socket.on('sendMessage', data => {
        console.log(data.author)
        //messages.push(data)
        console.log('Começou!');
        console.log('INSERT INTO CLIENTES');
        (async () =>{
            const result = await db.insertMessage({author: data.author, message: data.message, color: data.color});
            const last = await db.selectLastMessage()
            var messageObject = {
                author: last[0].author,
                message: last[0].message,
                color: last[0].color
            }
            console.log("sonsole dentro do server"+messageObject)
            socket.broadcast.emit('receivedMessage',messageObject);
        })()
        
    })
})

server.listen(process.env.PORT || 3000)