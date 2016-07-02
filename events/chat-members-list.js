/**
 * Chat members list.
 *
 * Container for users that online in chat.
 *
 * @constructor
 */
function ChatMembersList() {
    this.members = [];

    /**
     * Add user to chat members list.
     * @param user - user from DB, for example.
     */
    this.pushMember = function (user) {
        this.members.push(user);
    };

    /**
     * Get online members logins
     * @returns {Array} - array of user logins.
     */
    this.getLogins = function () {
        return this.members.map(function (user) {
            return user.login;
        });
    };

    /**
     * Remove member from chat members list by login.
     * @param login - member's login to delete.
     */
    this.removeMemberByLogin =
        (login)=> this.members.splice(this.members.indexOf(login), 1)
}
/** create new single instance of chat members list*/
var chatMembersList = new ChatMembersList();

module.exports = chatMembersList;
