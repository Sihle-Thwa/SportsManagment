const db = require('../config/database');

const Role = {
    create: async (roleData) => {
        const {
            roleName,
            updated_at
        } = roleData;
        const now = new Date();
        const result = await db.query(
            `INSERT INTO Roles (
                roleName, 
                created_at, 
                updated_at
            ) VALUES ($1, $2, $3) RETURNING *`, [roleName, now, updated_at]
            );
        return result.rows[0];
    },

    findRoleByName: async (roleName) => {
        const result = await pool.query(
            `SELECT * 
            FROM Roles 
            WHERE name = $1 AND deleted_at IS Null`,
             [roleName]
        );
        return result.rows[0];
    },
};

module.exports = Role;