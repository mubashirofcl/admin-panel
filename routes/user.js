const express = require("express");
const router = express.Router();

const userController = require('../controller/userController');
const auth = require('../middleware/auth');

// Show login page
router.get('/login', auth.isLogin, userController.loadLogin);

// Submit login form
router.post('/login', userController.login);

// Show register page
router.get('/register', auth.isLogin, userController.loadRegister);

// Submit register form
router.post('/register', userController.registerUser);

// Show home page (only if logged in and not blocked)
router.get('/home', auth.checkSession, auth.checkUserStatus, userController.loadHome);

// Logout user
router.get('/logout', auth.checkSession, userController.logout);

module.exports = router;
