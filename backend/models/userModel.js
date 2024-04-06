const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      }
})

userSchema.statics.signup = async function(email, password) {
    if(!email || !password){
        throw Error('Fill all fields...')
    }
    if(!validator.isEmail(email)){
        throw Error('Enter a valid email...')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Enter a strong password...')
    }

    const exists = await this.findOne({ email })
  
    if (exists) {
      throw Error('Email already in use...')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password : hash})

    return user
}

userSchema.statics.login = async function(email,password){
    if(!email || !password){
        throw Error('Fill all fields...')
    }

    const user = await this.findOne({ email, })
    if (!user) {
        throw Error('No account with this email...')
      }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect login credentials...')
    }
    return user
}

module.exports = mongoose.model('User',userSchema)