const app = require('express')();
require('dotenv').config();
const httpRequest = require('./helpers/http-request');

const { PORT } = process.env;

app.get('/', (req, res) => {
  res.send('Hello, World');
});

app.get('/mars', async (req, res) => {
  try {
    const marsWeather = await httpRequest({
      hostname: 'api.nasa.gov',
      port: 443,
      path: '/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0',
      method: 'GET'
    });

    const marsWeatherJSON = JSON.parse(marsWeather);
    const defaultValues = { mx: 'NA', mn: 'NA', av: 'NA' };

    const response = marsWeatherJSON
      .sol_keys
      .map(sol => {
        const {
          AT: atmospheric = defaultValues,
          PRE: pressure = defaultValues,
          HWS: windspeeed = defaultValues,
          Season 
        } = marsWeatherJSON[sol];

        return {
          temperature: {
            unit: 'degrees',
            symbol: 'C',
            max: atmospheric.mx,
            min: atmospheric.mn,
            average: atmospheric.av
          },
          pressure: {
            unit: 'pascals',
            symbol: 'Pa',
            max: pressure.mx,
            min: pressure.mn,
            average: pressure.av
          },
          wind: {
            unit: 'm/s',
            symbol: 'm/s',
            max: windspeeed.mx,
            min: windspeeed.mn,
            average: windspeeed.av
          },
          season: Season,
          sol
        };
      });

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is runnig at port: ${PORT}`);
});
