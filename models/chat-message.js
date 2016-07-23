/**
 * Chat message class.
 *
 * Adds date stamp.
 * @constructor
 * @param message message text
 * @param userLogin users login
 */
"use strict";
function ChatMessage(message, userLogin) {
    this.created = new Date();
    this.message = message;
    this.userLogin = userLogin;
}

module.exports = ChatMessage;