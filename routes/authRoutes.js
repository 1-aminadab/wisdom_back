const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateUser, authorizeRoles, refreshToken , getUser} = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authenticateUser, authController.logout)
router.get('/validateToken', refreshToken, authenticateUser, getUser);

module.exports = router;
