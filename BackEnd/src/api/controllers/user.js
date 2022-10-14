// Imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Modules Imports
const User = require("../models/user.js");

exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).json({
        length: users.length,
        users,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "Not Found",
        error: err.message,
      });
    });
};

exports.signUp = (req, res, next) => {
  let userObj = {};
  User.find({
    email: req.body.email,
  })
    .exec()
    .then((result) => {
      if (result.length >= 1) {
        return res.status(409).json({
          message: "Already email exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
          if (err) {
            res.status(500).json({
              message: "Unable to set password",
              error: err.message,
            });
          } else {
            userObj.email = req.body.email;
            userObj.password = hashedPass;
            userObj.firstName = req.body.firstName;
            if (req.body.lastName) {
              userObj.lastName = req.body.lastName;
            }
            const user = new User(userObj);
            user
              .save()
              .then((createdUser) => {
                res.status(201).json({
                  message: "User created sucessfully",
                  createdUser,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  message: "User creation unsuccessful",
                  error: err.message,
                });
              });
          }
        });
      }
    });
};

exports.login = (req, res, next) => {
  User.find({
    email: req.body.email.toLowerCase(),
  })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(404).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (result) {
          const userEmail = {
            email: req.body.email,
          };

          const accessToken = jwt.sign(userEmail, process.env.SECRET);
          return res.status(200).json({
            message: "Auth successful",
            userId: user[0]._id,
            accessToken,
          });
        }

        return res.status(401).json({
          message: "Auth failed",
        });
      });
    });
};

exports.getUser = (req, res, next) => {
  let userId = req.params.userId;

  User.find({
    _id: userId,
  })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(404).json({
          message: "User not found",
        });
      } else {
        return res.status(200).json({
          message: "User found",
          user: user[0]
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Cant get user",
        error: err.message,
      });
    });
};

exports.changeAccessLevel = (req, res, next) => {
  const updateRole = {
    accessLevel: req.body.accessLevel,
  }
  User.find({
    email: req.body.email,
  })
    .exec()
    .then((user) => {
      User.updateOne({ email: req.body.email }, { $set: updateRole })
        .exec()
        .then(() => {
          res.status(200).json({
            message: "Access Level updated",
          });
        })
        .catch((err) => {
          res.status(400).json({
            message: "Error in updating access level",
            error: err.message,
          })
        });
    })
    .catch((err) => {
      res.status(400).json({
        message: "User not found",
        error: err.message,
      });
    });
};

exports.updatePassword = (req, res, next) => {
  // console.log(req.params.userId);
  // res.status(200).json({
  //     message: "working man",
  //     id: req.params.userId
  // });
  const id = req.params.userId;
  const updatePass = {};

  User.find({
    _id: id,
  })
    .exec()
    .then((user) => {
      bcrypt.compare(req.body.oldPassword, user[0].password, (err, result) => {
        if (!result) {
          console.log("inside error");
          return res.status(400).json({
            message: "old password does not match",
          });
        } else {
          console.log("inside else block");
          bcrypt.hash(req.body.confirmPassword, 10, (err, hashedPass) => {
            if (err) {
              console.log("inside bcypt if block");
              return res.status(500).json({
                error: err.message,
              });
            }

            console.log("inside the bcrypt");
            updatePass.password = hashedPass;
            User.updateOne({ _id: id }, { $set: updatePass })
              .exec()
              .then(() => {
                // console.log("inside then block of update");
                res.status(200).json({
                  message: "password updated sucessfully",
                });
              })
              .catch((err) => {
                res.status(500).json({
                  message: "password updation failed",
                  error: err.message,
                });
              });
          });
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "user not found",
        error: err.message,
      });
    });
};

exports.updateFields = (req, res, next) => {
  const id = req.params.userId;
  const updateField = {};

  const body = Object.entries(req.body);
  for (const key of body) {
    updateField[key[0]] = key[1];
  }
  User.updateOne({ _id: id }, { $set: updateField })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User fields updated successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "updation failed",
        message: err.message,
      });
    });
};

exports.deleteUser = (req, res, next) => {
  const id = req.params.userId;

  User.findById(id)
    .then((user) => {
      user
        .remove()
        .then(() => {
          res.status(200).json({
            message: "User deleted successfully",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "User deletion failed",
            error: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: "User not found",
        error: err.message,
      });
    });
};
