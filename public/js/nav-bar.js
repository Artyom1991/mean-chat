/**
 * Navigation bar class
 */
class NavigationBar {
    constructor() {
    }

    /**
     * Render navigation bar in container
     * @param containerId
     */
    static renderIn(containerId) {
        const CHAT_URL = "index.html",
            SIGN_UP_URL = "register.html",
            SIGN_IN_URL = "login.html",
            LOGOUT_URL = "logout",
            ADMIN_URL = "admin.html";

        var nav = $('<nav>', {class: "navbar navbar-default"}).append(
            $('<div>', {class: "container-fluid"}).append(
                $('<div>', {class: "navbar-header"}).append(
                    $('<a>', {class: "navbar-brand", href: CHAT_URL}).text("Chat")
                ),
                $('<ul>', {class: "nav navbar-nav"}).append(
                    $('<li>').append($('<a>', {href: SIGN_UP_URL}).text("Sign up")),
                    $('<li>').append($('<a>', {href: SIGN_IN_URL}).text("Sign in")),
                    $('<li>').append($('<a>', {href: LOGOUT_URL}).text("Logout")),
                    $('<li>').append($('<a>', {href: ADMIN_URL}).text("Admin"))
                )
            )
        );

        $('#' + containerId).append(nav);
    }
}