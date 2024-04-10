const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/', authController.signup, (req, res) => {
  return res.status(201).json(res.locals.user_id);
});

router.post('/login', authController.signin, (req, res) => {
    return res.status(201).json(res.locals.found)
})

module.exports = router;
