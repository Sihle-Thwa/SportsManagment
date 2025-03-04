const Organization = require('../models/Organization');

const createOrganization = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Check if organization already exists
        const existingOrg = await Organization.findByName(name);
        if (existingOrg) {
            return res.status(409).json({ error: 'Organization with this name already exists' });
        }

        // Create organization
        const organization = await Organization.create({ name, description });

        // Add creator as admin
        await Organization.addUserToOrganization(req.user.id, organization.id, 'admin');

        res.status(201).json({
            message: 'Organization created successfully',
            organization
        });
    } catch (error) {
        console.error('Organization creation error:', error);
        res.status(500).json({ error: 'Internal server error during organization creation' });
    }
};

const updateOrganization = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, status } = req.body;

        const organization = await Organization.findById(id);
        if (!organization) {
            return res.status(404).json({ error: 'Organization not found' });
        }

        const updatedOrg = await Organization.update(id, { name, description, status });
        res.json({
            message: 'Organization updated successfully',
            organization: updatedOrg
        });
    } catch (error) {
        console.error('Organization update error:', error);
        res.status(500).json({ error: 'Internal server error during organization update' });
    }
};

const deleteOrganization = async (req, res) => {
    try {
        const { id } = req.params;

        const organization = await Organization.findById(id);
        if (!organization) {
            return res.status(404).json({ error: 'Organization not found' });
        }

        await Organization.delete(id);
        res.json({ message: 'Organization deleted successfully' });
    } catch (error) {
        console.error('Organization deletion error:', error);
        res.status(500).json({ error: 'Internal server error during organization deletion' });
    }
};

const addUser = async (req, res) => {
    try {
        const { organizationId } = req.params;
        const { userId, role } = req.body;

        const organization = await Organization.findById(organizationId);
        if (!organization) {
            return res.status(404).json({ error: 'Organization not found' });
        }

        const userOrg = await Organization.addUserToOrganization(userId, organizationId, role);
        res.status(201).json({
            message: 'User added to organization successfully',
            userOrganization: userOrg
        });
    } catch (error) {
        console.error('Add user to organization error:', error);
        res.status(500).json({ error: 'Internal server error while adding user to organization' });
    }
};

const removeUser = async (req, res) => {
    try {
        const { organizationId, userId } = req.params;

        await Organization.removeUserFromOrganization(userId, organizationId);
        res.json({ message: 'User removed from organization successfully' });
    } catch (error) {
        console.error('Remove user from organization error:', error);
        res.status(500).json({ error: 'Internal server error while removing user from organization' });
    }
};

const getUserOrganizations = async (req, res) => {
    try {
        const organizations = await Organization.getUserOrganizations(req.user.id);
        res.json({ organizations });
    } catch (error) {
        console.error('Get user organizations error:', error);
        res.status(500).json({ error: 'Internal server error while fetching user organizations' });
    }
};

const getOrganizationUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const users = await Organization.getOrganizationUsers(id);
        res.json({ users });
    } catch (error) {
        console.error('Get organization users error:', error);
        res.status(500).json({ error: 'Internal server error while fetching organization users' });
    }
};

module.exports = {
    createOrganization,
    updateOrganization,
    deleteOrganization,
    addUser,
    removeUser,
    getUserOrganizations,
    getOrganizationUsers
};