// pages/mine/address/add-address/add-address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    initialData: [
      {
        title: '联系人',
        placeholder: '姓名'
      }, 
      {
        title: '手机号码',
        placeholder: '11位手机号码'
      }, 
      {
        title: '选择地址',
        placeholder: '请选择'
      }, 
      {
        title: '详细地址',
        placeholder: '街道门牌信息'
      }, 
      {
        title: '邮政编号',
        placeholder: ''
      }, 
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  // action
  saveAction:function (e) {
    wx.showToast({
      title: '保存',
    })
  },
  fromWeChatAction: function (e) {
    wx.showToast({
      title: '从微信读取',
    })
  },
  cancleAction: function (e) {
    wx.navigateBack({})
  },

 
})