#MEAN-CHAT
Simple Node js chat on MEAN stack.

[Chat deployed on heroku](https://mean-chat-example.herokuapp.com)

##Features
* [x] Allow users to sign-in/sign-up.
* [ ] Social integration: sign-in/sign-up by vk.com or facebook.
* [x] Chat with each other in real-time (socket.io provided feature).
* [x] See actual list of chat members.
* [x] List of all registered users for admin.
* [x] Jasmine tests.

## API definition

[Detailed API specification, made by apiDoc tool](https://fierce-crag-68010.herokuapp.com/doc/)

### Auth
* [x] POST [/sign-up]() - register.
* [x] POST [/sign-in]() - sign in.

### User
* [x] POST [/api/users]() - create new user.
* [x] GET [/api/users]() - get all users.
* [x] GET [/api/users/:user_login]() - get user by login.
* [x] PUT [/api/users/:user_login]() - replace user by new one from request.
* [x] DELETE [/api/users/:user_login]() - delete user by login.

##Developed on

> Require: node since 4.4, npm, bower.

| | |
| --- | --- |
| Node js | socket.io, jwt.io, bcrypt, nconf, winston, jasmine |
| Mongo DB | mongoose ODM, mLab cloud db hosting|
| Express |
| Angular |
| Bootstrap |

[Updating npm](https://docs.npmjs.com/getting-started/installing-node)
[Manage node version](https://www.npmjs.com/package/n)

To install packages:

    $ git clone https://github.com/polesskiy-dev/mean-chat
    $ cd mean-chat
    $ npm install
    (also npm will invoke bower install in postinstall script)

    # Open browser on http://localhost:3000

Test admin access:

    login: admin
    pass: admin

Test user access:

    login: user
    pass: user

Generate [apiDoc](http://apidocjs.com/)
    
    $ apidoc -i ./ -f "app.js" -o ./public/doc

## License

MIT