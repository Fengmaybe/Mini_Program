// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  userName:'lyuya',
  userInfo:{},
  isShow:false, //是否显示button组件
  },
  //对象的简写
  goStart () {
    console.log('我点击了开启小程序之旅');
    // 点击跳转到list页面 保留当前页面，跳转到应用内的某个页面
    wx.navigateTo({
      //注意从根目录下查找
      url: '/pages/list/list'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { //初始化发送请求以及开启定时器
    this.getUserInfo();
  },
  getUserInfo () {
     //第一次授权
    wx.getSetting({
      success: (data) => {
        console.log(data);
        if (data.authSetting["scope.userInfo"]){
          //授权成功
          this.setData({
            isShow:false
          });
        }else {
          //授权失败
          this.setData({
            isShow: true
          });
        }
      }
    }),
      //获取用户信息
      wx.getUserInfo({
        success: (data) => {
          this.setData({
            userInfo: data.userInfo,
          });
        },
        fail: () => {
          console.log("获取用户信息失败");
        }
      });
  },

  //wxml中button的自定义回调监听函数
  handleGetUserInfo(data){
      if (data.detail.rawData){
        //用户点击了允许
        this.getUserInfo();
      }else{
        console.log('failllll');
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