const Station = require('../models/station.model');


const addStation = async (req, res) => {
  try {
    const station = await Station.create(req.body);
    res.status(201).json(station);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getNearbyStations = async (req, res) => {
  const { lat, lng } = req.query;
    console.log(req.query);
  try {
 
    if (!lat || !lng) {
      return res.status(400).json({ error: "Latitude and Longitude are required" });
    }

    const stations = await Station.aggregate([
      {
        $geoNear: { 
          near: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)], 
          },
          distanceField: "distance", 
          spherical: true,
          maxDistance: 50000, 
        },
      },
    ]);
    res.json(stations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addStation,
  getNearbyStations,
};