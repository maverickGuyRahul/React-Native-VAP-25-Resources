import express from 'express';
import axios from 'axios';

const PORT = 3000;
const app = express();

app.get('/getweather', async (req, res) => {
  try {
    const response = await axios.get('http://api.weatherstack.com/current', {
      params: {
        access_key: '72d2c5f5222cdbb8fdf68a1526201f42',
        query: 'Mumbai',
      },
    });
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Server Switch on Prompt message....
app.listen(PORT, (req, res) => {
  console.log(`The server is up and running on Port Number: ${PORT}`);
});
