import io from 'socket.io-client'
import settings from './settings.js'
const CHAT={
  msgObj:document.getElementsByClassName("body-wrapper")[0],
  username:null,
  socket:null,
  msgArr:[],
  //让浏览器滚动条保持在最低部
  scrollToBottom:function(){
    window.scrollTo(0, 900000);
  },
  //退出，本例只是一个简单的刷新
  logout:function(){
    this.socket.disconnect();
    // location.reload();
  },
  //提交聊天消息内容
  submit:function(obj){
    this.socket.emit('sendMsg', obj);
  },
  message: function(username) {
    console.log('message')
      this.socket.on('to' + username, function(obj) {
        CHAT.msgArr.push(obj)
        console.log('CHAT.msgArr', obj)
      })
  },
  init:function(username){
    //连接websocket后端服务器
    this.socket = io.connect(settings.socket,{'force new connection': true})
    this.socket.on('open', function() {
      console.log('已连接')
    })
    this.socket.emit('addUser', username)

  }
}
export default CHAT
