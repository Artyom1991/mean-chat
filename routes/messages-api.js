var express = require('express');
var chatCacheInstance = require('../events/chat-cache');
var router = express.Router();

/**
 * GET all messages from DB
 */
router.get('/', function (req, res, next) {
    res.json(chatCacheInstance.messages)
});

module.exports = router;