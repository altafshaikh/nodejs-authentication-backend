const uniquid = require("uniquid");

class User {
  constructor(email, hash) {
    this.userID = uniquid();
    this.email = email;
    this.password = hash;
    this.createdAt = Date();
  }
}

module.exports = User;
