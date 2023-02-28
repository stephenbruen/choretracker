const jwt = require('jsonwebtoken')
const User = require('../models/users.model')


const bcrypt = require('bcrypt')

const UsersController = {
    register: (req, res) => {
        User.create(req.body)
        .then(newUser => {
            const userToken = jwt.sign({
                id: newUser._id
            }, process.env.secret_key)
            res.cookie("usertoken", userToken, {
                httpOnly: true
            }).status(201).json({msg: 'success', user: newUser})
            console.log(res.data)
        })
        .catch(err=> res.status(400).json({message: "problem with registration", error: err}))
    },
    login: async(req, res) => {
        const user = await User.findOne({email: req.body.email})
        if (user === null) {
            return res.status(400).json({message: "Invalid User"})
        }
        const correctPassword = bcrypt.compare(req.body.password, user.password)

        if(!correctPassword) {
            return res.status(400).json({message: "Invalid Password"})
        }
        const userToken = jwt.sign({
            id: user._id
        }, process.env.secret_key)
        console.log(userToken)
        
        res
            .cookie("usertoken", userToken, {
                httpOnly: true
            })
            .json({msg: "success", userInfo: {
                id: user._id
            }})
    },
    logout: (req, res)=> {
        res.clearCookie('usertoken')
        res.status(200).json({user: 'logged out'})
    },
    getAllUsers: (req, res) => {
        User.find({})
        .then((allUsers)=> {
            console.log(allUsers)
            res.status(201).json(allUsers)
        })
        .catch(err=> {
            res.status(400).json({message: 'An error has occured', error: err})
        })
    },
    getOne: (req, res)=> {
        User.findById({email: req.body}, )
    },
    
} 
module.exports = UsersController