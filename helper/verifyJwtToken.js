const jwt = require("jsonwebtoken");
const util = require("util");

const verifyToken = util.promisify(jwt.verify);

module.exports.verifyToken = verifyToken;
