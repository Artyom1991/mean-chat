/**
 * Socket.io events
 */
const util = require('util');
const ChatMessage = require('../models/chat-message');
const chatCacheInstance = require('../events/chat-cache');
const chatMembersList = require('../events/chat-members-list');
const authCheck = require('../auth/check-auth-token');
const log = require('../utils/logger')(module);

/**
 * Subscribe on authorized user events.
 *
 * @param socketClient - socket io client connection
 * @param io - socket.io
 * @param dbUser - user fetched from database
 */
function subscribeOnAuthorizedUserEvents(socketClient, io, dbUser) {
    /** respond to user with greeting message*/
    io.to(socketClient.id).emit('successfully authenticated', "Successfully authenticated!");

    /** respond all previous messages from chat cache*/
    io.to(socketClient.id).emit('all previous messages cache', chatCacheInstance.messages);

    /** subscribe on user incoming message event*/
    socketClient.on('chat message', function (messagePlainText) {
        log.info("incoming message from %s by socket id %s : %s", dbUser.login, socketClient.id, messagePlainText);

        /** create message obj from incoming message text*/
        let receivedMsg = new ChatMessage(messagePlainText, dbUser.login);

        /** store message in cache*/
        chatCacheInstance.pushMessage(receivedMsg);

        /** send message to all connected users*/
        io.emit('chat message created', receivedMsg);
    });

    /** subscribe on user disconnect event*/
    socketClient.on('disconnect', function () {
        log.info('user %s disconnected', dbUser.login);

        //remove from chat members list
        chatMembersList.removeMemberByLogin(dbUser.login);

        //notify all that user left chat
        io.emit('chat members list change', chatMembersList.getLogins());
    });
}

module.exports = function (io) {
    /** subscribe on events from client*/
    io.on('connection', function (client) {

        /** subscribe on user successfully connected event*/
        client.on('connect', function () {
            log.info('new user connected');
            // client.broadcast.emit('user connected');
        });

        /** subscribe on user trying to authorization event*/
        client.on('authentication', function (token) {
            log.info("user trying to authorize through sockets, user token: %s", token);

            /**
             * Check user token for valid user and password,
             * pass cb function for success and not success (unauthorized)
             */
            authCheck.checkAuthToken(token,
                /** valid token*/
                (dbUser) => {
                    log.info("user %s authorized", JSON.stringify(dbUser));

                    //subscribe on events
                    subscribeOnAuthorizedUserEvents(client, io, dbUser);

                    //add new user to chat members list
                    chatMembersList.pushMember(dbUser);

                    //notify all subscribed users that new user connected
                    io.emit('chat members list change', chatMembersList.getLogins());
                },

                /** if user can't be authorized (wrong token), respond to user*/
                (err)=>io.to(client).emit('authorization failed', err)
            );
        });
    })
};
