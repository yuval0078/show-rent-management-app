const mongoose = require('mongoose');
let AppSchema = mongoose.Schema

let UserSchema = new AppSchema ({
    userName: String,
    password: String
}, {versionKey: false})

module.exports = mongoose.model('users', UserSchema)