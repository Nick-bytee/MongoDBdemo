const mongodb = require("mongodb");
const getdb = require("../util/database").getdb;

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    (this.title = title),
      (this.price = price),
      (this.description = description),
      (this.imageUrl = imageUrl),
      (this._id = id ? new mongodb.ObjectId(id) : null);
    this.userId = userId;
  }

  save() {
    const db = getdb();
    let dbOp;
    if (this._id) {
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    const db = getdb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(prodId) {
    const db = getdb();
    return db
      .collection("products")
      .findOne({ _id: new mongodb.ObjectId(prodId) })
      .then((product) => {
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteById(prodId) {
    const db = getdb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((product) => {
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;
