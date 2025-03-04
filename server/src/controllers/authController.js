const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const {SECRET_KEY} = require('../config');
const User = require('../models/User');
const config = require('../config/auth');

// Generate tokens
const generateTokens = (user) => {
    const accessToken = jwt.sign(
        { 
            id: user.id, 
            email: user.email,
            role: user.role 
        }, 
        config.jwt.secret, 
        { expiresIn: config.jwt.accessExpiresIn }
    );
    
    const refreshToken = jwt.sign(
        { id: user.id }, 
        config.jwt.refreshSecret, 
        { expiresIn: config.jwt.refreshExpiresIn }
    );
    
    return { accessToken, refreshToken };
};

// User registration
const register = async (req, res) => {
    try {
        const { username, email, password, organization_id } = req.body;
        
        // Check if email already exists
        const existingEmail = await User.findByEmail(email);
        if (existingEmail) {
            return res.status(409).json({ 
                status: 'error',
                message: 'Email already in use' 
            });
        }
        
        // Check if username already exists
        const existingUsername = await User.findByUsername(username);
        if (existingUsername) {
            return res.status(409).json({ 
                status: 'error',
                message: 'Username already taken' 
            });
        }
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            organization_id
        });
        
        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(newUser);
        
        // Store refresh token
        await User.updateRefreshToken(newUser.id, refreshToken);
        
        // Return response
        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            data: {
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                    organization_id: newUser.organization_id,
                    created_at: newUser.created_at
                },
                tokens: {
                    access_token: accessToken,
                    refresh_token: refreshToken
                }
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            status: 'error',
            message: 'Internal server error'
        });
    }
};

// User login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ 
                status: 'error',
                message: 'Invalid credentials' 
            });
        }
        
        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                status: 'error',
                message: 'Invalid credentials' 
            });
        }
        
        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(user);
        
        // Store refresh token
        await User.updateRefreshToken(user.id, refreshToken);
        
        // Return response
        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            data: {
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    organization_id: user.organization_id
                },
                tokens: {
                    access_token: accessToken,
                    refresh_token: refreshToken
                }
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            status: 'error',
            message: 'Internal server error'
        });
    }
};

// User logout
const logout = async (req, res) => {
    try {
        // Clear refresh token
        await User.clearRefreshToken(req.user.id);
        
        res.status(200).json({
            status: 'success',
            message: 'Logout successful'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ 
            status: 'error',
            message: 'Internal server error'
        });
    }
};

// Refresh access token
const refreshAccessToken = async (req, res) => {
    try {
        const { refresh_token } = req.body;
        
        if (!refresh_token) {
            return res.status(400).json({ 
                status: 'error',
                message: 'Refresh token is required' 
            });
        }
        
        // Verify refresh token
        let decoded;
        try {
            decoded = jwt.verify(refresh_token, config.jwt.refreshSecret);
        } catch (error) {
            return res.status(403).json({ 
                status: 'error',
                message: 'Invalid refresh token' 
            });
        }
        
        // Find user by refresh token
        const user = await User.findByRefreshToken(refresh_token);
        if (!user) {
            return res.status(403).json({ 
                status: 'error',
                message: 'Refresh token not found' 
            });
        }
        
        // Generate new tokens
        const { accessToken, refreshToken } = generateTokens(user);
        
        // Update refresh token
        await User.updateRefreshToken(user.id, refreshToken);
        
        // Return response
        res.status(200).json({
            status: 'success',
            message: 'Token refreshed successfully',
            data: {
                tokens: {
                    access_token: accessToken,
                    refresh_token: refreshToken
                }
            }
        });
    } catch (error) {
        console.error('Token refresh error:', error);
        res.status(500).json({ 
            status: 'error',
            message: 'Internal server error'
        });
    }
};

module.exports = {
    register,
    login,
    logout,
    refreshAccessToken,
    generateTokens,
    
};