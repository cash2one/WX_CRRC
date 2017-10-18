//引用接口文件
var tz = require('interface/fkInterface.js')
//定义相关全局变量
var user_code = ''
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
    tz.getBacklogCount(user_code, function (data) {
      var status = data.status
      if (status == 0) {
        that.setData({
          'tabBar[0].badge': data.total_count == 0 ? '' : data.total_count
        })
      }
    })
    tz.getMyApplyCount(user_code, function (data) {
      var status = data.status
      if (status == 0) {
        that.setData({
          'tabBar[1].badge': data.total_count == 0 ? '' : data.total_count
        })
      }
    })
  },
  getBacklogList: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    tz.getBacklogList(user_code, backlogPageNum, 10, function (data) {
      wx.stopPullDownRefresh()
      var status = data.status
      if (status == 0) {
        that.setData({
          backlogCount: data.total_count == 0 ? 0 : data.total_count
        })
        wx.hideLoading()
        var list = data.instance_list
        if (list.length) {
          for (var i = 0; i < list.length; i++) {
            backlogList.push(list[i])
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
      } else {
        wx.showToast({
          title: "服务器异常",
          image: 'images/error.png'
        })
      }
    })
  },
  getMyApplyList: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    tz.getMyApplyList(user_code, myApplyPageNum, 10, function (data) {
      wx.stopPullDownRefresh()
      var status = data.status
      if (status == 0) {
        that.setData({
          myApplyCount: data.total_count == 0 ? 0 : data.total_count
        })
        wx.hideLoading()
        var list = data.instance_list
        if (list.length) {
          for (var i = 0; i < list.length; i++) {
            myApplyList.push(list[i])
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
      } else {
        wx.showToast({
          title: "服务器异常",
          image: 'images/error.png'
        })
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