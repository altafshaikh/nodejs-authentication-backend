const bcrypt = require("bcryptjs");
const util = require("util");

const compareHash = util.promisify(bcrypt.compare);

const confirmHash = async (text, hash) => {
  try {
    const result = await compareHash(text, hash);
    return result;
  } catch (error) {
    res.status(500).json({ message: "Internal Error" });
  }
};

module.exports = confirmHash;
