const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const STORAGE = process.env.STORAGE;
const UserFileController = require("../controllers/userFileController");

var storageAdapter;
if (STORAGE == "file") {
  class StorageAdapter extends UserFileController {}
  storageAdapter = new StorageAdapter();
}
module.exports = storageAdapter;
