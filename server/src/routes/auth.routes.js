const express = require('express');
const { register, login, logout, refreshAccessToken } = require('../controllers/authController');
const { validateRegistration, validateLogin, authenticateJWT, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authenticateJWT);

//Authentication routes
router.post('/auth/register', validateRegistration, register);
router.post('/auth/login', validateLogin, login);
router.post('/auth/logout', authenticateJWT, logout);
router.post('/auth/refresh-token', refreshAccessToken);



module.exports = router;