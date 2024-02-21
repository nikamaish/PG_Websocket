const express = require ('express');

const app = express();

const http = require('http')


const server = http.createServer(app);

app.use (express.static('/public')); // why we wrote this line?  // to serve static files
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