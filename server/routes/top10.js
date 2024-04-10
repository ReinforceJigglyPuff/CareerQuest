const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');


router.get('/', jobController.top10, (req, res) => {
  return res.status(200).json(res.locals.data);
});

module.exports = router;