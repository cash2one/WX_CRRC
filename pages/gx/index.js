//引用接口文件
var gx = require('interface/gxInterface.js')
//定义相关全局变量
var user_code = ''
var unit_code = ''
var backlogPageNum = 1
var myApplyPageNum = 1
var backlogList = []
var myApplyList = []
var flag = -1
Page({
  data: {
    swiperCurrent: 0,
    backlogList: [],
    myApplyList: [],
    backlogCount: -1,
    myApplyCount: -1,
    backlogMoreText: '加载更多',
    myApplyMoreText: '加载更多',
    tabBar: [
      {
        iconPath: "images/backlog.png",
        selectedIconPath: "images/backlog-active.png",
        text: "待办事项",
        badge: ''
      },
      {
        iconPath: "images/readed.png",
        selectedIconPath: "images/readed-active.png",
        text: "当前申请",
        badge: ''
      }
    ]
  },
  onLoad: function (options) {
    wx.setStorageSync('unit_code','01000000')
    unit_code = wx.getStorageSync('unit_code')
    user_code = wx.getStorageSync('userinfo').username
    this.getBadges()
    this.changeItem(0)
  },
  onUnload: function () {
    backlogPageNum = 1
    myApplyPageNum = 1
    backlogList = []
    myApplyList = []
    flag = -1
    var indexPage = getCurrentPages()[0]
    indexPage.getBacklogCount()
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
        backlogPageNum = 1
        backlogList = []
        this.getBacklogList()
        break
      case 1:
        myApplyPageNum = 1
        myApplyList = []
        this.getMyApplyList()
        break
    }
  },
  getBadges: function () {
    var that = this
    gx.getCount(user_code, 'A', unit_code, function (data) {
      that.setData({
        'tabBar[0].badge': data == 0 ? '' : data
      })
    })
    gx.getCount(user_code, 'C', unit_code, function (data) {
      that.setData({
        'tabBar[1].badge': data == 0 ? '' : data
      })
    })
  },
  getBacklogList: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    gx.getList(user_code, 'A', unit_code, backlogPageNum, 10, function (data) {
      wx.stopPullDownRefresh()
      that.setData({
        backlogCount: data.length == 0 ? 0 : data.length
      })
      wx.hideLoading()
      if (data.length) {
        for (var i = 0; i < data.length; i++) {
          backlogList.push(data[i])
        }
        that.setData({
          backlogList: backlogList,
          backlogMoreText: '加载更多'
        })
      } else {
        if (that.data.backlogCount > 0) {
          that.setData({
            backlogMoreText: '已加载至最后一页'
          })
        }
      }
    })
  },
  getMyApplyList: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    gx.getList(user_code, 'C', unit_code, myApplyPageNum, 10, function (data) {
      wx.stopPullDownRefresh()
      that.setData({
        myApplyCount: data.length == 0 ? 0 : data.length
      })
      wx.hideLoading()
      if (data.length) {
        for (var i = 0; i < data.length; i++) {
          myApplyList.push(data[i])
        }
        that.setData({
          myApplyList: myApplyList,
          myApplyMoreText: '加载更多'
        })
      } else {
        if (that.data.myApplyCount > 0) {
          that.setData({
            myApplyMoreText: '已加载至最后一页'
          })
        }
      }
    })
  },
  onPullDownRefresh: function () {
    this.getBadges()
    backlogPageNum = 1
    myApplyPageNum = 1
    backlogList = []
    myApplyList = []
    var index = this.data.swiperCurrent
    if (index == 0) {
      this.setData({
        backlogList: []
      })
      this.getBacklogList()
    } else if (index == 1) {
      this.setData({
        myApplyList: []
      })
      this.getMyApplyList()
    }
  },
  getNextBacklogList: function () {
    if (this.data.backlogMoreText == '已加载至最后一页') {
      return
    } else {
      backlogPageNum++
      this.getBacklogList()
    }
  },
  getNextmyApplyList: function () {
    if (this.data.myApplyMoreText == '已加载至最后一页') {
      return
    } else {
      myApplyPageNum++
      this.getMyApplyList()
    }
  },
})