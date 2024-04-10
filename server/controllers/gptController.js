const db = require('../models/SQL');

let gptController = {};

gptController.compare = (req, res, next) => {
  fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo-0125',
      messages: [
        {
          role: 'user',
          content: 'The company i am applying for is' + ' ' + companyName,
        },
        {
          role: 'user',
          content: 'Here is the job description' + ' ' + description,
        },
        {
          role: 'user',
          content: 'my resume is' + ' ' + Summary,
        },
        {
          role: 'user',
          content: `Separate each question and Answer each question in ${sentences} sentences with technical communication based on all information given ${Question}`,
        },
        {
          role: 'user',
          content:
            'Has to be software engineer related'
        },
      ],
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setinput1(data.choices[0].message.content);
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = gptController;