const express = require ('express');

const app = express();

const http = require('http')

const server = http.createServer(app);

const { Server } = require('socket.io');
// why we wrote this line? // to import the Server class from the socket.io package

const io = new Server(server);

// all the socket.io logic will go here and all the http request will handled by express

io.on('connection',(socket)=>{
    // console.log('A user connected', socket.id);

    socket.on('user-message', (message)=>{
        console.log('A new user message', message);
    })
})









app.use (express.static('public')); // why we wrote this line?  // to serve static files
// static files are files that don't change, such as images, CSS, and JavaScript files.

const port = process.env.PORT || 5000;
// why process.env.PORT? // to get the port from the environment variable, but i dont have any environment variable so it will use 5000 as default port



app.get('/',(req,res)=>{
    return res.sendFile(__dirname + '/public/index.html')
    // why __dirname? // to get the absolute path of the directory where the currently executing script is located
})



server.listen(5000,()=>{

    console.log(`server is running on ${port}`)
    
})