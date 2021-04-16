class Message {
  constructor(id, timestamp, content, authorId) {
    this.id = id;
    this.timestamp = timestamp;
    this.content = content;
    this.authorId = authorId;
  }
}

module.exports = Message;
