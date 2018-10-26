// pages/mine/address/add-address/add-address.js

var addressData = require('../addressData/addressData.js');
var app = getApp();

// /api/address / create
Page({

  /**
   * 页面的初始数据
   */
  data: {
    initialData: [{
        title: '联系人',
        linkName: 'name',
        placeholder: '姓名',
        'type': 0,
      },
      {
        title: '手机号码',
        linkName: 'phone',
        placeholder: '11位手机号码',
        'type': 0,

      },
      {
        title: '选择地址',
        linkName: '',
        placeholder: '请选择',
        'type': 1,

      },
      {
        title: '详细地址',
        linkName: 'detailAddress',
        placeholder: '街道门牌信息',
        'type': 0,

      },
      {
        title: '邮政编号',
        linkName: 'code',
        placeholder: '',
        'type': 0,

      },
    ],
    selAddressInfo: {
      selProvince: '',
      selCity: '',
      selDistrict: '',
      selProvinceIndex: 0,
      selCityIndex: 0,
      selDistrictIndex: 0,
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  // action
  saveAction: function(e) {
  
    var name = e.detail.value.name;
    var phone = e.detail.value.phone;
    var detailAddress = e.detail.detailAddress;
    var code = e.detail.code;

    if (this.data.selAddressInfo.selDistrict == ''){
      wx.showToast({
        title: '请选择地址',
      })
      return;
    }

    if(name == '' || phone == '' || detailAddress == '' || code == ''){

      wx.showToast({
        title: '信息不完整',
      })
      return;
    }

  wx.request({
    url: app.globalData.baseUrl + '/api/address/create',
    data: {
      'connect_name':name,
      'connect_phone': phone,
      'province': this.data.selAddressInfo.selProvince,
      'city': this.data.selAddressInfo.selCity,
      'area': this.data.selAddressInfo.selDistrict,
      'address': detailAddress,
      'is_default': '0',
      'code': code,
      'user_id': '000',
    },
    method: 'Post',
    dataType: 'json',
    responseType: 'text',
    success: function(res) {
    
      wx.showToast({
        title: '成功',
        duration: 0,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {

          wx.navigateBack();
        },
      })
    },
    fail: function(res) {
      wx.showToast({
        title: '失败'+res,
      })
    },
    complete:function (){

    }
  
  })






  },
  fromWeChatAction: function(e) {
    wx.showToast({
      title: '从微信读取',
    })
  },
  cancleAction: function(e) {
    wx.navigateBack({})
  },
  bindPickerAddressChange: function(e) {

    var selAddressInfo = this.data.selAddressInfo;
    selAddressInfo.selProvince = e.detail.value[0];
    selAddressInfo.selCity = e.detail.value[1];
    selAddressInfo.selDistrict = e.detail.value[2];
    console.log(selAddressInfo);

    this.setData({selAddressInfo})
  
  }


})