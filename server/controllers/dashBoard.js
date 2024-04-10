const pool = require('../models/SQL');

let dashBoardController = {}

dashBoardController.job = async(req, res, next) => {
    const {username, job_title, location, job_link, rating, notes} = req.body
    try {
        const userQuery = `
        SELECT user_id
        FROM login
        WHERE username = $1;`;

        const userResult = await pool.query(userQuery, [username]);
      const user_id = userResult.rows[0].user_id;
  
     
      const query = `
        INSERT INTO job_reviews (user_id, job_title, location, job_link, rating, notes)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;`;
  
      const values = [user_id, job_title, location, job_link, rating, notes];
  
      const result = await pool.query(query, values);
      console.log(result, 'result')
      
    //   res.status(201).json(result.rows[0]); // Return the inserted row
    res.locals.data = result.rows[0]
    return next()

        
    } catch (error) {
        return next(error)
        
    }
    

    



}





module.exports = dashBoardController

