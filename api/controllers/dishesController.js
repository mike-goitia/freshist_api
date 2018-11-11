'use strict';

var mongoose = require('mongoose'),
  Dish = mongoose.model('Dish');

exports.list_all_dishes = function(req, res) {
  Dish.find({}, function(err, dishes) {
    if (err)
      res.send(err);
    res.json(dishes);
  });
};

exports.get_dish = function(req, res) {
  Dish.find({_id: req.body.id}, function(err, dish) {
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

exports.up_vote_dish = function(req, res) {
  console.log(req.body.id)
  Dish.findOneAndUpdate({_id: req.body.id}, {$inc : {"up_votes" : 1 }}, function(err, dish) {
    if (err)
      res.send(err);
    res.json('Successfully Up Voted');
  });
};

exports.down_vote_dish = function(req, res) {
  console.log(req.body.id)
  Dish.findOneAndUpdate({_id: req.body.id}, {$inc : {"down_votes" : 1 }}, function(err, dish) {
    if (err)
      res.send(err);
    res.json('Successfully Down Voted');
  });
};
