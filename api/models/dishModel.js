'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Dish = new Schema({
  created_date: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: 'Missing Required Name'
  },
  dish_type:{
    type: String,
  },
  location: {
    type: String,
    required: 'Missing Location ID'
  },
  cuisines:{
    type: String,
  },
  tags:{
    type: String,
  },
  up_votes: {
    type: Number,
  },
  down_votes: {
    type: Number,
  },
});

module.exports = mongoose.model('Dish', Dish);
