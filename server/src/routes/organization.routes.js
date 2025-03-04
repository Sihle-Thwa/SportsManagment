const express = require('express');
const {
    createOrganization,
    updateOrganization,
    deleteOrganization,
    addUser,
    removeUser,
    getUserOrganizations,
    getOrganizationUsers
} = require('../controllers/organizationController');
const { authorizeOrganization, validateOrganization, authenticateJWT } = require('../middleware/organizationAuth.middleware');

const router = express.Router();

// Organization management routes
router.post('/', authenticateJWT, validateOrganization, createOrganization);
router.get('/user', authenticateJWT, getUserOrganizations);
router.get('/:id/users', authenticateJWT, authorizeOrganization(['admin']), getOrganizationUsers);
router.put('/:id', authenticateJWT, authorizeOrganization(['admin']), validateOrganization, updateOrganization);
router.delete('/:id', authenticateJWT, authorizeOrganization(['admin']), deleteOrganization);

// Organization user management routes
router.post('/:organizationId/users', authenticateJWT, authorizeOrganization(['admin']), addUser);
router.delete('/:organizationId/users/:userId', authenticateJWT, authorizeOrganization(['admin']), removeUser);

module.exports = router;

