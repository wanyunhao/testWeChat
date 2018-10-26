//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    length: 11,
    images: ["http://cc.cocimg.com/api/uploads/181015/492454bf9ad697b622345c0873f3b917.jpg", "http://cc.cocimg.com/api/uploads/181011/55670ea1ada8d2cb93c57501e4c81ad1.jpg", "http://cc.cocimg.com/api/uploads/181012/7ea2a0f8357798ce889021740a09388a.png"],
    typeArray: ["短袖", "连衣裙", "牛仔裤", "T恤", "船袜", "小内裤", "皮外套"],
    typeIndex: 0,
    coupons_array: [{
        price: 100,
        isNew: true,
        needMoney: 300,
        day: 15
      },
      {
        price: 200,
        isNew: false,
        needMoney: 400,
        day: 15
      },
      {
        price: 300,
        isNew: true,
        needMoney: 500,
        day: 15
      },
      {
        price: 400,
        isNew: false,
        needMoney: 600,
        day: 15
      },
      {
        price: 500,
        isNew: false,
        needMoney: 700,
        day: 15
      },
      {
        price: 600,
        isNew: true,
        needMoney: 800,
        day: 15
      }
    ],
    goods_list: [
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {

    this.transGoodsInfo('1');

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  changeTypeClick: function(e) {

    this.setData({
      typeIndex: e.currentTarget.dataset.id
    })
    this.transGoodsInfo(e.currentTarget.dataset.id+1);
  },
  item_click: function(e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/shop-detail/shop-detail?title=' + e.currentTarget.dataset.name,
    })
  },

  transGoodsInfo: function (category) {
var that = this;
    wx.request({
      url: app.globalData.baseUrl + '/api/goods/list',
      data: {
        user_id:'000',
        category: category,
        page:'1'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {

        console.log(res);
var goods = res.data.data;
        that.setData({
          
          goods_list:goods,
        })

      },
      fail: function(res) {

      },
    })

  }





})