var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
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

mongoose.model('UserModel', userSchema);

