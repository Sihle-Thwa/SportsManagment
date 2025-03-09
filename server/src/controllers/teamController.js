const Team = require('../models/Team');

const addTeam = async (req, res) => {
    // Logic to add a team
    try {
        const teamData = req.body;
        const newTeam = await Team.create(teamData);
        res.status(201).json(newTeam);

    } catch (error) {
        console.error('Add team error:', error);
        res.status(500).json({ error: 'Internal server error while adding team' });
    }
};

const getAllTeams = async (req, res) => {
    // Logic to retrieve all teams
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
  
        const result = await db.teams.findAll({
          attributes: ['teamId', 'organization_id', 'teamName', 'coach', 'created_at'],
          page, 
          limit, 
          search
        });
        res.json(result);
    } catch (error) {
        console.error('Get all teams error:', error);
        res.status(500).json ({error: 'Internal server error while fetching teams'});
    }
};

const getTeamById = async (req, res) => {
    // Logic to retrieve a team by ID
    try {
        const { teamId } = req.params;
        const team = await db.teams.findById(teamId);

        if (!team) {
            return res.status(404).json({error: 'Team not found'});
        }

        res.json(team);

    } catch (error) {
        console.error ('Get all teams by ID error: ', error);
        res.status(500).json ({error:'Internal server error while fetching team:'});
    }
};

const updateTeam = async (req, res) => {
    // Logic to update a team
    try {
        const { teamId } = req.params;
        const updateData = req.body;

        const updatedTeam = await db.teams.update(teamId, updateData);

        if (!updatedTeam) {
            return res.status(404).json({error: 'Team not found or no valid update data provided'});
        }

        res.json({
            message: 'Team updated successfully',
            team: updatedTeam
        });

    } catch (error) {
        console.error('Update team error:', error);
        res.status(500).json({error: 'Internal server error while updating team'});
    }
};

const deleteTeam = async (req, res) => {
    // Logic to delete a team
    try {
        const { teamId } = req.params;
        const team = await db.teams.delete(teamId);

        if (!team) {
            return res.status(404).json({error: 'Team not found'});
        }

        res.json({
            message: 'Team deleted successfully',
        });

    } catch (error) {
        console.error('Delete team error:', error);
        res.status(500).json({error: 'Internal server error while deleting team'});
    }
};


module.exports = {
    addTeam,
    getAllTeams,
    getTeamById,
    updateTeam,
    deleteTeam
};