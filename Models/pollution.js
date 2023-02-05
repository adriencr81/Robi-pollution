const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  wind: Number,
  weather: String,
  date : Date,
  
});

const Weather = mongoose.model('Pollution', pollutionSchema);

module.exports = Pollution;
