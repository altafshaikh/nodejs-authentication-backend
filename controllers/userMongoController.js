const bcrypt = require("bcryptjs");
const dontenv = require("dotenv");

const AppError = require("../helper/appErrorClass");
const sendErrorMessage = require("../helper/sendError");
const sendResponse = require("../helper/sendResponse");
const { generateToken } = require("../helper/createJwtToken");

const {
  isEmailUnique,
  isUserRegistered,
  isUsernamelUnique,
  authUser,
} = require("../middleware/userMongoMiddleware");

const {
  checkRequestBody,
  checkConfirmPassword,
  validatePassword,
  isEmailValid,
  generatePassHash,
} = require("../middleware/commonMiddleware");

const Users = require("../models/users");

dontenv.config({ path: ".env" });
const privateKey = process.env.JWT_SECRET;

class UserMongoController {
  constructor() {
    this.middlewares = {
      checkRequestBody: checkRequestBody,
      checkConfirmPassword: checkConfirmPassword,
      validatePassword: validatePassword,
      isEmailValid: isEmailValid,
      isEmailUnique: isEmailUnique,
      isUsernamelUnique: isUsernamelUnique,
      generatePassHash: generatePassHash,
      isUserRegistered: isUserRegistered,
      authUser: authUser,
    };
  }

  signUpUser(req, res, next) {
    const { email, passHash, firstName, lastName, username } = req.body;

    Users.create({
      email: email,
      password: passHash,
      firstName: firstName,
      lastName: lastName,
      username: username,
    })
      .then((user) => {
        res.status(200);
        res.setHeader("Content-Type", "application/json");
        res.json({ status: "user added successfully", data: user });
      })
      .catch((err) => {
        res.status(404);
        res.json({ message: "Invalid Object Property", error: err });
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

module.exports = UserMongoController;
