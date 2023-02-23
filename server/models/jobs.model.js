const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "A job title is required."],
        minlength: [3, "The job title must be at least 3 characters long."]
    },
    description: {
        type: String,
        required: [true, "A job description is required."],
        minlength: [10, "The job description must be at least 10 characters long."]
    },
    location: {
        type: String,
        required: [true, "A location is required"]
    }
}, {timestamps: true});

const Jobs = mongoose.model('Jobs', JobSchema);
module.exports = Jobs;