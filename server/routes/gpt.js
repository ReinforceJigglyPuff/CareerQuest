const express = require('express');
const gptController = require('../controllers/gptController');
const router = express.Router();

router.get ('/', gptController.compare, (req,res) => { 
  return res.status(200).json(res.locals.gpt)
})

module.exports = router;