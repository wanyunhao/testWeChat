Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance: 0,
    freeze: 100,
    'userInfo': {
      'nickName': '二哈',
      'avatarUrl': '/images/order-details/icon-ddfh.png',
    },
    functionDataDic: [
      [{
          'title': '当前积分',
          'type': 0,
          'btn': true,
          'btnTitle': '每日签到'
        },
        {
          'title': '我的订单',
          'type': 1,
          'btn': false,
          'btnTitle': ''
        }, {
          'title': '我的收货地址',
          'type': 1,
          'btn': false,
          'btnTitle': ''
        }, {
          'title': '我的优惠券',
          'type': 1,
          'btn': false,
          'btnTitle': ''
        }, {
          'title': '',
          'type': 2,
          'btn': true,
          'btnTitle': '绑定手机号码'
        }
      ],
      [{
        'title': '关于我们',
        'type': 1,
        'btn': false,
        'btnTitle': ''
      }]
    ]


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

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

    var clickIndex = event.currentTarget.dataset.index;
    console.log(clickIndex);

  },
  /**
   * 签到/绑定手机号
   */
  btnClick: function (event) {

    var clickIndex = event.currentTarget.dataset.index;
    console.log(clickIndex);
// 
  },
  /**
   * 重新授权登录
   */
  reLogin: function () {

    wx.showToast({
      title: '重新授权登录',
    })
  },



})