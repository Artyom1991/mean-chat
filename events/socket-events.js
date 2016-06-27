/**
 * Socket.io events handler
 *
 * @param io socket.io
 */
const util = require('util');
const ChatMessage = require('../models/chat-message');
const chatCacheInstance = require('../events/chat-cache');
const chatMembersListInstance = require('../events/chat-members-list');
const authCheck = require('../auth/auth-check');

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
        console.log("incoming message from %s by socket id %s : %s",dbUser.login, socketClient.id, messagePlainText);

        /** create message obj from incoming message text*/
        let receivedMsg = new ChatMessage(messagePlainText, dbUser.login);

        /** store message in cache*/
        chatCacheInstance.pushMessage(receivedMsg);

        /** send message to all connected users*/
        io.emit('chat message created', receivedMsg);
    });

    /** subscribe on user disconnect event*/
    socketClient.on('disconnect', function () {
        console.log('user %s disconnected', dbUser.login);

        //remove from chat members list
        chatMembersListInstance.removeMemberByLogin(dbUser.login);
        
        //notify all that user left chat
        io.emit('chat members list change', chatMembersListInstance.getMembersLogins());
    });
}

module.exports = function (io) {
    /** subscribe on events from client*/
    io.on('connection', function (client) {

        /** subscribe on user successfully connected event*/
        client.on('connect', function () {
            console.log('a user connected');
            // client.broadcast.emit('user connected');
        });

        /** subscribe on user trying to authorization event*/
        client.on('authentication', function (token) {
            console.log("user trying to authorize through sockets, user token: %s", token);

            /**
             * Check user token for valid user and password,
             * pass cb function for success and not success (unauthorized)
             */
            authCheck.checkAuthToken(token,
                /** invalid token*/
                function () {
                    /** if user can't be authorized (wrong token), respond to user*/
                    io.to(client).emit('authorization failed', "");
                },

                /** valid token*/
                function (dbUser) {
                    console.log("user %j authorized", dbUser);
                    //subscribe on events
                    subscribeOnAuthorizedUserEvents(client, io, dbUser);

                    //add new user to chat members list
                    chatMembersListInstance.pushMember(dbUser);

                    //notify all that new user connected
                    io.emit('chat members list change', chatMembersListInstance.getMembersLogins());
                }
            );
        });
    })
};
