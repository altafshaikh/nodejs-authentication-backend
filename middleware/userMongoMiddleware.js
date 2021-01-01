const AppError = require("../helper/appErrorClass");
const sendErrorMessage = require("../helper/sendError");
const { verifyToken } = require("../helper/verifyJwtToken");

//model
const Users = require("../models/users");

const isEmailUnique = (req, res, next) => {
  Users.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return sendErrorMessage(
          new AppError(400, "unsuccessful", "User already registered"),
          req,
          res
        );
      }
      next();
    })
    .catch((err) => {
      return sendErrorMessage(
        new AppError(400, "unsuccessful", "Operation Failed"),
        req,
        res
      );
    });
};

const isUsernameUnique = (req, res, next) => {
  Users.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        return sendErrorMessage(
          new AppError(400, "unsuccessful", "username already taken"),
          req,
          res
        );
      }
      next();
    })
    .catch((err) => {
      return sendErrorMessage(
        new AppError(400, "unsuccessful", "Operation Failed"),
        req,
        res
      );
    });
};

const isUserRegistered = (req, res, next) => {
  const { email, username } = req.body;
  if (typeof email === "undefined") {
    Users.findOne({ username: username })
      .then((user) => {
        if (!user) {
          return sendErrorMessage(
            new AppError(
              400,
              "unsuccessful",
              "User not found with this username"
            ),
            req,
            res
          );
        }
        req.currentUser = user;
        next();
      })
      .catch((err) => {
        return sendErrorMessage(
          new AppError(400, "unsuccessful", "Operation Failed"),
          req,
          res
        );
      });
  } else {
    Users.findOne({ email: email })
      .then((user) => {
        if (!user) {
          return sendErrorMessage(
            new AppError(400, "unsuccessful", "User not found with this email"),
            req,
            res
          );
        }
        req.currentUser = user;
        next();
      })
      .catch((err) => {
        return sendErrorMessage(
          new AppError(400, "unsuccessful", "Operation Failed"),
          req,
          res
        );
      });
  }
};

const authUser = async (req, res, next) => {
  let authHeader;
  if (req.headers.authorization) {
    authHeader = req.headers.authorization;
  } else if (req.body.authorization) {
    authHeader = req.body.authorization;
  } else {
    return sendErrorMessage(
      new AppError(401, "Unsuccessful", "Please login or signup"),
      req,
      res
    );
  }

  // if headers are there
  let jwtToken = authHeader.split(" ")[1];
  let payload;
  try {
    payload = await verifyToken(jwtToken, process.env.JWT_SECRET);
  } catch (err) {
    return sendErrorMessage(
      new AppError(401, "Unsuccesssul", "Invalid Token"),
      req,
      res
    );
  }
  Users.findOne({ email: payload.email })
    .then((user) => {
      if (!user) {
        return sendErrorMessage(
          new AppError(401, "Unsuccesssul", "User not registered"),
          req,
          res
        );
      }
      req.currentUser = {
        email: user.email,
        firstName: user.firstName,
        _id: user._id,
      };
      // give access
      next();
    })
    .catch((err) => {
      return sendErrorMessage(
        new AppError(400, "unsuccessful", "Operation Failed"),
        req,
        res
      );
    });
};

// export  middleware
module.exports = {
  isEmailUnique,
  isUsernameUnique,
  isUserRegistered,
  authUser,
};
