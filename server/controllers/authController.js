const db = require('../models/SQL');

let authController = {};

authController.signup = (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return next({
        message: 'Both username and password are required',
      });
    }

    db.query(
      'INSERT INTO LOGIN (username, password) VALUES ($1, $2) RETURNING user_id',
      [username, password],
      (err, result) => {
        if (err) {
          return next(err);
        }
        
        const user_id = result.rows[0].user_id;
        res.locals.user_id = user_id;
        return next();
      }
    );
  } catch (error) {
    return next({message: 'Earthquake'})
  }
};

authController.signin = (req, res, next) => {
    try {
      const {username, password} = req.body

      if (!username || !password) {
        return next({
          message: 'Both username and password are required',
        });
      }

      db.query('SELECT user_id FROM LOGIN WHERE username = $1 AND password = $2', [username, password], (err, result) => {
        if (err) {
            return next(err)
        }
        console.log(result, 'result')
        if (result.rows.length === 0) {
            return next({message: 'Need to sign up'})
        }
        res.locals.found = result.rows[0].user_id;
        return next()
        
      })

    } catch (error) {
        return next({
            message: 'Earthquake'
        })
        
    }



};

module.exports = authController;
