const mongoose = require('mongoose');
let AppSchema = mongoose.Schema

let SubcSchema = new AppSchema ({
    memberId: String,
    shows: Array
}, {versionKey: false})

module.exports = mongoose.model('subs', SubcSchema)