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
            SIGN_UP_URL = "sign-up.html",
            SIGN_IN_URL = "sign-in.html",
            ADMIN_URL = "admin.html";

        var userProfile = getUserProfile();
        var nav = $('<nav>', {class: "navbar navbar-default"}).append(
            $('<div>', {class: "container-fluid"}).append(
                $('<div>', {class: "navbar-header"}).append(
                    $('<a>', {class: "navbar-brand", href: CHAT_URL}).text("Chat!")
                ),
                $('<ul>', {class: "nav navbar-nav"}).append(
                    $('<li>').append($('<a>', {href: ADMIN_URL}).text("Admin panel"))
                ),
                $('<ul>', {class: "nav navbar-nav navbar-right"}).append(
                    userProfile ?
                        $('<li>').append($('<a>', {}).text("Logout, " + getUserProfile().login).click(logout))
                        :
                        [$('<li>').append($('<a>', {href: SIGN_UP_URL}).text("Sign up")),
                            $('<li>').append($('<a>', {href: SIGN_IN_URL}).text("Sign in"))]
                )
            )
        );

        $('#' + containerId).append(nav);
    }
}

/**
 * Logout
 */
function logout() {
    sessionStorage.removeItem('token');
    window.location.reload();
}
