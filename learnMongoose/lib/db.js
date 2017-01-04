const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/learn')

const DB = mongoose.connection

/**
 * 连接成功
 */
DB.on('connected', function () {
    console.log('Mongoose connection open to mongodb://localhost:27017/learn')
});

/**
 * 连接异常
 */
DB.on('error',function (err) {
    console.log('Mongoose connection error: ' + err)
});

/**
 * 连接断开
 */
DB.on('disconnected', function () {
    console.log('Mongoose connection disconnected')
});

module.exports = mongoose