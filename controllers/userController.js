const User = require("../models/user");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const sendResponse = require("../helper/sendResponse");

let fileName = path.join(__dirname, "../data", "users.json");
let users = JSON.parse(fs.readFileSync(fileName, "utf-8"));

const signUpUser = (req, res, next) => {
  const { email, passHash } = req.body;

  const user = new User(email, passHash);
  users.push(user);
  fs.writeFile(fileName, JSON.stringify(users, null, 2), (err) => {
    if (err) {
      res.status(500).json({ status: "Internal Error" });
      return err;
    }
    sendResponse(201, "Signup successful", user, req, res);
  });
};

const loginUser = async (req, res, next) => {
  try {
    const result = await bcrypt.compare(
      req.body.password,
      req.currentUser.password
    );
    if (!result) {
      res.status(201).json({ message: "You Entered wrong Password" });
      return;
    }
    sendResponse(201, "Login Successful", {}, req, res);
  } catch (error) {
    res.status(500).json({ message: "Internal Error" });
  }
};

// export controllers
module.exports.signUpUser = signUpUser;
module.exports.loginUser = loginUser;
