const mongoose = require('mongoose');
let AppSchema = mongoose.Schema

let MemberSchema = new AppSchema ({
    name: String,
    email: String,
    address: {
        street: String,
        suite: String,
        city: String,
        zipcode: String
    },
}, {versionKey: false})

module.exports = mongoose.model('members', MemberSchema)