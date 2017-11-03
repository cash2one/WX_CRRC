var app = getApp()
var gx = require('interface/gxInterface.js')
var user_code = ''
var unit_code = ''
var boe_header_id = ''
var detail_type = ''
Page({
  data: {
    hideMask: true,
    isApprove: false,
    isReject: false,
    isTransfer: false,
    opened: '',
    switchTitle: [
      '详细信息',
      '审批进度'
    ],
    switchCurrent: 0,
    header: [],
    lines: [],
    opinionContents: [],
    approveOpinion: '同意',
    rejectOpinion: '拒绝',
    transferOpinion: '请处理',
    canBack: 'Y',
    people: null
  },
  onLoad: function (options) {
    user_code = wx.getStorageSync('userinfo').username
    unit_code = wx.getStorageSync('unit_code')
    boe_header_id = options.boe_header_id
    var opened = options.opened
    if (opened == 'myapply') {
      this.canBack()
    }
    detail_type = options.detail_type
    this.setData({
      opened: options.opened
    })
    this.changeItem(0)
  },
  onUnload: function () {
    boe_header_id = ''
    detail_type = ''
  },
  changeItem: function (e) {
    if (typeof e == 'object') {
      var index = e.target.dataset.index
    } else {
      var index = e
    }
    this.setData({
      switchCurrent: index,
      header: [],
      lines: [],
      opinionContents: [],
    })
    if (index == 0) {
      this.getBacklogDetail()
    }
  },
  getBacklogDetail: function () {
    switch (detail_type) {
      case '1':
        this.getTravelDetail()
        break
      case '2':
        this.getBoeDetail()
        break
      default:
        wx.showModal({
          title: '温馨提示',
          content: '此类单据无法在移动端查看',
          showCancel: false,
          confirmColor: '#C70019',
          success: function (res) { }
        })
        break
    }
  },
  getTravelDetail: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    gx.getTravelDetail(boe_header_id, unit_code, function (data) {
      wx.hideLoading()
      that.setData({
        header: data.HEADER,
        lines: data.LINES,
        opinionContents: data.PROCESS_HISTORY
      })
    })
  },
  getBoeDetail: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    gx.getBoeDetail(boe_header_id, unit_code, function (data) {
      console.log(data)
      wx.hideLoading()
      that.setData({
        header: data.HEADER,
        lines: data.LINES,
        opinionContents: data.PROCESS_HISTORY
      })
    })
  },
  canBack: function () {
    var that = this
    gx.canBack(user_code, function (data) {
      that.setData({
        canBack: data
      })
    })
  },
  btn_click: function (e) {
    this.setData({
      hideMask: false,
    })
    var btnType = e.currentTarget.dataset.type
    switch (btnType) {
      case 'approve':
        this.setData({
          isApprove: true,
          isReject: false,
          isTransfer: false,
          isLine: false
        })
        break
      case 'reject':
        this.setData({
          isApprove: false,
          isReject: true,
          isTransfer: false,
          isLine: false
        })
        break
      case 'transfer':
        this.setData({
          isApprove: false,
          isReject: false,
          isTransfer: true,
          isLine: false
        })
        break
    }
  },
  hideMask: function () {
    this.setData({
      hideMask: true
    })
  },
  getApproveOpinion: function (e) {
    var approveOpinion = e.detail.value
    this.setData({
      approveOpinion: approveOpinion
    })
  },
  getRejectOpinion: function (e) {
    var rejectOpinion = e.detail.value
    this.setData({
      rejectOpinion: rejectOpinion
    })
  },
  getTransferOpinion: function (e) {
    var transferOpinion = e.detail.value
    this.setData({
      transferOpinion: transferOpinion
    })
  },
  approve: function () {
    wx.showLoading({
      title: '提交中',
      mask: true
    })
    gx.approve(user_code, boe_header_id, this.data.approveOpinion, function (data) {
      if (data.status == 0) {
        wx.showToast({
          title: '提交成功',
        })
        setTimeout(function () {
          var prePage = getCurrentPages()[1]
          prePage.onPullDownRefresh()
          wx.navigateBack({
            delta: 1
          })
        }, 1000);
      } else {
        wx.showToast({
          title: '提交失败',
          image: 'images/error.png'
        })
      }
    })
  },
  reject: function () {
    wx.showLoading({
      title: '提交中',
      mask: true
    })
    gx.reject(user_code, boe_header_id, this.data.rejectOpinion, function (data) {
      if (data.status == 0) {
        wx.showToast({
          title: '提交成功',
        })
        setTimeout(function () {
          var prePage = getCurrentPages()[1]
          prePage.onPullDownRefresh()
          wx.navigateBack({
            delta: 1
          })
        }, 1000);
      } else {
        wx.showToast({
          title: '提交失败',
          image: 'images/error.png'
        })
      }
    })
  },
  transfer: function () {
    wx.showLoading({
      title: '提交中',
      mask: true
    })
    gx.transfer(boe_header_id, this.data.people.user_code, this.data.transferOpinion, function (data) {
      if (data.status == 0) {
        wx.showToast({
          title: '提交成功',
        })
        setTimeout(function () {
          var prePage = getCurrentPages()[1]
          prePage.onPullDownRefresh()
          wx.navigateBack({
            delta: 1
          })
        }, 1000);
      } else {
        wx.showToast({
          title: '提交失败',
          image: 'images/error.png'
        })
      }
    })
  },
  backInstance: function () {
    wx.showModal({
      title: '提示',
      content: '确定要收回该单据吗？',
      confirmColor: '#C70019',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '请稍后',
            mask: true
          })
          gx.backInstance(user_code, function (data) {
            if (data == 'Y') {
              wx.showToast({
                title: '回收成功',
              })
              setTimeout(function () {
                var prePage = getCurrentPages()[1]
                prePage.onPullDownRefresh()
                wx.navigateBack({
                  delta: 1
                })
              }, 1000);
            } else {
              wx.showToast({
                title: '回收失败',
                image: 'images/error.png'
              })
            }
          })
        } else if (res.cancel) {
          return
        }
      }
    })
  },
  addNewPerson: function () {
    wx.navigateTo({
      url: './peopleList'
    })
  },
  getCheckedPerson: function () {
    var peopleObj = {}
    var people = wx.getStorageSync('people')
    var user_name = people.substring(0, people.indexOf('-'))
    var user_code = people.substring(people.indexOf('-') + 1, people.length)
    peopleObj.user_name = user_name
    peopleObj.user_code = user_code
    this.setData({
      people: peopleObj
    })
  },
  removePeople: function () {
    wx.removeStorageSync('people')
    this.setData({
      people: null
    })
  }
})