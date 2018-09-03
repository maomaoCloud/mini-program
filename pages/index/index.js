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
    province: "",
    city: "",
    district: "",
    address: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadInfo();
  },


  //获取当前位置的经纬度
  loadInfo: function() {
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
        that.setData({
          province: data[0].regeocodeData.addressComponent.province,
          city: data[0].regeocodeData.addressComponent.city,
          district: data[0].regeocodeData.addressComponent.district,
          address: data[0].regeocodeData.formatted_address
        });
      },
      fail: function(info) {}
    })
  }
})