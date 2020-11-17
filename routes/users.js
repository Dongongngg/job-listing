const express = require('express');
const router = express.Router();

const { addUser, loginUser, getUsers } = require('../controllers/users');

router.route('/signup').post(addUser);
router.route('/signin').post(loginUser);
router.route('/').get(getUsers);

module.exports = router;
