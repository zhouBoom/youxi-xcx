Page({
  data:{
    text:"如何讲好一本书?",
    title:"",
    showView: true
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    // wx.showToast({
    //   title: options.title,
    //   icon: 'success',
    //   duration: 1200
    // })
    wx.setNavigationBarTitle({
      title:options.title
    })
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
  eye_lz:function(){
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  next_tap:function(){
      wx.navigateTo({
        url: '../dry_good/dry_good'
      })
  },
  listenerButtonPlay:function(e){
    console.log(e.currentTarget.id);
    var that = this;  
    that.audioCtx = wx.createAudioContext(e.currentTarget.id);
    that.audioCtx.play()
  }
})