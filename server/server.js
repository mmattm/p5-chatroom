const express = require("express");
const socket = require("socket.io");
const app = express();
let Player = require("./Player");
let Message = require("./Message");

let server = app.listen(3000);
console.log("The server is now running");

app.use(express.static("public"));

let io = socket(server);

let players = [];
let messages = [];

setInterval(updateGame, 16);

io.sockets.on("connection", socket => {
  console.log(`New connection ${socket.id}`);
  players.push(new Player(socket.id));

  // socket.on("update player", data =>
  //   socket.broadcast.emit("update player", data)
  // );

  //socket.on("update game", data => socket.broadcast.emit("update game", data));

  socket.on("disconnect", () => {
    io.sockets.emit("disconnect", socket.id);
    players = players.filter(player => player.id !== socket.id);
  });

  socket.on("updatePlayerName", data => {
    console.log("update player");
    console.log(data);
    //console.log(players.find(player => player.id === data.id));

    let foundIndex = players.findIndex(player => player.id === data.id);

    players[foundIndex].name = data.name;
  });

  socket.on("newMessage", data => {
    console.log("New message from " + data.authorId);
    console.log(data);

    messages.push(
      new Message(
        messages.length,
        data.timestamp,
        data.content,
        data.authorId,
        data.authorName
      )
    );
  });
});

io.sockets.on("disconnect", socket => {
  io.sockets.emit("disconnect", socket.id);
  players = players.filter(player => player.id !== socket.id);
});

function updateGame() {
  data = {
    players: players,
    messages: messages
  };
  io.sockets.emit("heartbeat", data);
}
