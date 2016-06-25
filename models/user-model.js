/**
 * User model.
 *
 * User mongoose schema,
 * bcrypt middleware on UserSchema,
 * User password verification function.
 */
"use strict";
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nconf = require('nconf');

/** read configuration*/
nconf.reset();
nconf.argv().env()
    .add('secret', {type: 'file', file: 'config/config-common.json'})
    .add('user-fields-enums', {type: 'file', file: 'config/user-auth-groups.json'});

const SALT_WORK_FACTOR = 10;
const USER_ROLES = nconf.get("user-fields-enums:roles");
/**
 * User schema.
 *
 * Encapsulates fields validators.
 */
var UserSchema = new mongoose.Schema({
    login: {
        type: String,
        unique: true,
        required: [true, "No login"]
    },
    email: {
        type: String,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email!"],
        required: [true, "No email!"]
    },
    password: {
        type: String,
        required: true
    },
    /** while user register - set by system*/
    role: {
        type: String,
        enum: USER_ROLES,
        required: [true, "No role"]
    },
});

/**
 * Bcrypt middleware on UserSchema.
 *
 * Performing before saving User to DB,
 * automatically hash the password before it’s saved to the database.
 */
UserSchema.pre('save', function (next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (this.isModified('password') || this.isNew) {
        //generate salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) return next(err);

            // hash the password along with our new salt
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);

                // override the plain text password with the hashed one
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

/**
 * Password verification.
 *
 * Set compare password function
 * @param candidatePassword
 * @param cb
 */
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);

        cb(null, isMatch);
    });
};

