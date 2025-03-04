// organizationAuth.middleware.js
const Organization = require('../models/Organization');
const { body, validationResult } = require('express-validator');


const authenticateJWT = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Authorization header required' });
        }

        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, organization) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ error: 'Token expired' });
                }
                return res.status(403).json({ error: 'Invalid token' });
            }
            
            req.organization = organization;
            next();
        });
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({ error: 'Internal server error during authentication' });
    }
};

const validateOrganization = [
    body('name').isLength({ min: 3 }),
    body('description').isLength({ min: 3 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];


const authorizeOrganization = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            const organizationId = req.params.id || req.params.organizationId;
            if (!organizationId) {
                return res.status(400).json({ error: 'Organization ID is required' });
            }

            const userOrgs = await Organization.getUserOrganizations(req.user.id);
            const userOrg = userOrgs.find(org => org.id === parseInt(organizationId));

            if (!userOrg) {
                return res.status(403).json({ error: 'You do not have access to this organization' });
            }

            if (!allowedRoles.includes(userOrg.role)) {
                return res.status(403).json({ error: 'You do not have the required role for this action' });
            }

            req.organizationRole = userOrg.role;
            next();
        } catch (error) {
            console.error('Organization authorization error:', error);
            res.status(500).json({ error: 'Internal server error during authorization' });
        }
    };
};

module.exports = { authorizeOrganization, validateOrganization, authenticateJWT };