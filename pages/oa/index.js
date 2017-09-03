//引用OA接口文件
var oa = require('interface/oaInterface.js')
//定义相关全局变量
var user_code = ''
var backlogPageNum = 1
var toReadPageNum = 1
var readedPageNum = 1
var backlogList = []
var toreadList = []
var readedList = []
var flag = -1
Page({
  data: {
    swiperCurrent: 0,
    backlogList: [],
    toreadList: [],
    readedList: [],
    backlogCount: -1,
    toreadCount: -1,
    readedCount: -1,
    backlogMoreText: '加载更多',
    toreadMoreText: '加载更多',
    readedMoreText: '加载更多',
    tabBar: [
      {
        iconPath: "images/backlog.png",
        selectedIconPath: "images/backlog-active.png",
        text: "待办事项",
        badge: ''
      },
      {
        iconPath: "images/toread.png",
        selectedIconPath: "images/toread-active.png",
        text: "待阅事项",
        badge: ''
      },
      {
        iconPath: "images/readed.png",
        selectedIconPath: "images/readed-active.png",
        text: "已阅事项",
        badge: ''
      }
    ]
  },
  onLoad: function (options) {
    user_code = wx.getStorageSync('userinfo').username
    this.getBadges()
    this.changeItem(0)
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {
    backlogPageNum = 1
    toReadPageNum = 1
    readedPageNum = 1
    backlogList = []
    toreadList = []
    readedList = []
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
    if (flag == index){
      return
    }else{
      flag = index
    }
    this.setData({
      swiperCurrent: index
    })
    
    switch (index) {
      case 0:
        backlogList = []
        this.getBacklogList()
        break
      case 1:
        toreadList = []
        this.getToReadList()
        break
      case 2:
        readedList = []
        this.getReadedList()
        break
    }
  },
  getBadges: function(){
    var that = this
    oa.getBacklogCount(user_code, function(data){
      var status = data.status
      if (status == 0) {
        that.setData({
          'tabBar[0].badge': data.count == 0 ? '' : data.count
        })
      }
    })
    oa.getToReadCount(user_code, function (data) {
      var status = data.status
      if (status == 0) {
        that.setData({
          'tabBar[1].badge': data.count == 0 ? '' : data.count
        })
      }
    })
  },
  getBacklogList: function(){
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    oa.getBacklogList(user_code, 'all', backlogPageNum, 10, function (data) {
      wx.stopPullDownRefresh()
      var status = data.status
      if (status == 0){
        that.setData({
          backlogCount: data.count == 0 ? 0 : data.count
        })
        wx.hideLoading()
        var list = data.fw_list
        if (list.length) {
          for (var i = 0; i < list.length; i++) {
            list[i].ngr = list[i].ngr.substring(0, list[i].ngr.indexOf("("))
            list[i].arrival_time = list[i].arrival_time.substring(0, 10)
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
      }else{
        wx.showToast({
          title: data.msg,
          image: 'images/error.png'
        })
      }
    })
  },
  getToReadList: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    oa.getToReadList(user_code, toReadPageNum, 10, function (data) {
      wx.stopPullDownRefresh()
      var status = data.status
      if (status == 0) {
        wx.hideLoading()
        that.setData({
          toreadCount: data.count == 0 ? 0 : data.count
        })
        var list = data.doc_list
        if (list.length) {
          for(var i = 0; i < list.length; i++){
            toreadList.push(list[i])
          }
          that.setData({
            toreadList: toreadList,
            toreadMoreText: '加载更多'
          })
        } else {
          if (that.data.toreadCount > 0) {
            that.setData({
              toreadMoreText: '已加载至最后一页'
            })
          }
        }
      }
    })
  },
  getReadedList: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    oa.getReadedList(user_code, readedPageNum, 10, function (data) {
      wx.stopPullDownRefresh()
      var status = data.status
      if (status == 0) {
        wx.hideLoading()
        that.setData({
          readedCount: data.count == 0 ? 0 : data.count
        })
        var list = data.doc_list
        if (list.length) {
          for (var i = 0; i < list.length; i++) {
            readedList.push(list[i])
          }
          that.setData({
            readedList: readedList,
            readedMoreText: '加载更多'
          })
        }else{
          if (that.data.readedCount > 0){
            that.setData({
              readedMoreText: '已加载至最后一页'
            })
          }
        }
      } else {
        wx.showToast({
          title: data.msg,
          image: 'images/error.png'
        })
      }
    })
  },
  onPullDownRefresh: function () {
    this.getBadges()
    backlogPageNum = 1
    toReadPageNum = 1
    readedPageNum = 1
    backlogList = []
    toreadList = []
    readedList = []
    var index = this.data.swiperCurrent
    if(index == 0){
      this.setData({
        backlogList: []
      })
      this.getBacklogList()
    }else if(index == 1){
      this.setData({
        toreadList: []
      })
      this.getToReadList()
    }else{
      this.setData({
        readedList: []
      })
      this.getReadedList()
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
  getNextToReadedList: function () {
    if (this.data.toreadMoreText == '已加载至最后一页') {
      return
    } else {
      toReadPageNum++
      this.getToReadList()
    }
  },
  getNextReadedList: function(){
    if (this.data.readedMoreText == '已加载至最后一页'){
      return
    }else{
      readedPageNum++
      this.getReadedList()
    }
  }
})