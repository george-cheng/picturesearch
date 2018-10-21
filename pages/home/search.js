// pages/home/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    link:[
      "美短",
      "哈士奇",
      "土狗",
      "博美",
      "柴犬",
      "金毛",
      "柯基",
      "泰迪"
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