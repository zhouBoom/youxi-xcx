var app = getApp()

var index = require('../../../vendor/index');
var config = require('../../../config');

var src = require('../../../src')
Page( {  
  data: {  
    winWidth: 0,  
    winHeight: 0,  
    // tab切换  
    currentTab: 0, 
    scrollTop:0,
    showView:false,
    display:'',
    showView:true,
    state:true,
    duration: 0,
    maxDuration: 60,
     recordsNum: 0,
    records: [],
    isPlaying: false,
    playingSrc: null, //调用play接口 compelete设置
    playUi: {
      play: src.image.play,
      playing: src.image.playing
    },
    hidden:true
  },  
  onLoad: function() {
    wx.setNavigationBarTitle({
      title:'开头'
    })  
    var that = this;
    /** 
     * 获取系统信息 
     */  
    wx.getSystemInfo( {  
  
      success: function( res ) {  
        that.setData( {  
          winWidth: res.windowWidth,  
          winHeight: res.windowHeight,
          display:'block'
        });  
      }  
    });  
     wx.getSavedFileList({
          success: function (res) {
            var voices = [];
            for (var i = 0; i < res.fileList.length; i++) {
              //格式化时间  
              var createTime = res.fileList[i].createTime
              //将音频大小B转为KB  
              var size = (res.fileList[i].size / 1024).toFixed(2);
              var voice = {filePath: res.fileList[i].filePath, createTime: createTime, size: size };
              voices = voices.concat(voice);
            }
            that.setData({
              voices: voices
            })
          }
        })
  },  
  /** 
     * 滑动切换tab 
     */  
  bindChange: function( e ) {  
  
    var that = this;  
    that.setData( { currentTab: e.detail.current });  
  
  },  
  /** 
   * 点击tab切换 
   */  
  swichNav: function( e ) {  
  
    var that = this;  
  
    if( this.data.currentTab === e.target.dataset.current ) {  
      return false;  
    } else {  
      that.setData( {  
        currentTab: e.target.dataset.current  
      })  
    }  
  },
  next_page:function(){
      wx.navigateTo({
        url: '../bookCore/bookCore'
      })
  },
  returnPage:function(){
    var that = this;
    that.setData({
      hidden:false
    })
    //  wx.navigateBack({
    //       delta: 1
    // })
  },
  listen:function(){
    var that = this;
    if(!that.data.showView){
      var title = '开头'
      var dis = 'block'
    }else{
      var title = '看例子'
      var dis = 'none'
    }
    wx.setNavigationBarTitle({
      title:title
    })
    that.setData({
      showView: (!that.data.showView),
      display:dis
    })
    console.log(!that.data.showView)
  },
  startRecord:function(e){
    var that = this;
    that.setData({
      state:false
    })
    var location = e.currentTarget.dataset.location;
    var next_location = e.currentTarget.dataset.next_location;
    index.startRecord({
      success(result){
        console.log('录音成功:', result);
        console.log(result.tempFilePath);
        console.log(index.getRecordDuration()+'-======');
        // 文件上传
             index.uploadFile({
              url: config.service.uploadUrl+'/location=' + location + '&next_location=' + next_location +'&session='+index.getSession().session+'&dur='+index.getRecordDuration(),
              filePath: result.tempFilePath,
              name: 'index',
              success: function(res){
                  wx.hideToast();
                  setTimeout(function(){
                    wx.showToast({
                      title: '听见你的声音',
                      icon: 'success',
                      duration: 1000
                    });
                  }, 2000);
                  
                  that.getRecords(that,1,1,0,5);
                }
              });
      },
      fail(error) {
        console.log('录音失败:', error);
      },
      process(){
        that.setData({
          duration: index.getRecordDuration(),
        });
      },
      compelete(){
        console.log('文件上传')
             that.setData({
                state:true
              });
           },
    });
    
  },
  stopRecord:function(){
    var $this = this;
    index.stopRecord({
      success(result) {
        $this.setData({
          isRecording: false,
          state:true
        });
        console.log('停止录音:', result);
      },
      fail(error) {
        console.log('停止录音失败:', error);
      }
    });
  },
  //请求页面数据
  getRecords: function (that,location,location_next,indexs,number) {
    // var $this = this;
    var url = config.service.dowloadUrl;
    index.request({
      url: url,
      method: 'POST',
      data: {
        location: location,
        next_location: location_next,
        index: indexs,
        number: number,
      },
      success(result) {
        var nums = result.data.number;
        var records = result.data.data;
        that.setData({
          recordsNum: nums,
          records: records,
        });
        console.log('载入成功:', result);
        },
        fail(error) {
          console.log('载入失败:', error);
        }
    });
                  // 文件上传成功后刷新前台
                  //  var voices = [];
                  //   for (var i = 0; i < res.fileList.length; i++) {
                  //     //格式化时间  
                  //     var createTime = res.fileList[i].createTime
                  //     //将音频大小B转为KB  
                  //     var size = (res.fileList[i].size / 1024).toFixed(2);
                  //     var voice = {filePath: res.fileList[i].filePath, createTime: createTime, size: size };
                  //     voices = voices.concat(voice);
                  //   }
                  //   that.setData({
                  //     voices: voices
                  //   })
    },
    fail: function(res){
      wx.hideToast();
      setTimeout(function(){
        wx.showToast({
          title: '传声失败，请重试',
          icon: 'loading',
          duration: 1000
        });
      }, 2000);
  },
  gotoPlay: function (e) {
    var $this = this;
    var path = e.currentTarget.dataset.key;
    console.log(path);
    $this.setData({
      isPlaying: true,
      playingSrc: path
    });
    var url = 'http://' + config.service.host + e.currentTarget.dataset.key;
    console.log('播放文件源' + url);
    //点击开始播放  
    wx.showToast({
      title: '开始播放',
      icon: 'success',
      duration: 1000
    })
    index.playRecord({
      src: index.getRecordSrc(),
      success() {
         $this.setData({
          isPlaying: false,
          playingSrc: null
        });
        console.log('播放/暂停成功:', result);
      },
      fail(error) {
         $this.setData({
          isPlaying: false,
          playingSrc: null
        });
        console.log('播放/暂停失败:', error);
      }
    });
  },
  del:function(e){
    console.log(e.currentTarget.dataset.id);
  },
  cancel: function(){
       this.setData({
             hidden:true
        }); 
    },
    confirm: function(){
       this.setData({
             hidden: true
        });
         wx.navigateBack({
                delta: 1
          })
    }
})