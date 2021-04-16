let input, button, wrapper, feed;
let address = "http://192.168.1.134:3000";

// 3 variables importantes !
// messages
// players
// currentPlayer

function setup() {
  cv = createCanvas(windowWidth, windowHeight);
  textFont("Space Mono");
  noStroke();

  // UI components
  wrapper = document.getElementById("input-wrapper");
  feed = document.getElementById("feed");

  input = createInput("").id("message");
  button = createButton("<i class='fas fa-arrow-right'></i>");

  input.parent(wrapper);
  input.attribute("placeholder", "Your name");
  button.parent(wrapper);
  button.mousePressed(login);
}

function draw() {
  background(220);
  fill(0);

  if (currentPlayer != null) {
    if (currentPlayer.name) {
      // User logged in!
      messages.forEach((message, i) => {
        //text(message.content, 10, i * 100); // Text wraps within

        findExistingBubble = document.getElementById(message.id);
        if (!findExistingBubble) {
          let bubble = createDiv()
            .addClass("bubble")
            .attribute("id", message.id);

          let bubbleMessage = createDiv(message.content).class("message");

          let author = createElement(
            "div",
            message.authorName +
              "<span class='dateTime'> - " +
              moment(message.timestamp).fromNow() +
              "</span>"
          ).addClass("author");

          bubble.mouseClicked(clickedBubble);

          author.parent(bubble);
          bubbleMessage.parent(bubble);

          if (message.authorId === currentPlayer.id) bubble.addClass("author");
          bubble.parent(feed);
          window.scrollTo(0, document.body.scrollHeight);
        }
      });
    }
  }
}

function clickedBubble() {
  // Show date on bubble click
  select(".dateTime", this).style("display", "inline");
}

function login() {
  const name = input.value();
  input.value("");

  if (name != "") {
    button.html("<i class='far fa-paper-plane'></i>").addClass("blue");
    input.attribute("placeholder", "");
    button.mousePressed(newMessage);

    updatePlayerName(currentPlayer.id, name);
  }
}

function newMessage() {
  const message = input.value();
  input.value("");
  if (message != "") sendMessage(message);
}

function keyPressed() {
  // Check if user is logged
  if (keyCode === ENTER) {
    if (currentPlayer.name) {
      newMessage();
    } else {
      login();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
