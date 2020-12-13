const dotenv = require("dotenv");
const mongoose = require("mongoose");

const UserFileController = require("../controllers/userFileController");
const UserMongoController = require("../controllers/userMongoController");

dotenv.config({ path: ".env" });
const STORAGE = process.env.STORAGE;

var storageAdapter;

if (STORAGE == "file") {
  class StorageAdapter extends UserFileController {}
  storageAdapter = new StorageAdapter();
} else if (STORAGE == "mongodb") {
  let dbURI;

  if (process.env.DEBUG) {
    dbURI = process.env.LOCAL_DB_URL;
  }

  dbURI = process.env.DATABASE_URL;
  const connect = mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  connect
    .then((db) => {
      console.log("Connected Successfully to Mongodb Server");
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
  class StorageAdapter extends UserMongoController {}
  storageAdapter = new StorageAdapter();
} else {
  class StorageAdapter extends UserFileController {}
  storageAdapter = new StorageAdapter();
}

module.exports = storageAdapter;
