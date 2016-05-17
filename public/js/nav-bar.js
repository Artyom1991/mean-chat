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
            SIGN_IN_URL = "sign-in.html",
            LOGOUT_URL = "sign-out.html",
            ADMIN_URL = "admin.html";

        var nav = $('<nav>', {class: "navbar navbar-default"}).append(
            $('<div>', {class: "container-fluid"}).append(
                $('<div>', {class: "navbar-header"}).append(
                    $('<a>', {class: "navbar-brand", href: CHAT_URL}).text("Chat")
                ),
                $('<ul>', {class: "nav navbar-nav"}).append(
                    $('<li>').append($('<a>', {href: ADMIN_URL}).text("Admin panel"))
                ),
                $('<ul>', {class: "nav navbar-nav navbar-right"}).append(
                    $('<li>').append($('<a>', {href: SIGN_UP_URL}).text("Sign up")),
                    $('<li>').append($('<a>', {href: SIGN_IN_URL}).text("Sign in")),
                    $('<li>').append($('<a>', {href: LOGOUT_URL}).text("Logout"))
                )

            )
        );

        $('#' + containerId).append(nav);
    }
}