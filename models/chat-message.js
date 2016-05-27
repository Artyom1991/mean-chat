/**
 * Chat message class.
 *
 * @class
 */
class ChatMessage {
    /**
     * Chat message constructor.
     *
     * Add date stamp.
     * @constructor
     * @param message message text
     * @param userLogin users login
     */
    constructor(message, userLogin) {
        this.created = new Date();
        this.message = message;
        this.userLogin = userLogin;
    }
}

module.exports = ChatMessage;