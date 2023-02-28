const Jobs = require('../models/jobs.model')


module.exports.createJob = (request, response) => {
    Jobs.create(request.body)
    .then(newJob => response.json(newJob))
    .catch(err => response.status(400).json({message: "An error has occured", error: err}))
}

module.exports.findAllJobs = (request, response) => {
    Jobs.find({})
    .then((allJobs) => response.json(allJobs))
    .catch((err) => response.status(400).json(err))
}

module.exports.findOneJob = (request, response) => {
    Jobs.findOne({_id: request.params.id})
    .then((oneJob) => {
        console.log(oneJob);
        response.json(oneJob);
    })
}

module.exports.findOneAndUpdate = (request, response) => {
    Jobs.findOneAndUpdate ({_id: request.params.id}, request.body, {new: true, runValidators: true})
    .then(updateJob => response.json(updateJob))
    .catch((err) => response.status(400).json({message: "An error has occured", error: err}))
}

module.exports.deleteJob = (request, response) => {
    Jobs.deleteOne({_id: request.params.id})
    .then(deleteConfirmation => response.json(deleteConfirmation))
    .catch((err) => console.log(err))
}