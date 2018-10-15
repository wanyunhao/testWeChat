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
    functionDataDic: [{
        'title': '当前积分',
        'type': 0,
        'btn': true,
        'btnTitle': '每日签到'
      },
      {
        'title': '我的订单',
        'type': 1,
        'btn': false,
        'btnTitle':''
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
    ]


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})