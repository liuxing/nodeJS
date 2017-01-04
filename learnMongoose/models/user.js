const mongoose = require('mongoose')
const db = require('../lib/db')

const UserSchema = mongoose.Schema({
    username : { type: String },
    userpwd: {type: String},
    userage: {type: Number},
    logindate : { type: Date}
})

module.exports = mongoose.model('User', UserSchema)

