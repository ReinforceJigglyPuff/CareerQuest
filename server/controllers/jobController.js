const db = require('../models/SQL');
const axios = require('axios');
const museUrl = process.env.museUrl;
let jobController = {};
const fullURL = museUrl+"?category=Software%20Engineer&location=Long%20Island%2C%20NY&page=1";

jobController.top10 = (req, res, next) => {
    axios
    .get(fullURL)
    .then((response) => {
      const data = response.data;
      console.log(data)
      data.results.forEach((el) => {
        el.contents = el.contents.replace(/<[^>]*>/g, '').replace(/\n-?/g, '');
        const wordCount = el.contents.trim().split(/\s+/).length;
        el.wordCount = wordCount;
      });
      res.locals.data = data.results
      // console.log(res.locals.data)
      return next();
    })

    .catch((error) => {
      console.error('Error fetching data in jobController.signup:', error);
      return next({
        message: 'Error in jobController.signup'
    });
    });
}

module.exports = jobController;