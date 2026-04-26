const express = require('express');
const { addStation, getNearbyStations } = require('../controllers/station.controller');
const router = express.Router();

router.post('/add', addStation);
router.get('/nearby', getNearbyStations);

module.exports = router;