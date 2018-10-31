// pages/shopping-cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [{
        left: '',
        price: 0,
      }

    ],
    isEditting: false,
    delBtnWidth: 120,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  toShoppingAction: function(e) {

    wx.switchTab({
      url: "/pages/index/index"
    });
  },
  editAction: function(e) {

    var editting = this.data.isEditting;
    editting = !editting;
    this.setData({
      isEditting: editting,
    })

  },
  touchS: function(e) {
    if (e.touches.length == 1) {

      this.setData({
        startX: e.touches[0].clientX
      })
    }
  },
  //获取元素自适应后的实际宽度
  getEleWidth: function(w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2); //以宽度750px设计稿做宽度的自适应
      // console.log(scale);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },
  touchM: function(e) {

    var index = e.currentTarget.dataset.index;
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);

    if (e.touches.length == 1) {
      var moveX = e.touches[0].clientX;
      var disX = this.data.startX - moveX;

      var left = '';

      if (disX == 0 || disX < 0) {
        left = 'margin-left:0rpx';
      } else if (disX > 0) {
        left = 'margin-left:-' + disX + 'px';
        if (disX >= delBtnWidth) {
          left = 'left:-' + delBtnWidth + 'px';
        }
      }
    }

    var obj = this.data.goodsList[parseInt(index)];

    console.log(obj);

    obj.left = left;
    this.setData({
      goodsList: this.data.goodsList,
    })



  },

  touchE: function(e) {

    var index = e.currentTarget.dataset.index;
    if (e.changedTouches.length == 1) {
      var endX = e.changedTouches[0].clientX;
      var disX = this.data.startX - endX;
      var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var left = disX > delBtnWidth / 2 ? "margin-left:-" + delBtnWidth + "px" : "margin-left:0px";
     
      var obj = this.data.goodsList[parseInt(index)];

      if (index !== "" && index != null) {

        console.log(obj);

        obj.left = left;
        this.setData({
          goodsList: this.data.goodsList,
        })

      }
    }

  },












})