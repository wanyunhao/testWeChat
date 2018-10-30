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
        value: '',
        'type': 0,
      },
      {
        title: '手机号码',
        linkName: 'phone',
        placeholder: '11位手机号码',
        value: '',

        'type': 0,

      },
      {
        title: '选择地址',
        linkName: '',
        placeholder: '请选择',
        value: '',

        'type': 1,

      },
      {
        title: '详细地址',
        linkName: 'detailAddress',
        placeholder: '街道门牌信息',
        value: '',

        'type': 0,

      },
      {
        title: '邮政编号',
        linkName: 'code',
        value: '',

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
    },
    isEdit: false,
    id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var addressInfo = JSON.parse(options.addressInfo);

    console.log(addressInfo);
    if (addressInfo.id) {

      var initialData = this.data.initialData;
      initialData[0].value = addressInfo.connect_name;
      initialData[1].value = addressInfo.connect_phone;
      initialData[2].value = addressInfo.province + ' ' + addressInfo.city + ' ' + addressInfo.area;
      initialData[3].value = addressInfo.address;
      initialData[4].value = addressInfo.code;
      this.data.id = addressInfo.id;

      this.data.selAddressInfo.selProvince = addressInfo.province;
      this.data.selAddressInfo.selCity = addressInfo.city;
      this.data.selAddressInfo.selDistrict = addressInfo.area;
      this.data.detailAddress = addressInfo.address;

      this.setData({
        isEdit: true,
        initialData: initialData,
      });

      wx.setNavigationBarTitle({
        title: '修改地址',
      })
    }

  },

  // action
  saveAction: function(e) {

    var name = e.detail.value.name;
    var phone = e.detail.value.phone;
    var detailAddress = e.detail.value.detailAddress;
    var code = e.detail.value.code;

    if (this.data.selAddressInfo.selDistrict == '' && this.data.isEdit == false) {
      wx.showToast({
        title: '请选择地址',
      })
      return;
    }

    if (name == '' || phone == '' || detailAddress == '' || code == '') {

      wx.showToast({
        title: '信息不完整',
      })
      return;
    }

    var that = this;

    var routeUrl = '/api/address/create';
    var id = ''
    if (this.data.isEdit == true) {
      routeUrl = '/api/address/update'
      id = this.data.id;

    };

    wx.request({
      url: app.globalData.baseUrl + routeUrl,
      data: {
        'connect_name': name,
        'connect_phone': phone,
        'province': that.data.selAddressInfo.selProvince,
        'city': that.data.selAddressInfo.selCity,
        'area': that.data.selAddressInfo.selDistrict,
        'address': detailAddress,
        'is_default': '0',
        'code': code,
        'user_id': '000',
        'id': id,
      },
      method: 'Get',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {

        console.log(res);
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
          title: '失败' + res,
        })
      },
      complete: function() {

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

    this.setData({
      selAddressInfo
    })

  }


})