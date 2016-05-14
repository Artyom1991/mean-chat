/**
 * Users REST API implementation
 */

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var userSchema = require('../models/user-schema');

/**
 * GET all users from DB
 */
router.get('/', function (req, res, next) {
  mongoose.model('UserModel').find({}, function (err, users) {
    if (err) {
      return console.error(err)
    }
    else {
      res.json(users);
    }
  })
});

/**
 * GET single user by login
 * :user_login user's login to find by
 */
router.get('/:user_login', function (req, res, next) {
  mongoose.model('UserModel').findOne({login: req.params.user_login},
      function (err, user) {
        if (err) {
          console.log("While requesting for user with login " +
              req.params.user_login + " error occurs: " + err);
          res.statusCode = 404;
          res.end();
        }
        else {
          if (user)
            res.json(user);
          else {
            res.statusCode = 400;
            res.end();
          }
        }
      })
});

/**
 * POST (create) new user
 */
router.post('/', function (req, res) {
  //user from request
  var user = {
    login: req.body.login,
    email: req.body.email,
    password: req.body.password
  };

  //TODO implement validation with notifying client-side

  if (user.login && user.email && user.password) {
    mongoose.model('UserModel').create(user, function (err) {
      if (err) {
        res.statusCode = 500;
        res.send("There was a problem adding the information to the database." + err);
      } else {
        //User has been created
        console.log('POST creating new user: %s', JSON.stringify(user));
        res.statusCode = 200;
        res.end();
      }
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

/**
 * PUT (edit) user by login
 * :user_login user's login to find by
 */
router.put('/:user_login', function (req, res) {
  mongoose.model('UserModel').findOneAndUpdate({login: req.params.user_login}, req.body, function (err) {
    if (err) {
      res.statusCode = 500;
      res.send(sprintf("There was a problem updating in DB user:\r\n%s\r\n%s", req.params, err));
    } else {
      //User has been created
      console.log("User has been edited: %s", JSON.stringify(req.body));
      res.statusCode = 200;
      res.end();
    }
  });
});

/**
 * DELETE user by login
 * :user_login user's login to find by
 */
router.delete('/:user_login', function (req, res) {
  mongoose.model('UserModel').remove({login: req.params.user_login},
      function (err, user) {
        if (err) {
          console.log("While deleting user with login " +
              req.params.user_login + " error occurs: " + err);
          res.statusCode = 500;
          res.end();
        }
        else {
          if (user)
            res.json(user);
          else {
            res.statusCode = 404;
            res.end();
          }
        }
      })
});

/**
 * DELETE all users
 */
router.delete('/', function (req, res) {
  mongoose.model('UserModel').remove({},
      function (err) {
        if (err) {
          console.log("Error while deleting all users");
          res.statusCode = 500;
          res.end();
        } else {
          console.log("All users successfully deleted");
          res.statusCode = 200;
          res.end();
        }
      })
});

module.exports = router;