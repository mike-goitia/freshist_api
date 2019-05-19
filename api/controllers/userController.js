'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.create_user = function(req, res) {
    console.log('TESTING ADD USER')
    console.log(typeof req.body)
    console.log(req.body)
    var new_user = new User(req.body);
    new_user.save(function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
};