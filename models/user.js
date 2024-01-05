const mongodb = require("mongodb");
const getdb = require("../util/database").getdb;

class User {
  constructor(name, email) {
    (this.name = name), (this.email = email);
  }

  add() {
    const db = getdb();
    return db.collection("users").inserOne(this);
  }

  static findById(userId) {
    const db = getdb();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) });
  }
}

module.exports = User;
