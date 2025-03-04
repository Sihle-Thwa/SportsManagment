const db = require('../config/database');

const Player = {
    create: async (playerData) => {
        const {
            name,
            surname,
            email,
            password,
            dob,
            phone_number,
            organization_id
        } = playerData;
        
        const now = new Date();
        // Fixed VALUES parameters count and ordering
        const result = await db.query(
            `INSERT INTO players (
                name,
                surname, 
                email, 
                password,
                dob,
                phone_number, 
                organization_id, 
                created_at, 
                updated_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $8) RETURNING 
                id, 
                name, 
                email, 
                organization_id, 
                created_at, 
                updated_at`,
            [name, surname, email, password, dob, phone_number, organization_id, now]
        );
        return result.rows[0];
    },

    // Added pagination and search functionality
    findAll: async (page = 1, limit = 10, search = '') => {
        const offset = (page - 1) * limit;
        const result = await db.query(
            `SELECT 
                id, name, surname, email, dob, phone_number, organization_id, created_at 
            FROM players 
            WHERE 
                deleted_at IS NULL 
                AND (
                    LOWER(name) LIKE LOWER($1) 
                    OR LOWER(surname) LIKE LOWER($1) 
                    OR LOWER(email) LIKE LOWER($1)
                )
            ORDER BY created_at DESC
            LIMIT $2 OFFSET $3`,
            [`%${search}%`, limit, offset]
        );
        
        const countResult = await db.query(
            `SELECT COUNT(*) FROM players 
            WHERE deleted_at IS NULL 
            AND (
                LOWER(name) LIKE LOWER($1) 
                OR LOWER(surname) LIKE LOWER($1) 
                OR LOWER(email) LIKE LOWER($1)
            )`,
            [`%${search}%`]
        );
        
        return {
            players: result.rows,
            total: parseInt(countResult.rows[0].count),
            pages: Math.ceil(parseInt(countResult.rows[0].count) / limit)
        };
    },

    findById: async (id) => {
        const result = await db.query(
            `SELECT 
                id, name, surname, email, dob, phone_number, organization_id, created_at 
            FROM players 
            WHERE id = $1 AND deleted_at IS NULL`,
            [id]
        );
        return result.rows[0];
    },

    // Existing methods remain the same
    findByEmail: async (email) => {
        const result = await db.query(
            `SELECT * FROM players 
            WHERE email = $1 
            AND deleted_at IS NULL`,
            [email]
        );
        return result.rows[0];
    },

    // Added proper soft delete functionality
    softDelete: async (playerId) => {
        const now = new Date();
        const result = await db.query(
            `UPDATE players 
            SET deleted_at = $1, updated_at = $1 
            WHERE id = $2 
            AND deleted_at IS NULL 
            RETURNING id`,
            [now, playerId]
        );
        return result.rows[0];
    },

    // Added update functionality
    update: async (playerId, updateData) => {
        const allowedFields = [
            'name',
            'surname',
            'email',
            'phone_number',
            'organization_id'
        ];

        const updates = [];
        const values = [];
        let paramCount = 1;

        Object.keys(updateData).forEach(key => {
            if (allowedFields.includes(key)) {
                updates.push(`${key} = $${paramCount}`);
                values.push(updateData[key]);
                paramCount++;
            }
        });

        if (updates.length === 0) return null;

        const now = new Date();
        values.push(now, playerId);

        const result = await db.query(
            `UPDATE players 
            SET ${updates.join(', ')}, updated_at = $${paramCount} 
            WHERE id = $${paramCount + 1} 
            AND deleted_at IS NULL 
            RETURNING 
                id, 
                name, 
                surname, 
                email, 
                phone_number, 
                organization_id, 
                updated_at`,
            values
        );
        return result.rows[0];
    },

    // Fix: Corrected table name from 'users' to 'players'
    updateRefreshToken: async (playerId, refreshToken) => {
        const now = new Date();
        const result = await db.query(
            `UPDATE players 
            SET refresh_token = $1, updated_at = $2 
            WHERE id = $3 
            RETURNING id`,
            [refreshToken, now, playerId]
        );
        return result.rows[0];
    },

    // Fix: Corrected table name from 'users' to 'players'
    findByRefreshToken: async (refreshToken) => {
        const result = await db.query(
            `SELECT * FROM players 
            WHERE refresh_token = $1 
            AND deleted_at IS NULL`,
            [refreshToken]
        );
        return result.rows[0];
    },
};

module.exports = Player;