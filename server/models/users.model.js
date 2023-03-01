const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "A First Name is required"],
        minLength: 2
    },
    lastName: {
        type: String,
        required: [true, "A Last Name is required"],
        minLength: 2
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        },
        minLength: 8
    },
    password: {
        type: String,
        required: [true, "A Password is required"],
        minLength: [6, "Password should be at least 6 characters"]
    }, 
    
    
}, {timestamps: true})

UserSchema.virtual('confirmPassword')
.get(()=> this._confirmPassword)
.set(value => this._confirmPassword = value)

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match')
    }
    next()
})

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash
        next()
    })
})

const User = mongoose.model('User', UserSchema)
module.exports = User