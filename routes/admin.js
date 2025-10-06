const express = require("express");
const router = express.Router();
const adminController = require('../controller/adminController');
const adminAuth = require('../middleware/adminAuth');

// Show login page
router.get('/login', adminAuth.isLogin, adminController.loadLogin);

// Submit login form
router.post('/login', adminController.login);

// Show dashboard (only if logged in)
router.get('/dashboard', adminAuth.checkSession, adminController.loadDashboard);

// Logout admin
router.get('/logout', adminAuth.checkSession, adminController.logout);

// Edit user details
router.post('/edit-user', adminAuth.checkSession, adminController.editUser);

// Toggle user status (active/blocked)
router.post("/toggle-status/:id", adminAuth.checkSession, adminAuth.preventBackHistory, adminController.toggleStatus);

// Add new user
router.post('/add-user', adminAuth.checkSession, adminAuth.preventBackHistory, adminController.addUser);

// Delete user
router.get('/delete-user/:id', adminAuth.checkSession, adminAuth.preventBackHistory, adminController.deleteUser);

// List/search users
router.get('/list-users', adminAuth.checkSession, adminAuth.preventBackHistory, adminController.listUsers);

module.exports = router;
