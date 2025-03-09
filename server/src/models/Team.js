const db = require('../config/database');

const Team = {
    create: async (teamData) => {
        const {
            teamName,
            coach,
            organization_id
        } = teamData;

        const now = new Date();
        const result = await db.query(
            `INSERT INTO teams (
                teamName,
                coach,
                organization_id,
                created_at,
                updated_at
            ) VALUES ($1, $2, $3, $4, $4) RETURNING
                teamId,
                teamName,
                coach,
                organization_id,
                created_at,
                updated_at`,
            [teamName, coach, organization_id, now]
        );
        return result.rows[0];
    },

     // Added pagination and search functionality
     findAll: async (page = 1, limit = 10, search = '') => {
        const offset = (page - 1) * limit;
        const result = await db.query(
            `SELECT 
                teamId, teamName, coach, organization_id, created_at 
            FROM teams
            WHERE 
                deleted_at IS NULL 
                AND (
                    LOWER(name) LIKE LOWER($1) 
                    OR LOWER(teamName) LIKE LOWER($1) 
                    OR LOWER(coach) LIKE LOWER($1)
                )
            ORDER BY created_at DESC
            LIMIT $2 OFFSET $3`,
            [`%${search}%`, limit, offset]
        );
        
        const countResult = await db.query(
            `SELECT COUNT(*) FROM teams 
            WHERE deleted_at IS NULL 
            AND (
                LOWER(name) LIKE LOWER($1) 
                OR LOWER(surname) LIKE LOWER($1) 
                OR LOWER(email) LIKE LOWER($1)
            )`,
            [`%${search}%`]
        );
        
        return {
            teams: result.rows,
            total: parseInt(countResult.rows[0].count),
            pages: Math.ceil(parseInt(countResult.rows[0].count) / limit)
        };
    },

    

}