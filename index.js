// library
const express = require("express");
const socketio = require("socket.io");
const http = require("http");

//instance
const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: "*" } });

// End point
app.get("/", (req, res) => {
  res.json("Api is working");
});

// handle user
let users = [];

const addUsers = (id, username, room) => {
  // check username and room is empty
  if (username || room) {
    return { error: "Name and Room are required." };
  }

  if (users.length) {
    // check user already exists
    const data = users.find(
      (user) => user.username === username && user.room === room
    );

    if (data) {
      return { error: "user already exist" };
    }
  }

  const response = { id, username, room };

  users.push(response);

  console.log(users);

  return { response };
};

// socket
io.on("connect", (socket) => {
  console.log("Connected");

  //get user and room
  socket.on("join", ({ username, room }, callback) => {
    console.log(username, room);
  });

  socket.on("disconnect", () => {
    console.log("Disconnect");
  });
});

server.listen(5000, () => console.log("Server Started....."));
