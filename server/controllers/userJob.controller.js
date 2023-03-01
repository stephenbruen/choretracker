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
    },
    deleteJob: (req, res) => {
        UserJob.deleteOne({_id: req.params.id})
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch((err) => console.log(err))
    },
    findOneJob: (request, response) => {
        UserJob.findOne({_id: request.params.id})
        .then((oneJob) => {
            console.log(oneJob);
            response.json(oneJob);
        })
    }
}

module.exports = AddController