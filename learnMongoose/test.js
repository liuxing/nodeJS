const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/learn')
const DB = mongoose.connection

DB.on('connected', ()=>{
    console.log('DB connected')
})

DB.on('disconnected', ()=>{
    console.log('DB disconnected')
})

DB.on('error', (err)=>{
    console.error(err)
})

const blogSchema = new mongoose.Schema({
    title:  String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs:  Number
    }
})

let blogModel = mongoose.model('Blog', blogSchema)

let blogEntity = new blogModel({
    title:  "Mongoose",
    author: "Reg.Jay",
    body:   "Documents are instances of out model. Creating them and saving to the database is easy",
    comments: [{body: "It's very cool! Thanks a lot!", date: "2014.07.28"}],
    hidden: false,
    meta: {
        votes: 100,
        favs:  99
    }
})

blogEntity.save((err, data)=>{
    if(err) return console.error(err)
    console.log('save success: ', data)
})
