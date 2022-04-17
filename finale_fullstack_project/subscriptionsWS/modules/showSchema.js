const mongoose = require('mongoose');
let AppSchema = mongoose.Schema

let ShowSchema = new AppSchema ({
    url: String,
    name: String,
    language: String,
    genres: [String],
    premiered: String,
    ended: String,
    officialSite: String,
    rating: {
        average: Number
    },
    image: {
        medium: String,
        original: String
    },
    summary: String,
}, {versionKey: false})

module.exports = mongoose.model('shows', ShowSchema)