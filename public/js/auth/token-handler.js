/**
 * Token handler
 * @namespace
 * @type {{saveToken, getUserProfile, getToken}}
 */
var TokenHandler = (function () {
    /**
     * Parse base64 string
     * @see {@link https://github.com/davidchambers/Base64.js}
     * @param str string to parse
     * @returns {string}
     */
    function url_base64_decode(str) {``
        var output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }
        return window.atob(output);
    }

    return {
        /**
         * Save token to session storage.
         * @param token to save
         */
        saveToken: function (token) {
            sessionStorage.token = token;
        },
        /**
         * Get authorized user login from storage,
         * if exists.
         * @returns user login or null
         */
        getUserProfile: function() {
            var LOGIN_INDEX_IN_JWT_TOKEN = 1;
            var tokenJWT = sessionStorage.getItem('token');
            //if no token in session storage return null
            if (!tokenJWT)
                return null;

            var encodedProfile = sessionStorage.getItem('token').split('.')[LOGIN_INDEX_IN_JWT_TOKEN];
            //user profile
            return (JSON.parse(url_base64_decode(encodedProfile)));
        },
        /**
         * Get token from session storage
         * @returns {string|*|token}
         */
        getToken: function(){
            return sessionStorage.token;
        }
    }
}());



