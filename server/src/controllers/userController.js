const db = require('../config/database');


const getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';

        const result = await db.users.findAll({
            attributes: ['id', 'name', 'email', 'role', 'createdAt'],
            page,
            limit,
            search
        });

        res.json(result);
    } catch (error) {
        console.error('Get all users error',error);
        res.status(500).json({ message: 'Internal server error while fetching users' });
    }
};


const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await db.users.findByPk(id, {
            attributes: ['id', 'name', 'email', 'role', 'createdAt']
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role } = req.body;

        // Prevent non-admins from being assigned as admins
        if (role && role !== 'admin' && role !== 'player') {
            return res.status(400).json({ message: 'Invalid role. Choose "admin" or "player".' });
        }

        const user = await db.users.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.update({ name, email, role });

        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await db.users.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { 
    getAllUsers, 
    getUserById, 
    updateUser, 
    deleteUser 
};
