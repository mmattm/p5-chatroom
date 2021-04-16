const socket = io.connect(address);

let players = [];
let messages = [];

socket.on("heartbeat", data => {
  updatePlayers(data.players);
  updateMessages(data.messages);
});
//socket.on("disconnect", playerId => removePlayer(playerId));

let currentPlayer = null;

function updatePlayers(serverPlayers) {
  players = serverPlayers;
  if (currentPlayer == null) {
    currentPlayer = serverPlayers[serverPlayers.length - 1];
  } else {
    currentPlayer = serverPlayers.find(
      player => player.id === currentPlayer.id
    );
  }
}

function updateMessages(serverMessages) {
  messages = serverMessages;
}

function updatePlayerName(id, name) {
  const data = {
    id: id,
    name: name
  };

  socket.emit("updatePlayerName", data);
}

function sendMessage(content) {
  const data = {
    timestamp: Date.now(),
    content: content,
    authorId: currentPlayer.id,
    authorName: currentPlayer.name
  };

  socket.emit("newMessage", data);
}

// function findAuthorById(id) {
//   console.log(id);
//   console.log(players);
//   let foundIndex = players.findIndex(player => player.id === id);
//   console.log(foundIndex);
//   return foundIndex != -1 ? players[foundIndex].name : null;
// }
