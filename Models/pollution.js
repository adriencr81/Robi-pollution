const mongoose = require('mongoose');

const pollutionSchema = new mongoose.Schema({
  city: String,
  pm10: Object,
  aqi: Object,
  date : Date,
  
});

const Pollution = mongoose.model('Pollution', pollutionSchema);

module.exports = Pollution;
