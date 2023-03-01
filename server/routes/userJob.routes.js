const UserJobController = require('../controllers/userJob.controller')


module.exports = (app) => {
    app.post('/api/userJob', UserJobController.addJob)
    app.get('/api/viewUserJob/', UserJobController.viewJob)
    app.get('/api/oneUserJob/:id', UserJobController.findOneJob)
    app.delete('/api/deleteUserJob/:id', UserJobController.deleteJob)
}