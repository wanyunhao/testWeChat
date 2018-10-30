// pages/shopping-cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[''],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  toShoppingAction:function(e) {

    wx.switchTab({
      url: "/pages/index/index"
    });
  },

})