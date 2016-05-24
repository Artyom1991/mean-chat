/**
 * Chat message model.
 *
 * Chat message mongoose schema.
 */
var mongoose = require('mongoose');

/** Chat message schema*/
var ChatMessageSchema = mongoose.Schema({
    created: Date,
    message: String,
    userLogin: String
});

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);
