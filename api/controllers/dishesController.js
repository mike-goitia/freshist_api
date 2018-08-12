'use strict';

var mongoose = require('mongoose'),
  Dish = mongoose.model('Dish');

exports.list_all_dishes = function(req, res) {
  Dish.find({}, function(err, dish) {
    if (err)
      res.send(err);
    res.json(dish);
  });
};

exports.create_dish = function(req, res) {
  var new_dish = new Dish(req.body);
  new_dish.save(function(err, dish) {
    if (err)
      res.send(err);
    res.json(dish);
  });
};

exports.upvote_dish = function(req, res) {
  console.log(req.body.id)
  Dish.findOneAndUpdate({_id: req.body.id}, {$inc : {"upvotes" : 1 }}, function(err, dish) {
    if (err)
      res.send(err);
    res.json('Successfully Upvoted');
  });
};
//
// exports.read_a_task = function(req, res) {
//   Task.findById(req.params.taskId, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };
//
// exports.update_a_task = function(req, res) {
//   Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };
//
// exports.delete_a_task = function(req, res) {
//   Task.remove({
//     _id: req.params.taskId
//   }, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json({ message: 'Task successfully deleted' });
//   });
// };
