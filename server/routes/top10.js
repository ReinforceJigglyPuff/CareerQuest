const express = require('express');
const axios = require('axios');
require('dotenv').config();
const dashBoardController = require('../controllers/dashBoard')

const router = express.Router();
const jobController = require('../controllers/jobController');
const gptController = require('../controllers/gptController');


router.post('/', jobController.top10, gptController.compare, dashBoardController.job, (req, res) => {
  // const responseData = {
  //   data: res.locals.data,
  //   gpt: res.locals.gpt
  // }
  // return res.status(200).json(responseData);

  return res.status(200).json(res.locals.table)
});

module.exports = router;