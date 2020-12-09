const User = require("../models/user");
const util = require("util");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

let fileName = path.join(__dirname, "../data", "users.json");
let users = JSON.parse(fs.readFileSync(fileName, "utf-8"));

//promisifying asyn function
const generateSlat = util.promisify(bcrypt.genSalt);
const generateHash = util.promisify(bcrypt.hash);

//middleware
const generatePassHash = async (req, res, next) => {
  const password = req.body.password;
  const salt = await generateSlat(10);
  const hash = await generateHash(password, salt);

  req.body.passHash = hash;
  next();
};

const signUpUser = (req, res, next) => {
  const { email, passHash } = req.body;

  const user = new User(email, passHash);
  users.push(user);
  fs.writeFile(fileName, JSON.stringify(users, null, 2), (err) => {
    if (err) {
      res.status(500).json({ status: "Internal Error" });
      return err;
    }
    res.status(201).json({ status: "Signup successful", data: [user] });
  });
};
const loginUser = (req, res, next) => {};

// export controllers
module.exports.signUpUser = signUpUser;
module.exports.loginUser = loginUser;

// export middlewares
module.exports.generatePassHash = generatePassHash;
