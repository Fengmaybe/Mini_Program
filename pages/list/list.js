// pages/list/list.js
//用相对路径
let Datas = require('../../datas/list-data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  listDatas:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.setData({
    listDatas: Datas.list_data,
  })
  },
  //点击每个item的事件
  goDetail (event) {

  let index = event.currentTarget.dataset.index;
  wx.navigateTo({
    url: '/pages/detail/detail?index='+ index,
    success: () => {

    }
  })
  },

  //轮播图点击-事件委托
  swiperGoDetail (event){
    let index = event.target.dataset.index;
    wx.navigateTo({
      url: '/pages/detail/detail?index=' + index,
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