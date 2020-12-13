const User = require("../models/user");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const dontenv = require("dotenv");

const AppError = require("../helper/appErrorClass");
const sendErrorMessage = require("../helper/sendError");
const sendResponse = require("../helper/sendResponse");
const { generateToken } = require("../helper/createJwtToken");

const {
  checkRequestBody,
  checkConfirmPassword,
  validatePassword,
  isEmailValid,
  isEmailUnique,
  generatePassHash,
  isUserRegistered,
} = require("../middleware/userMiddleware");

dontenv.config({ path: ".env" });
const privateKey = process.env.JWT_SECRET;

let fileName = path.join(__dirname, "../data", "users.json");
let users = JSON.parse(fs.readFileSync(fileName, "utf-8"));

class UserFileController {
  constructor() {
    this.middlewares = {
      checkRequestBody: checkRequestBody,
      checkConfirmPassword: checkConfirmPassword,
      validatePassword: validatePassword,
      isEmailValid: isEmailValid,
      isEmailUnique: isEmailUnique,
      generatePassHash: generatePassHash,
      isUserRegistered: isUserRegistered,
    };
  }
  signUpUser(req, res, next) {
    const { email, passHash, firstName, lastName, username } = req.body;

    const user = new User(email, passHash, firstName, lastName, username);
    users.push(user);
    fs.writeFile(fileName, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return sendErrorMessage(
          new AppError(500, "Internal Error", "Unable to complete the Request"),
          req,
          res
        );
      }
      sendResponse(201, "Signup successful", user, req, res);
    });
  }

  async loginUser(req, res, next) {
    try {
      const result = await bcrypt.compare(
        req.body.password,
        req.currentUser.password
      );

      if (!result) {
        res.status(201).json({ message: "You Entered wrong Password" });

        return sendErrorMessage(
          new AppError(401, "unsuccessful", "You Entered wrong Password"),
          req,
          res
        );
      }

      try {
        let jwtToken = await generateToken(
          { email: req.currentUser.email },
          privateKey,
          { expiresIn: "1h" }
        );
        res.cookie("jwt", jwtToken);
        sendResponse(200, "Successful", { jwt: jwtToken }, req, res);
      } catch (err) {
        return sendErrorMessage(
          new AppError(500, "Internal Error", "Unable to complete the Request"),
          req,
          res
        );
      }
    } catch (error) {
      return sendErrorMessage(
        new AppError(500, "Internal Error", "Unable to complete the Request"),
        req,
        res
      );
    }
  }
}

// const userFileController = new UserFileController();

module.exports = UserFileController;
