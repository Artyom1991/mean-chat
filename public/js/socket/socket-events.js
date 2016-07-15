/** connect to server socket*/
var socket = io();

/** get actual token from session storage*/
let authToken = TokenHandler.getToken();

let chatMessagesUl = $('#chatMessagesUl');
let chatMembersUl = $('#chatMembersUl');

/** subscribe on "connect" event*/
socket.on('connect', function () {
    /**
     * Try to authenticate
     *
     * Check that auth token exists in session storage.
     */
    if (authToken) {
        socket.emit('authentication', authToken);

        /** subscribe on authorized event*/
        socket.on('successfully authenticated', function (resp) {
            console.info("socket.io authenticated event: %s", resp);

            /** subscribe on receive all previous messages show for new connected user*/
            socket.on('all previous messages cache', function (messages) {
                if (messages instanceof Array) {
                    messages.forEach((message)=> {
                        chatMessagesUl.append(liFromChatMessage(message));
                    })
                } else console.error("Something wrong, expect JSON array of message objects, but received: %s", messages);
            });

            /** subscribe on members list change event */
            socket.on('chat members list change', function (membersList) {
                console.log(membersList);

                //refresh members list
                chatMembersUl.empty();
                chatMembersUl.append(liNodesFromChatMembers(membersList));
            });

            /** while new message from server event, add message to page*/
            socket.on('chat message created', function (msgObj) {
                chatMessagesUl.append(liFromChatMessage(msgObj));
                //scroll down
                let chatMessagesContainer = $("#chatMessagesContainer");
                chatMessagesContainer.animate({scrollTop: chatMessagesContainer.prop("scrollHeight") - chatMessagesContainer.height()}, "fast");
            });
        });

        /** subscribe on authorization failed event*/
        socket.on('authorization failed', function (resp) {
            console.error("socket.io authenticated failed: %s", resp);
        });
    } else
        console.warn("Socket connect event, but no auth token in session storage");
});

const chatMessageInput = $('#chatMessageInput');
const sendMessageButton = $('#chatSendMessageButton');

/** send message from input field to server by sockets*/
//while send button clicked
sendMessageButton.click(function () {
    if (chatMessageInput.val() != "")
        socket.emit('chat message', chatMessageInput.val());
    chatMessageInput.val('');
});

//or "enter" key pressed while focused on input.
chatMessageInput.keydown(function (e) {
    const ENTER_BUTTON_CODE = 13;

    var key = e.which;
    if (key == ENTER_BUTTON_CODE)  // the enter key code
    {
        sendMessageButton.click();
        //return false;
    }
});

/**
 * Create list item from message object.
 *
 * @param chatMessageObj chat message object
 * @returns {*|jQuery} list item
 */
function liFromChatMessage(chatMessageObj) {
    //convert ISO date to user Locale
    var date = (new Date(chatMessageObj.created)).toLocaleString();

    //return list item
    return $('<li>', {class: "list-group-item"})
        .append($('<p>')
            .append(date + " ")
            .append($('<strong>').text(chatMessageObj.userLogin + ": "))
            .append(chatMessageObj.message))
}

/**
 * Create array of <li> list items from users.
 *
 * @param chatMembers - user arr.
 * @returns {*} array of <li> elements with users logins.
 */
function liNodesFromChatMembers(chatMembers) {
    return $.map(chatMembers, function (member) {
        return $('<li>', {class: "list-group-item"}).html(member);
    });
}