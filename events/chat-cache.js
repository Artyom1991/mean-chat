/**
 * Cache for all chat messages.
 */
class ChatCache {
    constructor() {
        this._MESSAGES_CACHE_CAPACITY = 100;
        this.messages = [];
    }

    /**
     * Add message to cache.
     *
     * When cache capacity will be reached, old messages will be deleted
     * @param chatMessageObj chat message
     */
    pushMessage(chatMessageObj){
        if (this.messages.length >= this._MESSAGES_CACHE_CAPACITY)
            this.messages.pop();
        this.messages.push(chatMessageObj);
    }
}

var chatCacheInstance = new ChatCache();

module.exports = chatCacheInstance;


