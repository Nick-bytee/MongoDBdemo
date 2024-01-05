const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let db;

const uri =
  "mongodb+srv://nick2228:Nick4321@cluster0.q3yaxzn.mongodb.net/?retryWrites=true&w=majority";

const mongoConnect = (callback) => {
  MongoClient.connect(uri)
    .then((client) => {
      console.log("connected to database");
      db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getdb = () => {
  if (db) {
    return db;
  }
  throw "No Database Found";
};

exports.mongoConnect = mongoConnect;
exports.getdb = getdb;
