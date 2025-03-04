const express = require('express');
const router = express.Router();
const { 
    getAllPlayers,
    getPlayerById,
    addPlayer,
    updatePlayer,
    deletePlayer
} = require('../controllers/playerController');
const { 
    authenticateJWT, 
    authorize
} = require('../middleware/auth.middleware');



// Admin-Player management routes
router.post('/players', authenticateJWT,authorize('admin') ,addPlayer);
router.get('/players', authenticateJWT,authorize('admin') ,getAllPlayers);
router.get('/players/:id', authenticateJWT,authorize('admin') ,getPlayerById);
router.delete('/players/:id', authenticateJWT,authorize('admin') ,deletePlayer);
router.post('/players/:id', authenticateJWT, authorize('admin'), updatePlayer);

//Player management routes 
router.post('/players/:id', authenticateJWT, authorize('player'), updatePlayer);

module.exports = router;