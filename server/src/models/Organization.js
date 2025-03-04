const db = require("../config/database");

const Organization = {
    create: async (organizationData) => {
        const { 
            name,
            description,
            status = 'active'
        } = organizationData;
        
        const now = new Date();
        const result = await db.query(
            `INSERT INTO organizations (
                name,
                description,
                status,
                created_at,
                updated_at
            ) VALUES ($1, $2, $3, $4, $4) 
            RETURNING id, name, description, status, created_at, updated_at`,
            [name, description, status, now]
        );
        return result.rows[0];
    },

    findById: async (id) => {
        const result = await db.query(
            "SELECT * FROM organizations WHERE id = $1 AND deleted_at IS NULL",
            [id]
        );
        return result.rows[0];
    },

    findByName: async (name) => {
        const result = await db.query(
            "SELECT * FROM organizations WHERE name = $1 AND deleted_at IS NULL",
            [name]
        );
        return result.rows[0];
    },

    update: async (id, updateData) => {
        const { name, description, status } = updateData;
        const now = new Date();
        
        const result = await db.query(
            `UPDATE organizations 
            SET name = COALESCE($1, name),
                description = COALESCE($2, description),
                status = COALESCE($3, status),
                updated_at = $4
            WHERE id = $5 AND deleted_at IS NULL
            RETURNING id, name, description, status, created_at, updated_at`,
            [name, description, status, now, id]
        );
        return result.rows[0];
    },

    delete: async (id) => {
        const now = new Date();
        const result = await db.query(
            `UPDATE organizations 
            SET deleted_at = $1
            WHERE id = $2 AND deleted_at IS NULL
            RETURNING id`,
            [now, id]
        );
        return result.rows[0];
    },

    addUserToOrganization: async (userId, organizationId, role) => {
        const now = new Date();
        const result = await db.query(
            `INSERT INTO organization_users (
                user_id,
                organization_id,
                role,
                created_at,
                updated_at
            ) VALUES ($1, $2, $3, $4, $4)
            RETURNING id, user_id, organization_id, role`,
            [userId, organizationId, role, now]
        );
        return result.rows[0];
    },

    removeUserFromOrganization: async (userId, organizationId) => {
        const now = new Date();
        const result = await db.query(
            `UPDATE organization_users 
            SET deleted_at = $1
            WHERE user_id = $2 AND organization_id = $3 AND deleted_at IS NULL
            RETURNING id`,
            [now, userId, organizationId]
        );
        return result.rows[0];
    },

    getUserOrganizations: async (userId) => {
        const result = await db.query(
            `SELECT o.*, ou.role
            FROM organizations o
            JOIN organization_users ou ON o.id = ou.organization_id
            WHERE ou.user_id = $1 AND o.deleted_at IS NULL AND ou.deleted_at IS NULL`,
            [userId]
        );
        return result.rows;
    },

    getOrganizationUsers: async (organizationId) => {
        const result = await db.query(
            `SELECT u.id, u.username, u.email, ou.role
            FROM users u
            JOIN organization_users ou ON u.id = ou.user_id
            WHERE ou.organization_id = $1 AND u.deleted_at IS NULL AND ou.deleted_at IS NULL`,
            [organizationId]
        );
        return result.rows;
    }
};

module.exports = Organization;