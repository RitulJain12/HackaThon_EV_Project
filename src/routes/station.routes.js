const express = require('express');
const { addStation, getNearbyStations } = require('../controllers/station.controller');
const { validateToken } = require('../middlewares/auth.middleware');
const { isStationOwner } = require('../middlewares/isstationowner.middleware');
const router = express.Router();

router.post('/add', validateToken, isStationOwner, addStation);

router.get('/nearby', validateToken, getNearbyStations);

module.exports = router;