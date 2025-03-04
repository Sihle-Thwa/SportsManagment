const Role = require('../models/Role');
const db = require('../config/database');

const createRole = async (req, res) => {
    //Create Organization Logic
        try {
            const {roleName} = req.body;

            // Check if role already exists
            const existingRole = await Role.findRoleByName(roleName);
            if (existingRole) {
                return res.status(409).json({ error: 'Role already exists' });
            }
            
            const role = await db.create(
                roleName,
                );
            res.status(201).json({
                message: 'Role created successfully', 
                role
            });
        } catch (error) {
            res.status(500).json({error: 'Role creation failed'});
        }
    };
    
    module.exports = {
        createRole,
    };