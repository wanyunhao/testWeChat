// pages/shopping-cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [{
        left: '',
        price: 0,
        isSelected: false,
        goods_image: '/upload/18/10/24/17/cf544649ec6be194b456c4c902b7c485.jpg',
      },
      {

      },
      {

      },

    ],
    totalPrice: 0,
    totalScore: 0,
    isEditting: false,
    haveSelected: false,
    allSelected: false,
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

    var list = this.data.goodsList;
    for (var i = 0; i < list.length; i++) {
      var obj = list[i];
      obj.isSelected = !editting;
    }

    this.setData({
      isEditting: editting,
      goodsList: this.data.goodsList,
      allSelected: !editting,
      haveSelected: !editting,
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
    if (index !== "" && index != null) {
      obj.left = left;
      this.setData({
        goodsList: this.data.goodsList,
      })

    }


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
        obj.left = left;

        this.setData({
          goodsList: this.data.goodsList,
        })

      }
    }

  },

  selAction: function(e) {

    var index = e.currentTarget.dataset.index;

    var list = this.data.goodsList;
    var obj = list[parseInt(index)];

    var isSel = obj.isSelected;
    obj.isSelected = !isSel;

    var haveSel = false;
    var allSel = false;

    var selCount = 0;

    for (var i = 0; i < list.length; i++) {
      var obj2 = list[i];
      if (obj2.isSelected == true) {
        haveSel = true;
        selCount++;
      }
    }

    if (selCount == list.length) {
      allSel = true;
    }


    if (index !== "" && index != null) {
      this.setData({
        goodsList: this.data.goodsList,
        haveSelected: haveSel,
        allSelected: allSel,
      })
    }

  },

  allSelAction: function(e) {

    var allSel = this.data.allSelected;
    var list = this.data.goodsList;



    for (var i = 0; i < list.length; i++) {
      var obj = list[i];
      obj.isSelected = !allSel;
    }

    this.setData({

      goodsList: this.data.goodsList,
      haveSelected: !allSel,
      allSelected: !allSel,

    })



  }












})