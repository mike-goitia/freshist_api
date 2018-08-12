'use strict';
module.exports = function(app) {
  var dishes = require('../controllers/dishesController');

  // Dishes Routes
  app.route('/dishes')
    .get(dishes.list_all_dishes)
    .post(dishes.create_dish);

  app.route('/upvote')
    .post(dishes.upvote_dish);
  // app.route('/tasks/:taskId')
  //   .get(todoList.read_a_task)
  //   .put(todoList.update_a_task)
  //   .delete(todoList.delete_a_task);
};
