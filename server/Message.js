class Message {
  constructor(id, timestamp, content, authorId, authorName) {
    this.id = id;
    this.timestamp = timestamp;
    this.content = content;
    this.authorId = authorId;
    this.authorName = authorName;
  }
}

module.exports = Message;
