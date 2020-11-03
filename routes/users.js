const express = require("express");
const router = express.Router();

const { addUsers, loginUser, getUsers } = require("../controllers/users");

router.route("/new").post(addUsers);
router.route("/login").post(loginUser);
router.route("/").get(getUsers);

module.exports = router;
