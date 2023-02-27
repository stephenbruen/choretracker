const mongoose = require('mongoose')

const UserJobs = new mongoose.Schema({
    title: String,
    description: String,
    location: String
}, {timestamps: true})
const UserJob = mongoose.model('UserJob', UserJobs)
module.exports = UserJob