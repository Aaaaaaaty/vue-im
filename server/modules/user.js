var mongoose = require('./db.js')
var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    friendslist: Array,
    url: String
})

var UserModule = mongoose.model('User', UserSchema)

function User(user) {
    this.username = user.username
    this.password = user.password
    this.friendslist = user.friendslist
    this.url = user.url
}

User.prototype.save = function(callback) {
  var user = {
    username: this.username,
    password: this.password,
    friendslist: this.friendslist,
    url: this.url
  }
  var newUser = new UserModule(user)
  newUser.save(function (err, user) {
    if (err) {
      return callback(err)
    }
    return callback(null, user)
  })
}

User.get = function(username, callback) {
  UserModule.findOne({username: username}, function(err, user) {
    if(err) {
      return callback(err)
    } else {
      return callback(null, user)
    }
  })
}
User.getUserList = function(username, callback) {
  UserModule.findOne({username: username}, function(err, user) {
    if(err) {
      return callback(err)
    } else {
      var userList = []
      user.friendslist.map((item, index) => {
        var userdata = {
          username: item.username,
          type: 'person',
          url: item.url
        }
        userList.push(userdata)
      })
      return callback(null, userList)
    }
  })
}
User.getUser = function(id, callback) {
  UserModule.findOne({_id: id}, function(err, user) {
    if(err) {
      return callback(err)
    } else {
      return callback(null, user)
    }
  })
}

User.delete = function(user, callback) {
  var id = user._id
  UserModule.findByIdAndRemove(id, function(err) {
    if(err) {
      return callback(err)
    } else {
      return callback(null, id)
    }
  })
}

User.update = function(user, callback) {
  var id = user._id
  var obj = {}
  for(var prop in user) {
    if(prop !== '_id') {
      obj[prop] = user[prop]
    }
  }
  UserModule.findByIdAndUpdate(id, { $set: obj}, function (err, u) {
    if (err) {
      return callback(err)
    }

    return callback(null, u)
  })
}

// User.getUserList = function(callback) {
//   UserModule.find({}, function(err, users) {
//     if(err) {
//       return callback(err)
//     }
//     callback(null, users)
//   })
// }

module.exports = User
