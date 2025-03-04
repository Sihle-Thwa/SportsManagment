const express = require('express');
const router = express.Router();
const { getAllTeams, getTeamsById } = require('../controllers/teamController');

router.get('/', getAllTeams);
router.get('/:id', getTeamsById);

module.exports = router;