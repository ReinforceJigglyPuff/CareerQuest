const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

const joobleUrl = process.env.jooble;

router.post('/', async (req, res) => {
  try {
    const joobleRequestBody = {
      keywords: req.body.keywords,
      location: req.body.location,
    };

    const joobleResponse = await axios.post(joobleUrl, joobleRequestBody);
    const joobleData = joobleResponse.data;

    return res.status(200).json({
      jooble: joobleData,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
});

module.exports = router;
