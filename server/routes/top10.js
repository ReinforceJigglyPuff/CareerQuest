const express = require('express');
const axios = require('axios');
require('dotenv').config();
const dashBoardController = require('../controllers/dashBoard')

const router = express.Router();
const museUrl = process.env.muse;

router.get('/', (req, res) => {
  axios
    .get(museUrl)
    .then((response) => {
      const data = response.data;
      data.results.forEach((el) => {
        el.contents = el.contents.replace(/<[^>]*>/g, '').replace(/\n-?/g, '');
        const wordCount = el.contents.trim().split(/\s+/).length;
        el.wordCount = wordCount;
      });
      res.locals.data = data.results;
      return res.status(200).json(res.locals.data);
    })

    .catch((error) => {
      console.error('Error fetching data:', error);
      return res.status(500).json({ error: 'Failed to fetch data' });
    });
});

router.post('/job', dashBoardController.job, (req, res) => {
  res.status(201).json(res.locals.data)
})
module.exports = router;
