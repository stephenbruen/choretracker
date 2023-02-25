const UsersController = require('../controllers/users.controller')


module.exports = (app) => {
    app.post('/api/register', UsersController.register)
    app.post('/api/login', UsersController.login)
    app.get('/api/logout', UsersController.logout)
    app.get('/api/allUsers', UsersController.getAllUsers)
    
}