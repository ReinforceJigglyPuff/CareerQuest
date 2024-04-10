const db = require("../models/SQL");
const API_URL = process.env.OPENAI_API_URL;
const API_KEY = process.env.OPENAI_API_KEY;
let gptController = {};

gptController.compare = (req, res, next) => {
  const {resume} = req.body
  // console.log(API_URL, API_KEY);
  fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "user",
          content:
            "rank the following job descriptions compared to the resumes from 1 to 10, 1 being the highest. respond with nothing but an array with these job descriptions in an array, with index 0 being rank 1",
        },
        {
          role: "user",
          content: "resume:" + resume,
        },
        {
          role: "user",
          content: "job descriptions: " + JSON.stringify(res.locals.data),
        },
        // {
        //   role: 'user',
        //   content:
        //     'Has to be software engineer related'
        // },
      ],
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      const content = data.choices[0].message.content;

      res.locals.gpt=content;
      console.log(res.locals.gpt);
      return next();
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = gptController;
