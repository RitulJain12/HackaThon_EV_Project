const express = require('express');
const { createBooking, getUserBookings } = require('../controllers/booking.controller');
const router = express.Router();

router.post('/create', createBooking);
router.get('/user/:userId', getUserBookings);

module.exports = router;