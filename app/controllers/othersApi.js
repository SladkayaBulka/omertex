const User = require('../models/user');
const request = require('request');

const getUsers = (req, res) => {
    User.find()
    .exec()
    .then(allUsers => res.json(allUsers))
    .catch(err => res.status(500).json(err));
};

const getResponseTime = (req, res) => {
    var startRequest = new Date();
    request('http://www.google.com', (error, response, body) => {
       res.json({latency: new Date() - startRequest + 'ms'});
      });
};


module.exports = {
    getUsers,
    getResponseTime
};