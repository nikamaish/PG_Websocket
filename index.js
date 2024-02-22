// 
const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Keep track of connected users
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

    // Send the message only to the recipient
    const recipientSocketId = Array.from(users.entries()).find(([id, name]) => name === recipient)?.[0];
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("message", { sender, message });
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








