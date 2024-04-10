const express = require('express');
const axios = require('axios');
require('dotenv').config();
const dashBoardController = require('../controllers/dashBoard')

const router = express.Router();
const jobController = require('../controllers/jobController');


router.get('/', jobController.top10, (req, res) => {
  return res.status(200).json(res.locals.data);
});

module.exports = router;