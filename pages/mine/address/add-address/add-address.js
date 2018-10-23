// pages/mine/address/add-address/add-address.js

var addressData = require('../addressData/addressData.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    initialData: [
      {
        title: '联系人',
        placeholder: '姓名',
        'type':0,
      }, 
      {
        title: '手机号码',
        placeholder: '11位手机号码',
        'type': 0,

      }, 
      {
        title: '选择地址',
        placeholder: '请选择',
        'type': 1,

      }, 
      {
        title: '详细地址',
        placeholder: '街道门牌信息',
        'type': 0,

      }, 
      {
        title: '邮政编号',
        placeholder: '',
        'type': 0,

      }, 
    ],
   addressInfo:{
     provinces: ['1','2','3'],
     citys: ['4', '5', '6'],
     districts: ['7', '8', '9'],
   },
    selAddressInfo:{
      selProvince: '',
      selCity: '',
      selDistrict: '',
      selProvinceIndex: 0,
      selCityIndex: 0,
      selDistrictIndex: 0,
    },
    selType: 0,
    mode:'selector',

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
  bindPickerAddressChange :function (e) {

    this.setData ({
      selType:1,
      mode:'selector',
    })
    
  }

 
})