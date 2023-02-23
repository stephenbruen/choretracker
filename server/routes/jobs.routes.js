const JobsController = require('../controllers/jobs.controller');

module.exports = (app) => {
    app.post('/api/addJob', JobsController.createJob);
    app.get('/api/dashboard', JobsController.findAllJobs);
    app.get('/api/view/:id', JobsController.findOneJob);
    app.put('/api/edit/:id', JobsController.findOneAndUpdate);
    app.delete('/api/job/:id', JobsController.deleteJob);
}