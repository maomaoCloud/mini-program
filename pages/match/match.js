var WxSearch = require('../../wxSearchView/wxSearchView.js');
var amapFile = require('../../libs/amap-wx.js');

var markersData = {
  latitude: '', //纬度
  longitude: '', //经度
  key: "a3787a876a9376e2c531ef1fac5248af" //申请的高德地图key
};

Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: '2016-09-01',
    region: ['江苏省', '苏州市', '虎丘区'],
    addActive: false,
    animationData: {},
    currentTab: 0,
    swiperData: [{
        id: 0,
        url: "../newsdetail/newsdetail",
        img: "https://modao.cc/uploads3/images/2344/23442711/raw_1533194172.png"
      },
      {
        id: 1,
        url: "../newsdetail/newsdetail",
        img: "https://modao.cc/uploads3/images/2344/23442741/raw_1533194190.png"
      }
    ],
    gameData: [{
        id: 0,
        img: "https://modao.cc/uploads3/images/2343/23439266/raw_1533192038.png",
        name: "跳跳掼蛋",
      link: "http://www.w3school.com.cn/My%20first/"
      },
      {
        id: 1,
        img: "https://modao.cc/uploads3/images/2343/23439257/raw_1533192026.png",
        name: "红中麻将",
        link: "http://www.w3school.com.cn/My%20first/"
      },
      {
        id: 2,
        img: "https://modao.cc/uploads3/images/2343/23439255/raw_1533192025.png",
        name: "欢乐麻将",
        link: "http://www.w3school.com.cn/My%20first/"
      },
      {
        id: 3,
        img: "https://modao.cc/uploads3/images/2343/23439228/raw_1533192013.png",
        name: "四川麻将",
        link: "http://www.w3school.com.cn/My%20first/"
      },
      {
        id: 4,
        img: "https://modao.cc/uploads3/images/2343/23439266/raw_1533192038.png",
        name: "跳跳掼蛋",
        link: "http://www.w3school.com.cn/My%20first/"
      }
    ],
    matchData: [{
        id: 0,
        img: "https://modao.cc/uploads3/images/2343/23436687/raw_1533190374.png",
        title: "2018腾讯麻将锦标赛北京站火热报名进行中",
        address: "江苏省苏州市",
        date: "8月18日 15:00",
        number: "1234",
        fee: 88
      },
      {
        id: 1,
        img: "https://modao.cc/uploads3/images/2344/23443657/raw_1533194731.png",
        title: "《跳跳掼蛋》姑苏区线上预选赛火热进行中",
        address: "江苏省苏州市",
        date: "10月18日 16:00",
        number: "340",
        fee: 0
      },
      {
        id: 2,
        img: "https://modao.cc/uploads3/images/2344/23443797/raw_1533194816.png",
        title: "国家杯棋牌职业大师赛海南澄迈站火热报名中",
        address: "海南省澄迈县",
        date: "10月18日 16:00",
        number: "340",
        fee: 50
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadLocationInfo();
  },

  /**点击首页搜索框*/
  wxSearchHolder: function() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  /*选择tab*/
  selectTab: function(e) {
    var index = e.target.dataset.index;
    this.setData({
      currentTab: parseInt(index)
    });
  },

  /**选择首页添加活动事件*/
  addActive: function() {
    var that = this;
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(600).step()
    that.setData({
      animationData: animation.export(),
      addActive: true
    })

    setTimeout(function() {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 200);
  },

  /**隐藏弹出层*/
  hideMask: function() {
    var that = this;
    that.setData({
      addActive: false
    });
  },
  /**省市区联动*/
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  /**获取当前位置的经纬度*/
  loadLocationInfo: function() {
    var that = this;
    wx.getLocation({
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: function(res) {
        var latitude = res.latitude //维度
        var longitude = res.longitude //经度
        console.log(res);
        that.loadCity(latitude, longitude);
      },
      fail: function(info) {
        console.log(info);
      }
    })
  },

  //把当前位置的经纬度传给高德地图，调用高德API获取当前地理位置，天气情况等信息
  loadCity: function(latitude, longitude) {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({
      key: markersData.key
    });
    myAmapFun.getRegeo({
      location: '' + longitude + ',' + latitude + '', //location的格式为'经度,纬度'
      success: function(data) {
        console.log(data);
        var region = new Array();
        region[0] = data[0].regeocodeData.addressComponent.province;
        region[1] = data[0].regeocodeData.addressComponent.city;
        region[2] = data[0].regeocodeData.addressComponent.district;
        that.setData({
          region: region
        });
      },
      fail: function(info) {}
    })
  }


})