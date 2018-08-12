'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Dish = new Schema({
  name: {
    type: String,
    required: 'Missing Required Name'
  },
  location: {
    type: String,
    required: 'Missing Location ID'
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  upvotes: {
    type: Number,
  },
  category: {
    type: [String],
  }
});

module.exports = mongoose.model('Dish', Dish);
