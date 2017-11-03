var app = getApp()
var fk = require('interface/fkInterface.js')
var user_code = ''
var record_id = ''
var instance_id = ''
var document_header_id = ''
var category = ''
var contents = []
var lineContents = []
var line_index = 0
Page({
  data: {
    hideMask: true,
    isApprove: false,
    isReject: false,
    isTransfer: false,
    isLine: false,
    opened: '',
    switchTitle: [
      '详细信息',
      '审批进度'
    ],
    switchCurrent: 0,
    contents: [],
    lineContents: [],
    lineType: '',
    lineList: [],
    opinionContents: [],
    approveOpinion: '同意',
    rejectOpinion: '拒绝',
    transferOpinion: '请处理',
    canBack: 'Y',
    people: null
  },
  onLoad: function (options) {
    user_code = wx.getStorageSync('userinfo').username
    record_id = options.instance_record_id
    instance_id = options.instance_id
    var opened = options.opened
    if (opened == 'myapply'){
      this.canBack()
    }
    category = options.workflow_category
    this.setData({
      opened: options.opened
    })
    this.changeItem(0)
  },
  onUnload: function () {
    record_id = ''
    instance_id = ''
    document_header_id = ''
    category = ''
    contents = []
    lineContents = []
  },
  changeItem: function (e) {
    if (typeof e == 'object') {
      var index = e.target.dataset.index
    } else {
      var index = e
    }
    this.setData({
      switchCurrent: index
    })
    if (index == 0) {
      contents = []
      this.getBacklogDetail()
    }
  },
  getBacklogDetail: function () {
    switch (category) {
      case 'TRAVEL_REPORT':
        this.setData({
          lineType: 'TRAVEL_REPORT'
        })
        this.getTravelDetail()
        break
      case 'PAYMENT_REQUISITION':
        this.setData({
          lineType: 'PAYMENT_REQUISITION'
        })
        this.getLoanDetail()
        break
      case 'EXP_REQUISITION':
        this.setData({
          lineType: 'EXP_REQUISITION'
        })
        this.getApplicationDetail()
        break
      case 'EXP_REPORT':
        this.setData({
          lineType: 'EXP_REPORT'
        })
        this.getReimbursementDetail()
        break
      case '414':
        this.setData({
          lineType: '414'
        })
        this.getBookingDetail()
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
    contents = []
    var that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    fk.getTravelDetail(record_id, function (data) {
      wx.hideLoading()
      var head = data.head
      if (app.isDefine(head[0].exp_report_type_desc)) {
        that.appendContent('单据类型', head[0].exp_report_type_desc)
      }
      if (app.isDefine(head[0].exp_report_number)) {
        that.appendContent('单据编号', head[0].exp_report_number)
      }
      if (app.isDefine(head[0].employee_code)) {
        that.appendContent('申请人', head[0].employee_code)
      }
      if (app.isDefine(head[0].report_date)) {
        that.appendContent('申请日期', head[0].report_date)
      }
      if (app.isDefine(head[0].employee_levels_desc)) {
        that.appendContent('员工层级', head[0].employee_levels_desc)
      }
      if (app.isDefine(head[0].total_amount)) {
        that.appendContent('报销总金额', head[0].total_amount)
      }
      if (app.isDefine(head[0].overweight_reason)) {
        that.appendContent('超标原因', head[0].overweight_reason)
      }
      if (app.isDefine(head[0].description)) {
        that.appendContent('说明', head[0].description)
      }

      that.setData({
        contents: contents,
        lineList: data.line_list,
        opinionContents: data.approve_history_list
      })
    })
  },
  getLoanDetail: function () {
    contents = []
    var that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    fk.getLoanDetail(record_id, function (data) {
      wx.hideLoading()
      var head = data.head
      if (app.isDefine(head[0].payment_req_type_desc)) {
        that.appendContent('单据类型', head[0].payment_req_type_desc)
      }
      if (app.isDefine(head[0].requisition_number)) {
        that.appendContent('单据编号', head[0].requisition_number)
      }
      if (app.isDefine(head[0].employee_code)) {
        that.appendContent('申请人', head[0].employee_code)
      }
      if (app.isDefine(head[0].requisition_date)) {
        that.appendContent('借款申请日期', head[0].requisition_date)
      }
      if (app.isDefine(head[0].ivt_code)) {
        that.appendContent('工作令号', head[0].ivt_code)
      }
      if (app.isDefine(head[0].total_amount)) {
        that.appendContent('借款总金额', head[0].total_amount)
      }
      if (app.isDefine(head[0].description)) {
        that.appendContent('说明', head[0].description)
      }
      that.setData({
        contents: contents,
        lineList: data.line_list,
        opinionContents: data.approve_history_list
      })
    })
  },
  getApplicationDetail: function () {
    contents = []
    var that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    fk.getApplicationDetail(record_id, function (data) {
      wx.hideLoading()
      var head = data.head
      if (app.isDefine(head[0].exp_requisition_type_desc)) {
        that.appendContent('单据类型', head[0].exp_requisition_type_desc)
      }
      if (app.isDefine(head[0].exp_requisition_number)) {
        that.appendContent('单据编号', head[0].exp_requisition_number)
      }
      if (app.isDefine(head[0].employee_code)) {
        that.appendContent('申请人', head[0].employee_code)
      }
      if (app.isDefine(head[0].requisition_date)) {
        that.appendContent('申请日期', head[0].requisition_date)
      }
      if (app.isDefine(head[0].employee_levels_desc)) {
        that.appendContent('员工层级', head[0].employee_levels_desc)
      }
      if (app.isDefine(head[0].description)) {
        that.appendContent('说明', head[0].description)
      }
      if (app.isDefine(head[0].line_number)) {
        that.appendLineContent('说明', head[0].line_number)
      }
      that.setData({
        contents: contents,
        lineList: data.line_list,
        opinionContents: data.approve_history_list
      })
    })
  },
  getReimbursementDetail: function () {
    contents = []
    var that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    fk.getReimbursementDetail(record_id, function (data) {
      wx.hideLoading()
      var head = data.head
      if (app.isDefine(head[0].exp_report_type_desc)) {
        that.appendContent('单据类型', head[0].exp_report_type_desc)
      }
      if (app.isDefine(head[0].exp_report_number)) {
        that.appendContent('单据编号', head[0].exp_report_number)
      }
      if (app.isDefine(head[0].employee_code)) {
        that.appendContent('申请人', head[0].employee_code)
      }
      if (app.isDefine(head[0].report_date)) {
        that.appendContent('申请日期', head[0].report_date)
      }
      if (app.isDefine(head[0].employee_levels_desc)) {
        that.appendContent('员工层级', head[0].employee_levels_desc)
      }
      if (app.isDefine(head[0].description)) {
        that.appendContent('说明', head[0].description)
      }
      that.setData({
        contents: contents,
        lineList: data.line_list,
        opinionContents: data.approve_history_list
      })
    })
  },
  getBookingDetail: function () {
    contents = []
    var that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    fk.getBookingDetail(record_id, function (data) {
      wx.hideLoading()
      var head = data.head
      if (app.isDefine(head[0].requisition_type_name)) {
        that.appendContent('单据类型', head[0].requisition_type_name)
      }
      if (app.isDefine(head[0].requsition_number)) {
        that.appendContent('单据编号', head[0].requsition_number)
      }
      if (app.isDefine(head[0].apply_user_name)) {
        that.appendContent('申请人', head[0].apply_user_name)
      }
      if (app.isDefine(head[0].requisition_date)) {
        that.appendContent('申请日期', head[0].requisition_date)
      }
      if (app.isDefine(head[0].description)) {
        that.appendContent('说明', head[0].description)
      }
      that.setData({
        contents: contents,
        lineList: data.line_list,
        opinionContents: data.approve_history_list
      })
    })
  },
  canBack: function(){
    var that = this
    fk.canBack(user_code, instance_id, function(data){
      that.setData({
        canBack: data
      })
    })
  },
  appendContent: function (key, value) {
    var obj = {}
    obj.key = key
    obj.value = value
    contents.push(obj)
  },
  appendLineKey: function (key) {
    var obj = {}
    obj.key = key
    line_key.push(obj)
  },
  btn_click: function (e) {
    line_index = 0
    lineContents = []
    this.setData({
      hideMask: false,
      lineContents:[]
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
      case 'line':
        this.setData({
          isApprove: false,
          isReject: false,
          isTransfer: false,
          isLine: true
        })
        line_index = e.currentTarget.dataset.index
        lineContents = this.data.lineList[line_index]
        this.setData({
          lineContents: lineContents
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
    fk.approve(user_code, record_id, this.data.approveOpinion, function (data) {
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
    fk.reject(user_code, record_id, this.data.rejectOpinion, function (data) {
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
    fk.transfer(record_id, this.data.people.user_code, this.data.transferOpinion, function (data) {
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
          fk.backInstance(user_code, instance_id, function (data) {
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