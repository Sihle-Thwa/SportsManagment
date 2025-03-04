const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const userRoutes = require('./src/routes/user.routes');
const organizationRoutes = require('./src/routes/organization.routes');
const authRoutes = require('./src/routes/auth.routes');
const playerRoutes = require('./src/routes/player.routes');
require('dotenv').config();

const generateApiDocs = require('./src/api/apiDocs');
const app = express();

// Security Middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'", "'unsafe-inline'"]
        }
    }
}));

// CORS Configuration
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request Parsing Middleware
app.use(express.json({ limit: '10kb' })); // Limit JSON payload size
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Logging Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// Rate limiting for organization routes 
const rateLimit = require ('express-rate-limit');
const organizationLimiter = rateLimit({
    windowMs: 15 * 60 *1000, // 15 minutes
    max: 100, // 100 requests
});


// Health Check Endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Welcome Route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Sports Management API',
        version: '1.0',
        documentation: '/api-docs'
    });
});

// Serve API documentation at /api-docs
app.get('/api-docs', (req, res) => {
    const docsHtml = generateApiDocs();
    
    res.send(docsHtml);
});

// API Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/player', playerRoutes);


// Protected organization routes with rate limiting
app.use('/api/organization', organizationLimiter, organizationRoutes);

// Generic error handler for database connection issues
app.use((err, req, res, next) => {
    if (err.code === 'ECONNREFUSED') {
        return res.status(503).json({
            error: 'Database Connection Error',
            message: 'Unable to connect to the database'
        });
    }
    next(err);
});

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Cannot ${req.method} ${req.url}`
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    const errorResponse = {
        error: err.name || 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred'
    };

    if (process.env.NODE_ENV === 'development') {
        errorResponse.stack = err.stack;
    }

    res.status(err.status || 500).json(errorResponse);
});

// Graceful Shutdown Handler
const gracefulShutdown = () => {
    console.log('Received shutdown signal. Closing HTTP server...');
    app.close(() => {
        console.log('HTTP server closed.');
        process.exit(0);
    });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Server Startup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`
    🚀 Server is running on port ${PORT}
    📝 API Documentation: http://localhost:${PORT}/api-docs
    🔋 Health Check: http://localhost:${PORT}/health
    `);
});

module.exports = app;