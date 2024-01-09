const router = require('express').Router();
const axios = require('axios');
const Move = require('../models/move.model');

router.route('/calculate').post(async (req, res) => {
  const { origin, destination, fuelPrice, fuelConsumption, driverFee, companyProfit } = req.body;

  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
    const distance = response.data.routes[0].legs[0].distance.value / 1000; // distance in km
    const fare = (fuelPrice * fuelConsumption * distance + driverFee + companyProfit) / distance;

    res.json({ fare });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error calculating fare' });
  }
});

module.exports = router;
