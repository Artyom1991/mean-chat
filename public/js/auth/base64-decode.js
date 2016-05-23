/**
 * Parse base64 string
 *
 * @param str string to parse
 * @returns {string}
 */
function url_base64_decode(str) {
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
    return window.atob(output); //polyfill https://github.com/davidchambers/Base64.js
}