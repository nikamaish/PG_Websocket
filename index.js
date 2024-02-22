// Your server-side code for personal chat
const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Keep track of connected users and their socket IDs
const users = new Map();

// Socket.io
io.on("connection", (socket) => {
  socket.on("join", (username) => {
    users.set(socket.id, username);
    io.emit("user-list", Array.from(users.values()));
  });

  socket.on("user-message", (data) => {
    const { recipient, message } = data;
    const sender = users.get(socket.id);

    const recipientSocketId = Array.from(users.entries()).find(([id, name]) => name === recipient)?.[0];
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("message", { sender, recipient, message });
    }

    io.to(socket.id).emit("message", { sender, recipient, message });
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


