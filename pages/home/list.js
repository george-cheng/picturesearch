const ults = require('../../urls/urls.js')
console.log(ults)
// pages/home/list.js
// &word=狗 &pn=30 &rn=30

Page({
  data: {
    word:"",
    page:1,
    row:30,
    list:3,
    org:[],
    imgs:[],
    height:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //分页加载
    //page
    this.createContainer();
    this.data.word = options.q || "春日野囧";
    this.showPage();
    wx.setNavigationBarTitle({
      title: this.data.word,
    });
    // this.data.imgs[0].push(1)
  },
  createContainer(){
    this.data.height = new Array(this.data.list).fill(0);
    this.data.imgs = new Array(this.data.list).fill(0).map(()=>[]);
    console.log(this.data.imgs)
    // this.showPage()
  },
  showPage(){
    this.query()
      .then((res) => {
        let codeData = this.codeData(res.data.data)
        this.showData(codeData)
      })
  },
  query() {
    wx.showNavigationBarLoading()
    let queryUrl = ults.imgQueryUrl(this.data.word,this.data.page,this.data.row);
    return new Promise((resolve, reject) => {
      wx.request({
        url: queryUrl,
        success: resolve,
        fail: reject
      })
    });
  },
  codeData(data){
    let codeData = [];
    data.forEach((img)=>{
      if(img.objURL){
        codeData.push(Object.assign({
          thumb: img.thumbURL,
          middle: img.middleURL,
          obj: img.objURL
        }, ults.zoom(img)))
      }
    })
    return codeData
  },

  showData(data){
    this.data.org.push(...data)
    data.forEach((item)=>{

      let min = Math.min(...this.data.height)
      let index = this.data.height.findIndex(item=>min===item);
      this.data.imgs[index].push(item)
      this.data.height[index]+=item.height
    });
    this.setData({
      imgs: this.data.imgs 
    })
    wx.hideNavigationBarLoading()
  },
  more(){
    this.data.page++;
    this.showPage()
  },
  download(e){
    
    let url = e.currentTarget.dataset.src;
    wx.downloadFile({
      url,
      success(res){
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath
        })
      }
    })
  },

  showImage(e){
    let current = e.currentTarget.dataset.src;
    let urls = this.data.org.map(item => { return item.middle });

    wx.previewImage({
      current, urls
    })
  }
})