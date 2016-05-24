var express = require('express');
var mongoose = require('mongoose');
var ChatMessage = require('../models/chat-message-model');
var router = express.Router();

/**
 * GET all messages from DB
 */
router.get('/', function (req, res, next) {
    mongoose.model('ChatMessage').find({}, function (err, messages) {
        if (err) {
            return console.error(err)
        }
        else {
            res.json(messages);
        }
    })
});

module.exports = router;