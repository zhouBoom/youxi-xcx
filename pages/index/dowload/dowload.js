Page({
  data:{
    text:"Page dowload",
    tip:'',
    buttonDisabled:false,
    modalHidden:true,
    show:false,
    second: 0
  },
  showModal:function(){
    this.setData({
      modalHidden:!this.data.modalHidden
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    wx.setNavigationBarTitle({
      title:'试听和下载'
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
  cancel: function(){
       this.setData({
             modalHidden:true
        }); 
    },
  confirm: function(){
    /**
     * 开始下载，进度条开始行进
     */
    this.setData({
             modalHidden:true
        }); 
      wx.showToast({
        title:'开始下载',
        icon:'success',
        duration:1000
      })
    countdown(this);
    },
})

function countdown(that) {
 var second = that.data.second
 console.log(second);
 if (second == 100) {
  that.setData({
   second: '下载完成'
  });
  wx.showToast({
        title:'下载完成',
        icon:'success',
        duration:1000
      })
  return ;
 }
 var time = setTimeout(function(){
  that.setData({
   second: second + 1
  });
  countdown(that);
 }
 ,1000)
}