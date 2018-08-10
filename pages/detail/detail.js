// pages/detail/detail.js
const datas = require('../../datas/list-data.js');
//读取全局的变量
let {isPlay,pageIndex} = getApp().data;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailDataObj: {},
    index: null,
    isCollected: false,
    isMusicPlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //拿到索引值
    let index = options.index;
    //获取到用户点击的那个数据对象
    let objData = datas.list_data[index];
    //更新数据
    this.setData({
      detailDataObj: objData,
      index
    })

    // 读取本地缓存的数据判断用户是否收藏当前的文章
    let detailStorage = wx.getStorageSync('isCollected');

    if (!detailStorage) {
      // 在缓存中初始化空对象
      wx.setStorageSync('isCollected', {});
    }

    //若收藏了，则更新状态
    if (detailStorage[index]) {
      this.setData({
        isCollected: true,
      });
    }

    //解决点击音乐播放器的暂停和播放实时更新到isMusicPlay
    //绑定监听音乐是否播放
    wx.onBackgroundAudioPlay(()=>{
      //修改状态
       this.setData({
         isMusicPlay: true,
      });
      //修改全局的状态
      isPlay=true;
      pageIndex=index;
    });
    //绑定监听音乐是否关闭暂停
    wx.onBackgroundAudioPause(()=>{
      this.setData({
        isMusicPlay: false,
      });
      //修改全局的状态
      isPlay = false;
      pageIndex = index; //可省略
    });

    //还有一个场景问题：当一个音乐播放时，打开另外一个音乐时显示的是暂停的图标，故要根据不同的图标和索引值去判断是否图标是暂停还是播放。全局
    //判断音乐是否播放
    if(isPlay && pageIndex===index){
      this.setData({
        isMusicPlay:true,
      })
    }
    
  },
  handleCollected() {
    //点击收藏更新状态
    let tmp = !this.data.isCollected;
    this.setData({
      isCollected: tmp,
    });
    //显示收藏成功、取消收藏的界面效果
    let showText = tmp ? '收藏成功' : '取消收藏';
    wx.showToast({
      title: showText,
      icon: 'success'
    });

    //读缓存
    let { index } = this.data;
    wx.getStorage({
      key: 'isCollected',
      success: (result) => {
        console.log(result, '读取缓存的结果');
        let obj = result.data;  // {0: true, 1: true}s
        obj[index] = tmp;
        //保存缓存
        wx.setStorage({
          key: 'isCollected',
          data: obj,
          success: () => {
            console.log('缓存成功');
          }
        });
      }
    });

  },

  //图标分享按钮
  handleShare() {
    wx.showActionSheet({
      itemList: ['分享朋友圈', '分享微信好友', '分享QQ空间']
    });
  },

  //音乐播放
  handleMusicPlay() {
    let isMusicPlay = !this.data.isMusicPlay;
    this.setData({
      isMusicPlay
    });
    if (isMusicPlay){
      //播放
      let { dataUrl, title, coverImgUrl} = this.data.detailDataObj.music
      wx.playBackgroundAudio({
        dataUrl,
        title,
        coverImgUrl
      });
    }else{
      // 暂停音乐
      wx.pauseBackgroundAudio()

    }
   
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})