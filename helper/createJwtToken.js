const jwt = require("jsonwebtoken");
const util = require("util");

const generateToken = util.promisify(jwt.sign);

module.exports.generateToken = generateToken;
