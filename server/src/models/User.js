const db = require('../config/database');

const User = {
    create: async (userData) => {
        const {
            username,
            email,
            password,
            organization_id,
            role  //Add role at creation, admin or player
        } = userData;
        
        const now = new Date();

        const client = await db.getClient();

        try {
            
            await client.query('BEGIN');

            const userResult = await client.query(
                `INSERT INTO users (
                    username, 
                    email, 
                    password, 
                    organization_id, 
                    role,
                    created_at, 
                    updated_at
                ) VALUES ($1, $2, $3, $4, $5, $6, $6) RETURNING 
                    id, 
                    username, 
                    email, 
                    organization_id, 
                    role,
                    created_at, 
                    updated_at`,
                [username, email, password, organization_id, role, now]
            );
            
            const newUser = userResult.rows[0];


            if (role== 'admin'){
                await client.query(
                    `INSERT INTO admins (
                    user_id,
                    admin_level,
                    created_at,
                    updated_at
                    ) VALUES ($1, $2, $3, $3)`,
                    [newUser.id, now]
                );
            }else if (role== 'player'){
                await client.query(
                    `INSERT INTO players (
                    user_id,
                    player_status,
                    created_at,
                    updated_at
                    ) VALUES ($1, $2, $3, $3)`,
                    [newUser.id, 'active', now]
                );
            }

            await client.query('COMMIT');
            return newUser;

        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    },

    findPlayers: async(limit = 10, offset =0, filter = {}) => {
        const result = await db.query(
            `SELECT users.id, users.username, users.email, users.organization_id, users.role, players.player_status, users.created_at, users.updated_at 
            FROM users 
            LEFT JOIN players ON users.id = players.user_id
            WHERE users.deleted_at IS NULL AND users.role = 'player'
            ORDER BY users.created_at DESC LIMIT $1 OFFSET $2`,
            [limit, offset]
        );

        const countResult = await db.query(`SELECT COUNT(*) 
            FROM users 
            WHERE deleted_at IS NULL AND role = 'player'`);

        return {
            data: result.rows,
            pagination: {
                total: parseInt(countResult.rows[0].count),
                limit, offset
            }
            };
    },

    findAdmins: async(limit = 10, offset =0, filter = {}) => {
        const result = await db.query(
            `SELECT users.id, users.username, users.email, users.organization_id, users.role, players.player_status, users.created_at, users.updated_at 
            FROM users 
            LEFT JOIN admins ON users.id = admins.user_id
            WHERE users.deleted_at IS NULL AND users.role = 'admin'
            ORDER BY users.created_at DESC LIMIT $1 OFFSET $2`,
            [limit, offset]
        );

        const countResult = await db.query(`SELECT COUNT(*) 
            FROM users 
            WHERE deleted_at IS NULL AND role = 'player'`);

        return {
            data: result.rows,
            pagination: {
                total: parseInt(countResult.rows[0].count),
                limit, offset
            }
            };
    },

    findAll: async(limit = 10, offset =0, filter = {}) => {
        const result = await db.query(
            `SELECT id, username, email, organization_id, role, created_at, updated_at 
            FROM users 
            WHERE deleted_at IS NULL 
            ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
            [limit, offset]
        );

        const countResult = await db.query(`SELECT COUNT(*) 
            FROM users 
            WHERE deleted_at IS NULL`);

        return {
            data: result.rows,
            pagination: {
                total: parseInt(countResult.rows[0].count),
                limit, offset
            }
            };
    },

    findByEmail: async (email) => {
        const result = await db.query(
            'SELECT * FROM users WHERE email = $1 AND deleted_at IS NULL',
            [email]
        );
        return result.rows[0];
    },

    findUserById: async (id) => {
        const result = await db.query(
            `SELECT id, username, email, organization_id, role 
            FROM users 
            WHERE id = $1 AND deleted_at IS NULL`,
            [id]
        );
        return result.rows[0];
    },

    findByUsername: async (username) => {
        const result = await db.query(
            `SELECT * FROM users 
            WHERE username = $1 AND deleted_at IS NULL`,
            [username]
        );
        return result.rows[0];
    },

    update: async (id, userData) => {
        const{username,
            email,
            organization_id,
            role} = userData;
        const now = new Date();

        const result = await db.query(
            `UPDATE users 
             SET username = COALESCE($1, username),
                 email = COALESCE($2, email),
                 organization_id = COALESCE($3, organization_id),
                 role = COALESCE($4, role),
                 updated_at = $5
             WHERE id = $6 AND deleted_at IS NULL
             RETURNING id, username, email, organization_id, role, created_at, updated_at`,
            [username, email, organization_id, role, now, id]
        );
        
        return result.rows[0];
        },

    updateRefreshToken: async (id, refreshToken) => {
        const now = new Date();
        const result = await db.query(
            'UPDATE users SET refresh_token = $1, updated_at = $2 WHERE id = $3 RETURNING id',
            [refreshToken, now, id]
        );
        return result.rows[0];
    },

    delete: async (id) => {
        const now = new Date();
        const result = await db.query(
            `UPDATE users 
            SET deleted_at = $1 
            WHERE id = $2 
            RETURNING id`,
            [now, id]
        );
        return result.rows[0];
    },

    findByRefreshToken: async (refreshToken) => {
        const result = await db.query(
            'SELECT * FROM users WHERE refresh_token = $1 AND deleted_at IS NULL',
            [refreshToken]
        );
        return result.rows[0];
    },

    clearRefreshToken: async (id) => {
        const now = new Date();
        const result = await db.query(
            `UPDATE users 
            SET refresh_token = NULL, updated_at = $1 
            WHERE id = $2 RETURNING id`,
            [now, id]
        );
        return result.rows[0];
    }

};

module.exports = User;