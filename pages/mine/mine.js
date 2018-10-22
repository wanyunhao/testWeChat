const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance: 0,
    freeze: 100,
    score: 0,
    userInfo:{},
    score_sign_continuous: 0,
    functionDataDic: [
      [{
          'title': '当前积分',
          'type': 0,
          'functionType': 0,
          'btn': true,
          'btnTitle': '每日签到'
        },
        {
          'title': '我的订单',
          'type': 1,
          'functionType': 1,

          'btn': false,
          'btnTitle': ''
        }, {
          'title': '我的收货地址',
          'type': 1,
          'functionType': 2,
          'btn': false,
          'btnTitle': ''
        }, {
          'title': '我的优惠券',
          'type': 1,
          'functionType': 3,
          'btn': false,
          'btnTitle': ''
        }, {
          'title': '',
          'type': 2,
          'functionType': 4,
          'btn': true,
          'btnTitle': '绑定手机号码'
        }
      ],
      [{
        'title': '关于我们',
        'type': 1,
        'functionType': 5,
        'btn': false,
        'btnTitle': ''
      }]
    ]
    
  },

  onShow () {
    let userInfo = wx.getStorageSync('userInfo')
    let that = this;
    if (!userInfo) {
      wx.navigateTo({
        url: "reLogin/reLogin"
      })
    } else {
      that.setData({
        userInfo: userInfo,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /**
   * 充值
   */
  recharge: function() {
    wx.navigateTo({
      url: 'recharge/recharge',
    })
  },
  /**
   * 提现
   */
  withdraw: function() {
    wx.navigateTo({
      url: 'withDraw/withDraw',
    })
  },
  /**
   * 用户点击
   */
  itemClick: function(event) {

    var fType = event.currentTarget.dataset.functiontype;
    console.log(fType);

    var routePath = '';
    switch (fType) {

      case 1: //我的订单
        routePath = 'order/order';
        break;
      case 2: //我的收货地址
        routePath = 'address/address';
        break;
      case 3: //我的优惠券
        routePath = 'coupon/coupon';
        break;
      case 5: //关于我们
      {
          wx.showModal({
            title: '关于我们',
            content: '祝大家使用愉快！',
            showCancel: false
          })
      }
        break;
      default:
        break;

    };
    if (routePath.length > 0) {
      wx.navigateTo({
        url: routePath,
      })
    };

  },
  /**
   * 签到/绑定手机号
   */
  btnClick: function(event) {
    // console.log(event);
    var functiontype = event.currentTarget.dataset.functiontype;
    console.log(functiontype);
    var that = this;

    switch (functiontype) {
      case 0://签到
      {
          that.signAction();
      }
      break;
      case 4://绑定手机号
      {
          that.bingPhone(event);
      }
      break;

      default:break;

    }
    
  },
  /**
   * QD
   */
  signAction : function (){
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/score/sign',
      data: {
        token: wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.getUserAmount();
          that.checkScoreSign();
        } else {
          wx.showModal({
            title: '错误',
            content: res.data.msg,
            showCancel: false
          })
        }
      }
    })
  },
  checkScoreSign: function () {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/score/today-signed',
      data: {
        token: wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            score_sign_continuous: res.data.data.continuous
          });
        }
      }
    })
  },
  getUserAmount: function () {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/user/amount',
      data: {
        token: wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            balance: res.data.data.balance,
            freeze: res.data.data.freeze,
            score: res.data.data.score
          });
        }
      }
    })

  },
  /**
   * BD
   */
  bingPhone : function (e) {
    if (!e.detail.errMsg || e.detail.errMsg != "getPhoneNumber:ok") {
      wx.showModal({
        title: '提示',
        content: '无法获取手机号码',
        showCancel: false
      })
      return;
    }
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/user/wxapp/bindMobile',
      data: {
        token: wx.getStorageSync('token'),
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv
      },
      success: function (res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '绑定成功',
            icon: 'success',
            duration: 2000
          })
          that.getUserApiInfo();
        } else {
          wx.showModal({
            title: '提示',
            content: '绑定失败',
            showCancel: false
          })
        }
      }
    })
  },
  /**
   * 重新授权登录
   */
  reLogin: function() {

    wx.navigateTo({
      url: 'reLogin/reLogin',
    });

  },

})