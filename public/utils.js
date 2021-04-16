const socket = io.connect("http://10.192.234.160:3000");

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
    authorId: currentPlayer.id
  };

  socket.emit("newMessage", data);
}

function findAuthorById(id) {
  let foundIndex = players.findIndex(player => player.id === id);
  return foundIndex ? players[foundIndex].name : null;
}

function windowResized() {
  centerCanvas();
}

function centerCanvas() {
  const x = (windowWidth - width) / 2;
  const y = (windowHeight - height) / 2;
  cv.position(x, y);
}
