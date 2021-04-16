let input, button, greeting, wrapper, feed;

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
  button.mousePressed(greet);
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
          let bubble = createDiv(message.content)
            .addClass("bubble")
            .attribute("id", message.id);

          let author = createElement("span", "Nath");
          // findAuthorById(message.authorId)
          author.parent(bubble);

          if (message.authorId === currentPlayer.id) bubble.addClass("author");
          bubble.parent(feed);
          window.scrollTo(0, document.body.scrollHeight);
        }
      });
    }
  }
}

function greet() {
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
  sendMessage(message);
}

function mousePressed() {
  console.log(players);
  console.log(messages);
}
