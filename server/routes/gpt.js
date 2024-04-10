const express = require('express');
const gptController = require('../controllers/gptController');
const jobController = require('../controllers/jobController')
const router = express.Router();

router.get ('/', jobController.top10, gptController.compare, (req,res) => { 
  return res.status(200).json(res.locals.gpt)
})

module.exports = router;