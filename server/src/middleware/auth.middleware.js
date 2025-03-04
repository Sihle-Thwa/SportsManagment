const jwt = require('jsonwebtoken');
const { body, validationResult, param } = require('express-validator');
const config = require('../config/auth');


//Validate request payload
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            status: 'error',
            message: 'Validation failed',
            errors: errors.array() 
        });
    }
    next();
};

const validateRegistration = [
    body('email').isEmail().notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
   validateRequest
];

const validateLogin = [
    body('email').notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }),
    validateRequest
];

//Validate user ID parameter

const validatePlayerId = [
    param('id').isInt().withMessage('Invalid player ID'),
    validateRequest
];

const authorizePlayerAccess = (req, res, next) => {
    const { id } = req.params; // Player ID from request
    const { role, userId } = req.user; // Extract role and userId from token

    if (role === 'admin') {
        return next(); // Admins can modify any player
    }

    if (role === 'player' && userId === parseInt(id)) {
        return next(); // Players can modify only their own profile
    }

    return res.status(403).json({ message: 'Forbidden: You can only access your own profile' });
};

const authorizeRole = (role) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        }
        next();
    };
};

//JWT Authentication middleware

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);
        req.user = decoded; // Attach decoded payload (id, role) to request object
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};


// Role-based authorization middleware
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ 
                status: 'error',
                message: 'Unauthorized access'
            });
        }
        
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                status: 'error',
                message: 'Forbidden: insufficient permissions'
            });
        }
        
        next();
    };
};

module.exports = {
    validateRegistration,
    validateLogin,
    authorizePlayerAccess,
    authorizeRole,
    authenticateJWT,
    validatePlayerId,
    validateRequest,
    authorize
};