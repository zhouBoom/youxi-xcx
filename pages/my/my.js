var app = getApp();
var register = require('../../utils/refreshLoadRegister.js');
Page({
  data:{
    currentSize:0,
    words: []
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var _this = this;
    register.register(this);   
    //获取words  
    this.doLoadData(0,15);
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
//   onPullDownRefresh: function() {
//     // Do something when pull down.
//      console.log('刷新');
//  },

//  onReachBottom: function() {
//     // Do something when page reach bottom.
//      console.log('circle 下一页');
//  },
 doLoadData(currendSize,PAGE_SIZE){
      wx.showLoading({
        title: 'loading...',
      });
      var that = this;
      setTimeout(function(){
        var length = currendSize+PAGE_SIZE;
       // console.log('currendSize:', currendSize);
        for(var i= currendSize;i < length;i++){
           that.data.words.push('内容'+i);
        }
        var words = that.data.words;
        that.data.currentSize += PAGE_SIZE;
        that.setData({
          words:words
        });
        wx.hideLoading();
        register.loadFinish(that,true);
      },2000);
  },
  //模拟刷新数据
  refresh:function(){
    
    this.setData({
      words:[],
      currentSize:0
    });
    this.doLoadData(0, 20);
  },
  //模拟加载更多数据
  loadMore: function () {
    this.doLoadData(this.data.currentSize, 20);
  }
})