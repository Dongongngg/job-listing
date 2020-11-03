const Users = require("../models/users");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc    add users
// @route   POST /api/users/new
// @access  public
exports.addUsers = async (req, res) => {
  // Check register input
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message,
    });
  }
  // Check if user already exist
  const exist = await Users.findOne({ name: req.body.username });
  if (exist) {
    return res.status(400).json({
      success: false,
      error: "User exist.",
    });
  }
  //  Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    //  Create new user
    const user = await Users.create({
      name: req.body.username,
      password: hashedPassword,
    });
    return res.status(201).json({
      success: true,
      data: { user: user._id },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    login users
// @route   POST /api/users/login
// @access  public
exports.loginUser = async (req, res) => {
  // Check register input
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message,
    });
  }

  try {
    // Check if user exist
    const loginUser = await Users.findOne({ name: req.body.username });
    if (!loginUser) {
      return res.status(400).json({
        success: false,
        error: "Name not exist.",
      });
    }
    //  Check if password is correct
    const validPass = await bcrypt.compare(
      req.body.password,
      loginUser.password
    );
    if (!validPass) {
      return res.status(400).json({
        success: false,
        error: "Password is wrong.",
      });
    } else {
      const token = jwt.sign({ _id: loginUser._id }, process.env.TOKEN_SECRET);

      return res
        .header("auth-token", token)
        .status(201)
        .json({
          success: true,
          error: `log in with id: ${loginUser._id}`,
        });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: err.message,
    });
  }
};

// @desc    get users
// @route   GET /api/users
// @access  public
exports.getUsers = async (req, res) => {
  try {
    const user = await Users.find();
    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: err.message,
    });
  }
};
