const express = require('express');
const { register, login, logout, refreshAccessToken } = require('../controllers/authController.js');
const {getAllUsers, getUserById, updateUser, deleteUser,} = require ('../controllers/userController.js');
const { validateRegistration, validateLogin,authenticateJWT, authorize } = require('../middleware/auth.middleware.js');


const router = express.Router();

//User routes


// Users routes
router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);
router.post('/logout', authenticateJWT, logout);
router.post('/refresh-token', refreshAccessToken);

//User-Admin routes
router.put('/:id', authenticateJWT, authorize('admin'), updateUser);
router.get('/', authenticateJWT, authorize('admin'), getAllUsers);
router.delete('/:id', authenticateJWT, authorize('admin'), deleteUser);
router.get('/:id', authenticateJWT, authorize('admin'), getUserById);


module.exports = router;