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
      default:
        break;

    };
    if (routePath.length > 0) {
      wx.navigateTo({
        url: routePath,
      })
    }


  },
  /**
   * 签到/绑定手机号
   */
  btnClick: function(event) {
    // console.log(event);
    var clickIndex = event.currentTarget.dataset.functiontype;
    console.log(clickIndex);
    
  },
  /**
   * 重新授权登录
   */
  reLogin: function() {

    wx.showToast({
      title: '重新授权登录',
    })
  },



})