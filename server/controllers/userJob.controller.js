const UserJob = require('../models/userJob.model')

const AddController = {
    addJob: (req, res) => {
        UserJob.create(req.body)
        .then(newJob => res.json(newJob))
        .catch(err => res.status(400).json({message: "An error has occured", error: err}))
    },
    viewJob: (req, res)=> {
        UserJob.find({})
        .then(job => res.json(job))
        .catch(err => res.json(err))
    }
}

module.exports = AddController