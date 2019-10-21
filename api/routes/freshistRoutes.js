'use strict';
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

// Define middleware that validates incoming bearer tokens
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.JWKS_URI
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER,
  algorithm: ["RS256"]
});

module.exports = function(app) {
  var dishes = require('../controllers/dishesController');
  var user = require('../controllers/userController')

  app.get('/', function (req, res) {
    res.send('Freshist API')
  })

  app.get("/api/external", checkJwt, (req, res) => {
    res.send({
      msg: Date.now() + " Your Shit is Legit!!"
    });
  });

  app.get('/dishes', dishes.list_all_dishes)
  app.post('/create_dish', dishes.create_dish)
  app.post('/get_dish', dishes.get_dish)
  app.post('/up_vote',dishes.up_vote_dish)
  app.post('/down_vote',dishes.down_vote_dish)

  // app.post('/favorite_dish',dishes.favorite)
  // Dishes Routes
  // app.route('/create_dish')
  //   .post(dishes.create_dish);
  // app.route('/upvote')
  //   .post(dishes.upvote_dish);
  // app.route('/tasks/:taskId')
  //   .get(todoList.read_a_task)
  //   .put(todoList.update_a_task)
  //   .delete(todoList.delete_a_task);
};
