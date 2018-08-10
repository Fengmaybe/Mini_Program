// pages/movies/movies.js
//let movieArrInApp = getApp().data.movieArr;
let movieApp = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieArr: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    const MOVIE_URL = 'http://t.yushu.im/v2/movie/top250';
    //发送网络请求
    wx.request({
      url: MOVIE_URL,
      success: (data) => {
        const result = data.data.subjects;
        this.setData({
          movieArr: result
        })
        //更新app中的状态
        movieApp.data.movieArr = data.data.subjects;
      }
    })
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