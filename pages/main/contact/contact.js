// pages/contact/contact.js
var requestUrl = getApp().globalUrl
Page({
  data:{
    unitList: [],
    peopleList: [],
    searchValue: '',
    isSearch: false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.getDepts()
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  getDepts: function(){
    var that = this
    wx.request({
      url: requestUrl + 'index/contact',
      method: 'GET',
      data: {
        unit_code: '00000000'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var list = JSON.parse(res.data.return).unit
        that.setData({
          unitList: list
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '服务器异常',
          image: '../../../images/error.png'
        })
      }
    })
  },
  getSearchValue: function(e){
    var value = e.detail.value
    if(value == ''){
      this.setData({
        searchValue: '',
        isSearch: false
      })
    }else{
      this.setData({
        searchValue: value
      })
    }
  },
  clearSearchValue: function(){
    this.setData({
      searchValue: '',
      isSearch: false
    })
  },
  toSearch: function(){
    var that = this
    wx.showLoading({
      title: '查询中',
    })
    wx.request({
      url: requestUrl + 'index/search',
      method: 'GET',
      data: {
        search_value: that.data.searchValue
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()
        var list = JSON.parse(res.data.return).person
        that.setData({
          peopleList: list,
          isSearch: true
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '服务器异常',
          image: '../../../images/error.png'
        })
      }
    })
  },
  getInfo: function (e) {
    var info = e.currentTarget.dataset.info
    wx.navigateTo({
      url: './info?info=' + JSON.stringify(info),
    })
  }
})