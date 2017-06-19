Page({
  data:{
    text:"Page dry_good",
    num:'',
    showView:true
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
     wx.setNavigationBarTitle({
      title:'你想讲的干货'
    })
  },
  onReady:function(){
    // 页面渲染完成
    this.setData({
      num:3
    });
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
  returnPage:function(){
     wx.navigateBack({
          delta: 1
    })
  },
  addinput:function(e){
    if(e.target.dataset.tt>6){
      wx.showToast({
        title:'最多增加6条',
        icon: 'fail',
        duration: 1000
      })
    }else{
    var that = this;
    that.setData({
      num:e.target.dataset.tt+1
    })
    }    
  },
  next_page:function(e){
    var that = this;
    if(!that.data.showView){
      var title = '你想讲的干货'
    }else{
      var title = '心态、语气、用词'
    }
    wx.setNavigationBarTitle({
      title:title
    })
    
    that.setData({
      showView: (!that.data.showView)
    })
    console.log(!that.data.showView)
  },
  startBook:function(){
    wx.redirectTo({
        url: '../index/bookStart/bookStart'
      })
  }
})