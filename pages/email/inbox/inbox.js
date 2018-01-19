var app = getApp()
var email = require('../interface/emailInterface.js')
var username = ''
var password = ''
var folderId = ''
var pageIndex = 1
var pageSize = 100
var emailList = []
Page({
  data: {
    emailCont: 0,
    emailList: [],
    moreText: '加载更多',
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.folderName
    })
    if (app.isDefine(options.folderId)){
      folderId = options.folderId + '='
    }else{
      folderId = options.folderId
    }
    username = wx.getStorageSync('userinfo').username
    password = wx.getStorageSync('userinfo').password
    this.getEmailList()
  },
  onUnload: function () {
    folderId = ''
    emailList = []
    pageIndex = 1
    pageSize = 100
  },
  getEmailList: function(){
    var that = this
    wx.showLoading({
      title: '加载中'
    })
    email.getEmailList(username, password, folderId, pageIndex, pageSize, function(data){
      wx.hideLoading()
      wx.stopPullDownRefresh()
      if(data.length){
        for(var i = 0; i < data.length; i++){
          emailList.push(data[i])
        }
        that.setData({
          emailCont: data.length == 0 ? -1 : data.length,
          emailList: emailList,
          moreText: '加载更多'
        })
      }else{
        if (that.data.emailCont > 0) {
          that.setData({
            moreText: '已加载至最后一页'
          })
        }else{
          that.setData({
            emailCont: -1
          })
        }
      }
    })
  },
  onPullDownRefresh: function(){
    pageIndex = 1
    emailList = []
    this.setData({
      emailCont: 0,
      emailList: []
    })
    this.getEmailList()
  },
  getNextList: function () {
    if (this.data.moreText == '已加载至最后一页') {
      return
    } else {
      pageIndex++
      this.getEmailList()
    }
  },
})