//index.js
//获取应用实例
var app = getApp()

var index = require('../../vendor/index');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    title:''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  begin_lz:function(){
    wx.navigateTo({
      url: '../target/target?title=你的听众和目标'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    }),
    index.login({
       success(result) {
        console.log('登录成功:', result);
      },
      fail(error) {
        console.log('登录失败:', error);
      }
    });
  }
})
