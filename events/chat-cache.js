/**
 * Cache for all chat messages.
 * 
 * @constructor
 */
function ChatCache() {
    this._MESSAGES_CACHE_CAPACITY = 100;
    this.messages = [];

    /**
     * Add message to cache.
     *
     * When cache capacity will be reached, old messages will be deleted
     * @param chatMessageObj chat message
     */
    this.pushMessage = function (chatMessageObj) {
        if (this.messages.length >= this._MESSAGES_CACHE_CAPACITY)
            this.messages.pop();
        this.messages.push(chatMessageObj);
    }
}

/** create new single instance of chat cache*/
var chatCacheInstance = new ChatCache();

module.exports = chatCacheInstance;


