//引用接口文件
var itsm = require('interface/itInterface.js')
//定义相关全局变量
var user_code = ''
var password = ''
var backlogList = []
var myApproveList = []
var flag = -1
Page({
  data: {
    swiperCurrent: 0,
    tabBar: [
      {
        iconPath: "images/backlog.png",
        selectedIconPath: "images/backlog-active.png",
        text: "我的请求",
        badge: ''
      },
      {
        iconPath: "images/approve.png",
        selectedIconPath: "images/approve-active.png",
        text: "满意度",
        badge: ''
      }
    ],
    backlogList: [],
    backlogCount: '',
    myApproveList: [],
    myApproveCount: ''
  },
  onLoad: function (options) {
    user_code = wx.getStorageSync('userinfo').username
    password = wx.getStorageSync('userinfo').password
    this.getCount()
    this.changeItem(0)
  },
  onUnload: function () {
    backlogList = []
    myApproveList = []
    flag = -1
    var indexPage = getCurrentPages()[0]
    indexPage.getBacklogCount()
  },
  getCount: function(){
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    itsm.count(user_code, password, user_code, 'HelpDesk_QueryList_Service_Requester', function (data) {
      that.setData({
        myApproveCount: data == 0 ? '' : data,
        'tabBar[0].badge': data == 0 ? '' : data
      })
    })
    itsm.count(user_code, password, user_code, 'Survey_QueryList_Service', function (data) {
      that.setData({
        'tabBar[1].badge': data == 0 ? '' : data
      })
    })
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
        myApproveList = []
        this.getMyApproveList()
        break
      case 1:
        backlogList = []
        this.getBacklogList()
        break
    }
  },
  getMyApproveList: function () {
    var that = this
    itsm.getList(user_code, password, user_code,'HelpDesk_QueryList_Service_Requester', function (data) {
      wx.stopPullDownRefresh()
      that.setData({
        myApproveCount: data.length == 0 ? 0 : data.length
      })
      wx.hideLoading()
      if (data.length) {
        for (var i = 0; i < data.length; i++) {
          data[i].SubmitDate = data[i].SubmitDate.substring(0,10)
          myApproveList.push(data[i])
        }
        that.setData({
          myApproveList: myApproveList,
        })
      }
    })
  },
  onPullDownRefresh: function () {
    this.getCount()
    var index = this.data.swiperCurrent
    if (index == 0) {
      this.setData({
        myApproveCount: '',
        myApproveList: []
      })
      this.getMyApproveList()
    } else if (index == 1) {
      this.setData({
        backlogCount: '',
        backlogList: []
      })
      this.getBacklogList()
    }
    
  },
  toApprove: function(){
    wx.navigateTo({
      url: './approve'
    })
  }
})