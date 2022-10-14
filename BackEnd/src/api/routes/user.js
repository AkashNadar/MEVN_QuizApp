const express = require("express");

const userController = require("../controllers/user.js");
const { auth_token } = require("../middleware/user_auth.js");

const router = express.Router();

router.get("/", userController.getAllUsers);
router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.get("/:userId", auth_token, userController.getUser);
router.patch("/:userId", userController.updateFields);
router.patch("/password/:userId", auth_token, userController.updatePassword);
router.delete("/:userId", userController.deleteUser);
router.post("/updateAccessLevel", userController.changeAccessLevel);

module.exports = router;
