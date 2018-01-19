var app = getApp()
var email = require('../interface/emailInterface.js')
var flag = -1
var username = ''
var password = ''
Page({
  data: {
    swiperCurrent: 0,
    tabBar: [
      {
        iconPath: "../images/main.png",
        selectedIconPath: "../images/main-active.png",
        text: "收件箱"
      },
      {
        iconPath: "../images/more.png",
        selectedIconPath: "../images/more-active.png",
        text: "更多"
      }
    ],
    inboxCount: 0,
    hasFolders: false,
    folders: []
  },
  onLoad: function (options) {
    username = wx.getStorageSync('userinfo').username
    password = wx.getStorageSync('userinfo').password
    this.changeItem(0)
  },
  onUnload: function () {
    flag = -1

  },
  changeItem: function (e) {
    if (typeof e == 'object') {
      var index = e.currentTarget.dataset.index
    } else {
      var index = e
    }
    if (flag == index) {
      return
    } else {
      flag = index
    }
    this.setData({
      swiperCurrent: index
    })
    switch (index) {
      case 0:
        this.getFolders()
        break
      case 1:
        break
    }
  },
  //查询是否存在子文件夹
  getFolders: function () {
    var that = this
    wx.showLoading({
      title: '加载中...'
    })
    email.getFolders(username, password, function (data) {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      //收件箱未读邮件数量
      var inboxCount = data.shoucount
      that.setData({
        inboxCount: inboxCount
      })
      //子文件数组
      var folders = data.list
      if (folders.length) {
        that.setData({
          hasFolders: true,
          folders: folders
        })
      } else {
        that.setData({
          hasFolders: false
        })
      }
    })
  },
  openInbox: function (e) {
    var folderId = e.currentTarget.dataset.folderid
    var folderName = e.currentTarget.dataset.foldername
    wx.navigateTo({
      url: '../inbox/inbox?folderId=' + folderId + '&folderName=' + folderName
    })
  },
  onPullDownRefresh: function () {
    var index = this.data.swiperCurrent
    if (index == 0) {
      this.getFolders()
    } else if (index == 1) {

    }
  },
})