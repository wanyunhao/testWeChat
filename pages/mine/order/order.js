Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusType: ["待付款", "待发货", "待收货", "待评价", "已完成"],
    currentType: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  quickGuideAction: function(e) {

    var index = e.currentTarget.dataset.index;
    this.setData({
      currentType: index,
    });

    if (index == 4) {
      this.setData({
        orderList: ['数据1', '数据2'],
      })
    } else {
      this.setData({
        orderList: null,
      })
    }

  },
  bindchange: function(e) {

    var index = e.detail.current;

    this.setData({
      currentType: index,
    });

    if (index == 4) {
      this.setData({
        orderList: ['数据1', '数据2'],
      })
    } else {
      this.setData({
        orderList: null,
      })
    }

  },

  

})