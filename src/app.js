const express = require('express');
const app = express();

const stationRoutes = require('./routes/station.routes');
const bookingRoutes = require('./routes/booking.routes');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());


app.use('/stations', stationRoutes);
app.use('/bookings', bookingRoutes);
app.use('/users', userRoutes);



module.exports = app;