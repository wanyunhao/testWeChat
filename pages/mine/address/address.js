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
        console.log(res)
        

      },
      fail: function(res) {


      },
    })

  },

  defaultAddressAction:function(e) {
    var index = e.currentTarget.dataset.obj;
    var that = this;
    var addressList = that.data.addressList;

  },
  editAction: function (e) {
    var index = e.currentTarget.dataset.obj;
    var that = this;
    var addressList = that.data.addressList;
    var item = addressList[index];
    wx.navigateTo({

      url: 'add-address/add-address?addressInfo='+item,
      
    })


  },
  deleteAction: function (e) {

    var obj = e.currentTarget.dataset.obj;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否删除当前地址',
      success: function(res) {
        if (res.confirm){
          that.transDeleteData(obj);
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  transDeleteData:function(index) {

    var that = this;
    var addressList = that.data.addressList;
    var item = addressList[index];
    wx.request({
      url: app.globalData.baseUrl + '/api/address/delete',
      data: {
        id: item.id,
        user_id : '000'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {

        wx.showToast({
          title: '删除成功',
        })

        addressList.splice(index, 1)
        that.setData({ addressList })
      },
      fail: function(res) {

        wx.showToast({
          title: '删除失败',
        })
        

      },
      complete: function(res) {},
    })

  }

})