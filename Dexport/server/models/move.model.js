const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const moveSchema = new Schema({
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  fuelPrice: { type: Number,required: true },
  fuelConsumption: { type: Number, required: true },
  driverFee: { type: Number, required: true },
  companyProfit: { type: Number, required: true },
  }, {
  timestamps: true,
  });
  
  const Move = mongoose.model('Move', moveSchema);
  
  module.exports = Move;
