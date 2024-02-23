// Your server-side code for personal chat
const http = require("http");
const express = require("express");
const app = express();

const path = require("path");
const { Server } = require("socket.io");
// it is class of this socket.io library which is used to create the server.


const server = http.createServer(app); 
// why used http.createServer(app) because we are using express and express is built on top of http module so we need to create the server using http module.
const io = new Server(server);  // 
// it is used to create the server and pass the server object to the socket.io server.

const IORedis = require("ioredis");
const redisClient = new IORedis(); // create a new ioredis client

// Keep track of connected users and their socket IDs
const users = new Map();
// it will store the user name and socket id of the user who is connected to the server.

// Socket.io
io.on("connection", (socket) => {
  socket.on("join", (username) => {
    users.set(socket.id, username);
    io.emit("user-list", Array.from(users.values()));
  });

  socket.on("user-message", async (data) => {
    const { recipient, message } = data;
    const sender = users.get(socket.id);

    const recipientSocketId = Array.from(users.entries()).find(([id, name]) => name === recipient)?.[0];
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("message", { sender, recipient, message });
    }

    io.to(socket.id).emit("message", { sender, recipient, message });

    // Store the message in Redis using ioredis
    try {
      await redisClient.rpush(sender, JSON.stringify({ recipient, message }));
      await redisClient.rpush(recipient, JSON.stringify({ sender, message }));
    } catch (error) {
      console.error("Error storing message in Redis:", error);
    }
  });

  socket.on("disconnect", () => {
    users.delete(socket.id);
    io.emit("user-list", Array.from(users.values()));
  });
});


app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

server.listen(9000, () => console.log(`Server Started at PORT:9000`));






// for group chat ///

// 
// const http = require("http");
// const express = require("express");
// const path = require("path");
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// // Socket.io
// io.on("connection", (socket) => {
//   socket.on("user-message", (message) => {
//     io.emit("message", message);
//   });
// });

// app.use(express.static(path.resolve("./public")));

// app.get("/", (req, res) => {
//   return res.sendFile("/public/index.html");
// });

// server.listen(9000, () => console.log(`Server Started at PORT:9000`));


