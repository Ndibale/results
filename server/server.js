const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Your API route
app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get('https://matokeo.necta.go.tz/results/2023/csee/CSEE2023/results/s4459.htm');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(3005, () => {
  console.log('Server is running on port 3005');
});

