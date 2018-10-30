// pages/mine/reLogin/reLogin.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 授权登录
   */
  bindGetUserInfo: function(e) {

    if (!e.detail.userInfo) {
      // wx.showModal({
      //   title: '提示',
      //   content: '无法登录，请重试',
      //   showCancel: false
      // })
      return;
    }
    wx.setStorageSync('userInfo', e.detail.userInfo)
    this.login();

  },
  login: function() {

    let that = this;
    let token = wx.getStorageSync('token');
    if (token) {

      wx.request({
        url: app.globalData.baseUrl + '/api/user/login',
        data: {
          token: token
        },
        success: function(res) {
          if (res.data.code != 0) {
            wx.removeStorageSync('token');
            that.login();
          } else {
            wx.navigateBack();
          }
        }
      })
      return;
    }


    wx.login({
      success: function(res) {
        wx.request({
          url: app.globalData.baseUrl +'/api/user/login',
          data: {
            code: res.code
          },
          success: function(res) {
            if (res.data.code == 10000) {
              // 去注册
              that.registerUser();
              return;
            }
            if (res.data.code != 0) {
              // 登录错误
              wx.hideLoading();
              wx.showModal({
                title: '提示',
                content: '无法登录，请重试',
                showCancel: false
              })
              return;
            }
            wx.setStorageSync('token', res.data.data.token)
            wx.setStorageSync('uid', res.data.data.uid)
            // 回到原来的地方放
            wx.navigateBack();
          },
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })

  },

  registerUser: function() {

    var that = this;
    wx.login({
      success: function(res) {

        var code = res.code;
        wx.getUserInfo({
          success: function(res) {
            var iv = res.iv;
            var encryptedData = res.encryptedData;
            // 下面开始调用注册接口
            wx.request({
              url: app.globalData.baseUrl + '/api/user/register',
              data: {
                code: code,
                encryptedData: encryptedData,
                iv: iv
              }, // 设置请求的 参数
              success: (res) => {
                wx.hideLoading();
                that.login();
              }
            })
          }
        })

      }
    })


  },



})