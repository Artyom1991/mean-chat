/** connect to server socket*/
var socket = io();

/** get actual token from session storage*/
var token = TokenHandler.getToken();

var chatMessagesList = $('#chatMessagesList');

/** subscribe on "connect" event*/
socket.on('connect', function () {
    /** try to authenticate*/
    socket.emit('authentication', token);

    /** subscribe on authorized event*/
    socket.on('successfully authenticated', function (resp) {
        console.info("socket.io authenticated event: %s", resp);

        /** subscribe on receive all previous messages show for new connected user*/
        socket.on('all previous messages cache', function (messages) {
            if (messages instanceof Array) {
                messages.forEach((message)=> {
                    chatMessagesList.append(liFromChatMessage(message));
                })
            } else console.error("Something wrong, expect JSON array of message objects, but received: %s", messages);
        });

        /** subscribe on members list change event */
        socket.on('members list change', function(membersList){
            //TODO this
        });

        /** while new message from server event, add message to page*/
        socket.on('chat message created', function (msgObj) {
            //console.log("event: %s, obj:%j", "chat message created", msgObj);
            chatMessagesList.append(liFromChatMessage(msgObj));
        });
    });

    /** subscribe on authorization failed event*/
    socket.on('authorization failed', function (resp) {
        console.error("socket.io authenticated failed: %s", resp);
    });
});

var chatMessageInput = $('#chatMessageInput');

/** send message from input to server*/
$('#chatSendMessageButton').click(function () {
    socket.emit('chat message', chatMessageInput.val());
    chatMessageInput.val('');
    return false;
});

function liFromChatMessage(chatMessageObj){
    return $('<li>', {class: "list-group-item"}).append(
        $('<p>').text("<strong>" + (chatMessageObj.created) +
            chatMessageObj.userLogin + ": " + "</strong>" + chatMessageObj.message)
    )
}