const express = require('express');
const app = express();

const stationRoutes = require('./routes/station.routes');
const bookingRoutes = require('./routes/booking.routes');
const userRoutes = require('./routes/user.routes');

app.use(express.json());


app.use('/stations', stationRoutes);
app.use('/bookings', bookingRoutes);
app.use('/users', userRoutes);



module.exports = app;