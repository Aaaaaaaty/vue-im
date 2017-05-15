var express = require('express')
var router = express.Router()
var userHandler = require('../modules/userHandler.js')

//get方式
// router.get('/login', function(req, res) {
//   var user = req.query
//   userHandler.login(user, function(obj) {
//     res.json(obj)
//   })
// })

router.post('/login', function(req, res) {
  var user = req.body
  userHandler.login(user, function(obj) {
    res.json(obj)
  })
})

router.post('/updateUser', function(req, res) {
  var user = req.body
  userHandler.updateUser(user, function(obj) {
    res.json(obj)
  })
})

router.post('/getUserList', function(req, res) {
  var username = req.body.username
  userHandler.getUserList(username, function(obj) {
    res.json(obj)
  })
})

router.post('/getUser', function(req, res) {
  var username = req.body.username
  userHandler.getUser(username, function(obj) {
    res.json(obj)
  })
})
 
router.post('/addUser', function(req, res) {
  var user = req.body
  userHandler.addUser(user, function(obj) {
    res.json(obj)
  })
})

//查询download_url
router.post('/getUserInfo', function(req, res) {
  var username = req.body.username
  console.log('api',req.body)
  userHandler.getUserInfo(username, function(obj) {
    res.json(obj)
  })
})
// var user = {
//   username: 'admin',
//   password: 'admin'
// }
// userHandler.addUser(user, function(obj) {
//   console.log(obj)
// })
// userHandler.deleteUser(user, function(obj) {
//   // res.json(obj)
//   console.log(obj)
// })

// userHandler.getUserList(function(obj) {
//   // res.json(obj)
//   console.log(obj.data.user)
// })

module.exports = router