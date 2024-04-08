const path = require('path')
const express = require('express');
const app = express();
const PORT=3000;

const apiRouter = require('./routes/api.js');
const authRouter = require('./routes/auth.js');
const resumeRouter = require('./routes/resume.js');
const top10Router = require('./routes/top10.js');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/resume', resumeRouter);
app.use('/top10', top10Router);

app.use('*', (req, res) =>  res.status(404).send('Not Found'))

app.use ((err,req,res,next) => {
    // console.error(err.stack);
    const defaultError = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: {err: 'an error occured'},
    }
    const errorObj = Object.assign (defaultError, err);
    console.log(errorObj.log);
    res.status(errorObj.status).send(errorObj.message);
  });


  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
  
  module.exports = app;