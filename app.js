const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const Pollution = require('./models/pollution');
const db = require('./database');

const apiKey = process.env.API_KEY;
const cities = [
  {  name: 'Albi' },
 // { insee: '35238', name: 'Cherbourg' },
 // { insee: '35238', name: 'Rouen' },
 // { insee: '35238', name: 'Amiens' },
 // { insee: '35238', name: 'Lille' },
 // { insee: '35238', name: 'Paris' },
 // { insee: '35238', name: 'Reims' },
 // { insee: '35238', name: 'Metz' },
 // { insee: '35238', name: 'Strasbourg' },
 // { insee: '35238', name: 'Belfort' },
 // { insee: '35238', name: 'Chaumont' },
 // { insee: '35238', name: 'Auxerre' },
 // { insee: '35238', name: 'Alençon' },
 // { insee: '35238', name: 'Rennes' },
 // { insee: '35238', name: 'Brest' },
 // { insee: '35238', name: 'Nantes' },
 // { insee: '35238', name: 'Tours' },
 // { insee: '35238', name: 'Bourges' },
 // { insee: '35238', name: 'Chalon-sur-Saone' },
 // { insee: '35238', name: 'Bourg-Saint-Maurice' },
 // { insee: '35238', name: 'Lyon' },
  // { insee: '35238', name: 'Vichy' },
 // { insee: '35238', name: 'Limoges' },
 // { insee: '35238', name: 'La Rochelle' },
 // { insee: '35238', name: 'Bordeaux' },
 // { insee: '35238', name: 'Montelimar' },
 // { insee: '35238', name: 'Gap' },
 // { insee: '35238', name: 'Nice' },
 // { insee: '35238', name: 'Marseille' },
 // { insee: '35238', name: 'Perpignan' },
 // { insee: '35238', name: 'Tarbes' },
 // { insee: '35238', name: 'Biarritz' },
 // { insee: '35238', name: 'Ajaccio' },
 
  { insee: '31555', name: 'Toulouse' }
];

async function fetchPollution(name) {
  const url = `https://api.waqi.info/feed/${name}/?token=${apiKey}`;

  try {
    const response = await axios.get(url);
    const pollutionData = new Pollution({
      city: name,
      aqi: response.data.data.iaqi,
      date: response.data.data.time.s,
      pm10: response.data.data.iaqi.pm10
      
    });
    await pollutionData.save();
    console.log(`Pollution data for ${name} saved successfully.`);
  } catch (error) {
    console.error(error);
  }
}

(async () => {
  await db.connect();
  for (const city of cities) {
    await fetchPollution(city.name);
  }
  db.connect();
})();

// url api pollution
//https://api.waqi.info/feed/albi/?token=