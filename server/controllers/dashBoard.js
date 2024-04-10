// const pool = require('../models/SQL');

// let dashBoardController = {};


// //   const { username, location, notes } = req.body;
// //   // console.log(res.locals.gpt, 'gpt');
// //   const result = res.locals.gpt;
// //   let abc = ""
// //   for (let i =8;i<result.length-4;i++) {
// //     abc+=result[i];
// //   }
// //   console.log(typeof abc);
// //   console.log(abc);
// //   try {
// //       const userQuery = `
// //           SELECT user_id
// //           FROM login
// //           WHERE username = $1;`;
// //       const userResult = await pool.query(userQuery, [username]);
// //       const user_id = userResult.rows[0].user_id;

// //       // Step 1: Map Titles to Ratings
// //       const titleToRating = {};
// //       abc.forEach((item, index) => {
// //           // Assuming item.name contains the job title
// //           titleToRating[item.name] = index + 1; // Rating based on priority (1 being the highest)
// //       });

// //       let results = [];
// //       for (let content of res.locals.data) {
// //           console.log(content, 'content');

// //           // Step 2: Get rating for the current title
// //           const rating = titleToRating[content.name];

// //           const query = `
// //               INSERT INTO job_reviews (user_id, job_title, location, job_link, rating, notes)
// //               VALUES ($1, $2, $3, $4, $5, $6)
// //               RETURNING *;`;

// //           const values = [user_id, content.name, content.locations[0].name, content.refs.landing_page, rating, notes];

// //           // Step 3: Execute the query with the matched rating
// //           const result = await pool.query(query, values);
// //           console.log(result, 'result');

// //           results.push(result.rows[0]);
// //       }

// //       res.locals.table = results;
// //       return next();
// //   } catch (error) {
// //       console.error('Error in dashBoardController.job:', error);
// //       return next(error);
// //   }
// // };

// dashBoardController.job = async (req, res, next) => {
//   const { username, location, rating, notes } = req.body;


//   try {
//     const userQuery = `
//         SELECT user_id
//         FROM login
//         WHERE username = $1;`;

//     const userResult = await pool.query(userQuery, [username]);
//     const user_id = userResult.rows[0].user_id;

//     let results = [];
//     for (let i = 0; i < res.locals.data.length; i++) {
//       const content = res.locals.data[i];
//       // console.log(content, 'content');
//       const query = `
//         INSERT INTO job_details (user_id, job_title, location, job_link)
//         VALUES ($1, $2, $3, $4, $5, $6)
//         RETURNING *;`;

//       const values = [
//         user_id,
//         content.name,
//         content.locations[0].name,
//         content.refs.landing_page,
        
        
//       ];

//       const result = await pool.query(query, values);
//       // console.log(result, 'result');

//       //   res.status(201).json(result.rows[0]); // Return the inserted row
//       results.push(result.rows[0]);
//     }
//     res.locals.table = results;
//     return next();
//   } catch (error) {
//     return next(error);
//   }
// };

// // // dashBoardController.job = async (req, res, next) => {
// // //   const { username, location, notes } = req.body;
// // //   console.log(res.locals.gpt, 'gpt');

// // //   try {
// // //       const userQuery = `
// // //           SELECT user_id
// // //           FROM login
// // //           WHERE username = $1;`;
// // //       const userResult = await pool.query(userQuery, [username]);
// // //       const user_id = userResult.rows[0].user_id;

// // //       // Step 1: Map Titles to Ratings
// // //       const titleToRating = {};
// // //       res.locals.gpt.forEach((item, index) => {
// // //           // Assuming item.name contains the job title
// // //           titleToRating[item.name] = index + 1; // Rating based on priority (1 being the highest)
// // //       });

// // //       let results = [];
// // //       for (let content of res.locals.data) {
// // //           console.log(content, 'content');

// // //           // Step 2: Get rating for the current title
// // //           const rating = titleToRating[content.name];

// // //           const query = `
// // //               INSERT INTO job_reviews (user_id, job_title, location, job_link, rating, notes)
// // //               VALUES ($1, $2, $3, $4, $5, $6)
// // //               RETURNING *;`;

// // //           const values = [user_id, content.name, content.locations[0].name, content.refs.landing_page, rating, notes];

// // //           // Step 3: Execute the query with the matched rating
// // //           const result = await pool.query(query, values);
// // //           console.log(result, 'result');

// // //           results.push(result.rows[0]);
// // //       }

// // //       res.locals.table = results;
// // //       return next();
// // //   } catch (error) {
// // //       console.error('Error in dashBoardController.job:', error);
// // //       return next(error);
// // //   }
// // // };

// module.exports = dashBoardController;


const pool = require('../models/SQL');

let dashBoardController = {};

dashBoardController.job = async (req, res, next) => {
  const { username, notes } = req.body; // Removed 'location' and 'rating' since they're not used in the provided logic.

  try {
    // Fetch user_id based on username
    const userQuery = `SELECT user_id FROM login WHERE username = $1;`;
    const userResult = await pool.query(userQuery, [username]);
    const user_id = userResult.rows[0].user_id;

    let results = [];
    for (let content of res.locals.data) {
      // Find the index of the current job title in the priority list from res.locals.gpt
      // This index + 1 will be used as the rating, with 1 being the highest priority
      const rating = res.locals.gpt.indexOf(content.name) + 1;

      // If the job is not found in gpt list (rating = 0), skip this iteration or handle as needed
      if (rating === 0) continue; // or handle this case as required

      // Insert the job review into the database with the determined rating
      const query = `
        INSERT INTO job_reviews (user_id, job_title, location, job_link, rating, notes)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;`;
      const values = [
        user_id,
        content.name,
        content.locations[0].name, // Assuming there's always at least one location
        content.refs.landing_page,
        rating, // Use the calculated rating based on priority
        notes,
      ];

      const result = await pool.query(query, values);
      results.push(result.rows[0]);
    }

    // Store the result in res.locals for further processing or response
    res.locals.table = results;
    return next();
  } catch (error) {
    console.error('Error in dashBoardController.job:', error);
    return next(error);
  }
};


module.exports = dashBoardController;
