const UserJobController = require('../controllers/userJob.controller')

module.exports = (app) => {
    app.post('/api/userJob', UserJobController.addJob)
    app.get('/api/viewUserJob', UserJobController.viewJob)
}