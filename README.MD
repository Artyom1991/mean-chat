#MEAN-CHAT
Simple nodejs chat on MEAN stack.

##Features
* Allow users to sign-in/sign-up.
* Chat with each other by sockets.

[Chat on heroku](https://fierce-crag-68010.herokuapp.com)

Uses Node.js, MongoDB (mongoose odm) on mLab, Express, Angular.

Require: node since 5.0, npm, bower.
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

