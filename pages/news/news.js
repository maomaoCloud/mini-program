const app = getApp();

Page({
  data: {
    newsData: [{
        id: "1",
        date: "4分钟前",
        title: "2018腾讯麻将锦标赛北京站火热报名进行中进行中进行中",
        img: "https://modao.cc/uploads3/images/2343/23436687/raw_1533190374.png"
      },
      {
        id: "2",
        date: "27分钟前",
        title: "《跳跳掼蛋》2V2好有红包塞火热开启",
        img: "https://modao.cc/uploads3/images/2344/23443657/raw_1533194731.png"
      },
      {
        id: "3",
        date: "1天前",
        title: "国家杯棋牌职业大师赛在海南澄迈火热进行",
        img: "https://modao.cc/uploads3/images/2344/23443797/raw_1533194816.png"
      }, {
        id: "4",
        date: "4分钟前",
        title: "2018腾讯麻将锦标赛北京站火热报名进行中进行中进行中",
        img: "https://modao.cc/uploads3/images/2343/23436687/raw_1533190374.png"
      },
      {
        id: "5",
        date: "27分钟前",
        title: "《跳跳掼蛋》2V2好有红包塞火热开启",
        img: "https://modao.cc/uploads3/images/2344/23443657/raw_1533194731.png"
      },
      {
        id: "6",
        date: "1天前",
        title: "国家杯棋牌职业大师赛在海南澄迈火热进行",
        img: "https://modao.cc/uploads3/images/2344/23443797/raw_1533194816.png"
      }
    ],
    typeId: "001",
    currentPage: 0,
    pageSize: 3,
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadNews(true);
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
    this.setData({
      currentPage: 0,
      hasMore: true
    });
    this.loadNews(true);
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.loadNews(false);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
  },

  /**
   * 加载新闻
   */
  loadNews: function(isReload) {
    var that = this;
    if (!that.data.hasMore) return;
    wx.showLoading({
      title: '加载新闻中...'
    });
    wx.showNavigationBarLoading();

    wx.request({
      url: app.serverUrl + "news/" + that.data.typeId + "/" + (that.data.currentPage + 1) + "/" + that.data.pageSize,
      success: function(data) {
        var jsonData = data.data;
        console.log(jsonData);
        if (jsonData.code == 200) {
          var newsData = isReload ? jsonData.resData.data : that.data.newsData.concat(jsonData.resData.data);
          var hasMore = jsonData.resData.hasMore;
          var currentPage = that.data.currentPage + 1;
          that.setData({
            newsData: newsData,
            hasMore: hasMore,
            currentPage: currentPage
          });

          wx.hideLoading();
          wx.hideNavigationBarLoading();
        } else {
          wx.showToast({
            title: jsonData.msg
          })
        }

      },
      fail: function() {
        wx.showToast({
          title: "加载失败，请稍后重试。"
        })
      }
    })
  }
})