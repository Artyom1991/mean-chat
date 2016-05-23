/**
 * User model.
 *
 * User mongoose schema,
 * bcrypt middleware on UserSchema,
 * User password verification function.
 */

var mongoose = require('mongoose');
var MongooseSchema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

/**
 * User schema
 */
var UserSchema = new MongooseSchema({
    login: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
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

module.exports = mongoose.model('UserModel', UserSchema);
