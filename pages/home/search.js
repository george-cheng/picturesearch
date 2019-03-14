// pages/home/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    link:[
      "橘猫",
      "中国云猫",
      "爱琴猫",
      "孟买猫",
      "短毛猫",
      "暹罗猫",
      "波斯猫",
      "卷耳猫"
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  query(e){
    let q = e.detail.value.q;
    wx.navigateTo({
      url: '/pages/home/list?q='+q,
    })
  }

})