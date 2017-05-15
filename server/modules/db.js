var mongoose = require('mongoose')
var settings = require('../setting.js')

var db

db = settings.host + '/' + settings.db
mongoose.connect(db)

mongoose.connection.on('close', function(){
    console.log('正在重新连接数据库')
    mongoose.connect(db)
})

mongoose.connection.on('error', function(error){
    console.log('连接失败')
    console.log(error)
    mongoose.disconnect()
})

module.exports = mongoose