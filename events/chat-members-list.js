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
     * @returns {Array} - array of logins.
     */
    this.getMembersLogins = function () {
        return this.members.map(function (member) {
            return member.login;
        });
    }

    /**
     * Remove member from chat members list by login.
     * @param login - members to delete login.
     */
    this.removeMemberByLogin = function (login) {
        var userIndex = this.members.findIndex(function (member) {
            return member.login == login;
        });

        this.members.splice(userIndex, 1);
    }
}
/** create new single instance of chat members list*/
var chatMembersList = new ChatMembersList();

module.exports = chatMembersList;
