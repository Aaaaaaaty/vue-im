var User = require('./user.js')

var userHandler = {
  login: function(user, callback) {
    if(!user.username || !user.password) {
      return callback({
        status: 'ERROR',
        data: { user: null },
        msg: '请输入用户名密码'
      })
    } else {
      User.get(user.username, function(err, u) {
        if(err) {
          return callback({status: 'ERROR',meta: 'user',data: {user: null},msg: '服务器出错'})
        } else if (!u) {
          return callback({status: 'ERROR',meta: 'user',data: {user: null},msg: '没有该用户'})
        } else if (u.password !== user.password) {
          return callback({status: 'ERROR',meta: 'user',data: {user: null},msg: '请输入正确密码'})
        } else {
          return callback({status: 'OK',meta: 'user',data: {user: u},msg: '登陆验证成功'})
        }
      })
    }
  },
  addUser: function(user, callback) {
    User.get(user.username, function(err, u) {
      if(err) {
        return callback({
          status: 'ERROR',
          meta: 'user',
          data: {
            user: null
          },
          msg: '服务器出错'
        }) 
      } else if(u) {
        return callback({
          status: 'ERROR',
          meta: 'user',
          data: {
            user: null
          },
          msg: '该用户名已存在'
        }) 
      } else {
        var userModel = new User(user)
        userModel.save(function(err, u) {
          if(err) {
            return callback({
              status: 'ERROR',
              meta: 'user',
              data: {
                user: null
              },
              msg: '服务器出错'
            }) 
          } else {
            return callback({
              status: 'OK',
              meta: 'user',
              data: {
                user: u
              },
              msg: '新建用户成功'
            }) 
          }
        })
      }

      

    })
  },
  updateUser: function(user, callback) {
    User.update(user, function(err, u) {
      if(err) {
        return callback({
          status: 'ERROR',
          meta: 'user',
          data: {
              user: null
          },
          message: '服务器出错'
        })
      }
      return callback({
        status: 'OK',
        meta: 'user',
        data: {
            user: u
        },
        message: '更新用户成功'
      })
    })
  },
  deleteUser: function(user, callback) {
    User.delete(user, function(err, u) {
      if(err) {
        return callback({
          status: 'ERROR',
            meta: 'user',
            data: {
              user: u
            },
            msg: '服务器出错'
        })
      } else {
        return callback({
          status: 'OK',
            meta: 'user',
            data: {
              user_id: u
            },
            msg: '删除成功'
        })
      }
    }) 
  },
  getUser: function(username, callback) {
    User.getUserList(username, function(err, u) {
      if(err) {
        return callback({
          status: 'ERROR',
            meta: 'user',
            data: {
              user: u
            },
            msg: '服务器出错'
        })
      } else {
        return callback({
          status: 'OK',
            meta: 'user',
            data: {
              user: u
            },
            msg: '获得用户信息'
        })
      }
    })
  },
  getUserList: function(username, callback) {
    User.getUserList(username, function(err, u) {
      if(err) {
        return callback({
          status: 'ERROR',
            meta: 'user',
            data: {
              user: null
            },
            msg: '服务器出错'
        })
      } else {
        return callback({
          status: 'OK',
          meta: 'user',
          data: {
            user: u
          },
          msg: '得到用户列表'
        })
      }
    })
  },
  getUserInfo: function(username, callback) {
    User.get(username, function(err, u) {
      if(err) {
        return callback({
          status: 'ERROR',
            meta: 'user',
            data: {
              user: null
            },
            msg: '服务器出错'
        })
      } else {
        return callback({
          status: 'OK',
          meta: 'user',
          data: {
            user: u
          },
          msg: '得到用户信息'
        })
      }
    })
  }
}

module.exports = userHandler