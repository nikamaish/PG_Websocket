const express = require ('express');

const app = express();

const http = require('http')


const server = http.createServer(app);


server.listen(5000,()=>{

    console.log('server is running on port 9000')
})