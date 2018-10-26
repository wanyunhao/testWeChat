// pages/mine/address/address.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [],
  },
  //
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  addNewAddress: function(e) {

    wx.navigateTo({
      url: 'add-address/add-address',
    })
  },

  onShow: function() {
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + '/api/address/list',
      data: {
        user_id: '000',
        page: '1',
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {

        var address = res.data.data;
        that.setData({ addressList: address })
        
        

      },
      fail: function(res) {


      },
    })

  },


})