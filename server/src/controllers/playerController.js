const db = require('../config/database');


const addPlayer = async (req, res) => {
    try{
        const playerData = req.body;
        const player = await Player.create(playerData);
        res.status(201).json(player);
    }catch (error) {
        console.error('Add player error:', error);
        res.status(500).json({ error: 'Internal server error while adding player' });
    }
};

const getAllPlayers = async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || '';

      const result = await db.players.findAll({
        attributes: ['id', 'name', 'surname', 'email', 'dob', 'phone_number', 'organization_id', 'created_at'],
        page, 
        limit, 
        search
    });
      res.json(result);
  } catch (error) {
      console.error('Get all players error:', error);
      res.status(500).json({ error: 'Internal server error while fetching players' });
  }
};

const getPlayerById = async (req, res) => {
  try {
      const { id } = req.params;
      const player = await db.players.findById(id);
      
      if (!player) {
          return res.status(404).json({ error: 'Player not found' });
      }
      
      res.json(player);
  } catch (error) {
      console.error('Get player by ID error:', error);
      res.status(500).json({ error: 'Internal server error while fetching player' });
  }
};

const updatePlayer = async (req, res) => {
  try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedPlayer = await db.players.update(id, updateData);
      
      if (!updatedPlayer) {
          return res.status(404).json({ error: 'Player not found or no valid update data provided' });
      }
      
      res.json({
          message: 'Player updated successfully',
          player: updatedPlayer
      });
  } catch (error) {
      console.error('Update player error:', error);
      res.status(500).json({ error: 'Internal server error while updating player' });
  }
};

const deletePlayer = async (req, res) => {
  try {
      const { id } = req.params;
      const result = await db.players.softDelete(id);
      
      if (!result) {
          return res.status(404).json({ error: 'Player not found' });
      }
      
      res.json({ message: 'Player deleted successfully' });
  } catch (error) {
      console.error('Delete player error:', error);
      res.status(500).json({ error: 'Internal server error while deleting player' });
  }
};

module.exports = {
  addPlayer,
  getAllPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer
};