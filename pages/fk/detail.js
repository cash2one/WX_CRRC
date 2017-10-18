var app = getApp()
var fk = require('interface/fkInterface.js')
var user_code = ''
var record_id = ''
var document_header_id = ''
var category = ''
var contents = []
Page({
  data: {
    orderNum: '',
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
    contents: [],
    fileList: [],
    opinionContents: [],
    approveOpinion: '同意',
    rejectOpinion: '拒绝',
    transferOpinion: '请处理',
    people: null
  },
  onLoad: function (options) {
    user_code = wx.getStorageSync('userinfo').username
    record_id = options.instance_record_id
    category = options.workflow_category
    this.setData({
      opened: options.opened
    })
    this.changeItem(0)
  },
  onUnload: function () {
    record_id = ''
    document_header_id = ''
    category = ''
    contents = []
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
        this.getTravelDetail()
        break
      case 'PAYMENT_REQUISITION':
        this.getLoanDetail()
        break
      case 'EXP_REQUISITION':
        this.getApplicationDetail()
        break
      case 'EXP_REPORT':
        this.getReimbursementDetail()
        break
      case '414':
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
      that.setData({
        contents: contents,
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
        opinionContents: data.approve_history_list
      })
    })
  },
  getFpjsDetail: function () {
    var that = this
    fk.getFpjsDetail(record_id, function (data) {
      var head = data.head
      if (app.isDefine(head[0].exp_report_number)) {
        that.appendContent('单据编号', head[0].exp_report_number)
      }
      if (app.isDefine(head[0].exp_report_type_name)) {
        that.appendContent('单据类型', head[0].exp_report_type_name)
      }
      if (app.isDefine(head[0].name)) {
        that.appendContent('申请人', head[0].name)
      }
      if (app.isDefine(head[0].unit_name)) {
        that.appendContent('申请人部门', head[0].unit_name)
      }
      that.setData({
        contents: contents,
        opinionContents: data.approve_history_list
      })
      var fileList = JSON.parse(head[0].att_list)
      if (fileList.length) {
        that.setData({
          fileList: fileList
        })
      }
    })
  },
  getGhxkzDetail: function () {
    var that = this
    fk.getGhxkzDetail(record_id, function (data) {
      var head = data.head
      if (app.isDefine(head[0].land_use_number)) {
        that.appendContent('单据编号', head[0].land_use_number)
      }
      if (app.isDefine(head[0].document_type)) {
        that.appendContent('单据类型', head[0].document_type)
      }
      if (app.isDefine(head[0].employee_name)) {
        that.appendContent('创建人', head[0].employee_name)
      }
      if (app.isDefine(head[0].project_name)) {
        that.appendContent('项目名称', head[0].project_name)
      }
      if (app.isDefine(head[0].ivt_project_code)) {
        that.appendContent('投资工作令号', head[0].ivt_project_code)
      }
      if (app.isDefine(head[0].company_name)) {
        that.appendContent('项目承担单位', head[0].company_name)
      }
      if (app.isDefine(head[0].land_perrimition_number)) {
        that.appendContent('规划许可证号', head[0].land_perrimition_number)
      }
      if (app.isDefine(head[0].perrimition_operator_name)) {
        that.appendContent('经办人', head[0].perrimition_operator_name)
      }
      if (app.isDefine(head[0].perrimition_date)) {
        that.appendContent('办理日期', head[0].perrimition_date)
      }
      if (app.isDefine(head[0].landright_number)) {
        that.appendContent('土地权证号', head[0].landright_number)
      }
      if (app.isDefine(head[0].landright_operator_name)) {
        that.appendContent('经办人', head[0].landright_operator_name)
      }
      if (app.isDefine(head[0].landright_date)) {
        that.appendContent('办理日期', head[0].landright_date)
      }
      if (app.isDefine(head[0].landright_company_name)) {
        that.appendContent('所属单位', head[0].landright_company_name)
      }
      if (app.isDefine(head[0].land_location)) {
        that.appendContent('土地坐落', head[0].land_location)
      }
      if (app.isDefine(head[0].land_use_code)) {
        that.appendContent('土地使用用途', head[0].land_use_code)
      }
      if (app.isDefine(head[0].land_acquisition_code)) {
        that.appendContent('土地获取方式', head[0].land_acquisition_code)
      }
      if (app.isDefine(head[0].land_use_area)) {
        that.appendContent('土地使用面积', head[0].land_use_area)
      }
      if (app.isDefine(head[0].useful_life)) {
        that.appendContent('使用年限', head[0].useful_life)
      }
      that.setData({
        contents: contents,
        opinionContents: data.approve_history_list
      })
      var fileList1 = JSON.parse(head[0].att_list1)
      var fileList2 = JSON.parse(head[0].att_list2)
      var fileList = []
      if (fileList1.length) {
        for (var i in fileList1) {
          fileList.push(fileList1[i])
        }
      }
      if (fileList2.length) {
        for (var i in fileList2) {
          fileList.push(fileList2[i])
        }
      }
      if (fileList.length) {
        that.setData({
          fileList: fileList
        })
      }
    })
  },
  getStsypjDetail: function () {
    var that = this
    fk.getStsypjDetail(record_id, function (data) {
      var head = data.head
      if (app.isDefine(head[0].three_simultaneous_number)) {
        that.appendContent('单据编号', head[0].three_simultaneous_number)
      }
      if (app.isDefine(head[0].document_type)) {
        that.appendContent('单据类型', head[0].document_type)
      }
      if (app.isDefine(head[0].employee_name)) {
        that.appendContent('创建人', head[0].employee_name)
      }
      if (app.isDefine(head[0].position_name)) {
        that.appendContent('岗位', head[0].position_name)
      }
      if (app.isDefine(head[0].project_name)) {
        that.appendContent('项目名称', head[0].project_name)
      }
      if (app.isDefine(head[0].ivt_project_code)) {
        that.appendContent('投资工作令号', head[0].ivt_project_code)
      }
      if (app.isDefine(head[0].company_name)) {
        that.appendContent('项目承担单位', head[0].company_name)
      }
      that.setData({
        contents: contents,
        opinionContents: data.approve_history_list
      })
    })
  },
  getKtDetail: function () {
    var that = this
    fk.getKtDetail(record_id, function (data) {
      var head = data.head
      if (app.isDefine(head[0].exploration_number)) {
        that.appendContent('单据编号', head[0].exploration_number)
      }
      if (app.isDefine(head[0].document_type)) {
        that.appendContent('单据类型', head[0].document_type)
      }
      if (app.isDefine(head[0].document_number)) {
        that.appendContent('勘探报告编号', head[0].document_number)
      }
      if (app.isDefine(head[0].employee_name)) {
        that.appendContent('创建人', head[0].employee_name)
      }
      if (app.isDefine(head[0].position_name)) {
        that.appendContent('岗位', head[0].position_name)
      }
      if (app.isDefine(head[0].project_name)) {
        that.appendContent('项目名称', head[0].project_name)
      }
      if (app.isDefine(head[0].ivt_project_code)) {
        that.appendContent('投资工作令号', head[0].ivt_project_code)
      }
      if (app.isDefine(head[0].company_name)) {
        that.appendContent('项目承担单位', head[0].company_name)
      }
      if (app.isDefine(head[0].exploration_unit)) {
        that.appendContent('勘探实施单位', head[0].exploration_unit)
      }
      if (app.isDefine(head[0].completetion_date)) {
        that.appendContent('完成日期', head[0].completetion_date)
      }
      that.setData({
        contents: contents,
        opinionContents: data.approve_history_list
      })
      var fileList = JSON.parse(head[0].att_list)
      if (fileList.length) {
        that.setData({
          fileList: fileList
        })
      }
    })
  },
  getSgtsjDetail: function () {
    var that = this
    fk.getSgtsjDetail(record_id, function (data) {
      var head = data.head
      if (app.isDefine(head[0].design_number)) {
        that.appendContent('单据编号', head[0].design_number)
      }
      if (app.isDefine(head[0].document_type)) {
        that.appendContent('单据类型', head[0].document_type)
      }
      if (app.isDefine(head[0].name)) {
        that.appendContent('创建人', head[0].name)
      }
      if (app.isDefine(head[0].position_name)) {
        that.appendContent('岗位', head[0].position_name)
      }
      if (app.isDefine(head[0].project_name)) {
        that.appendContent('项目名称', head[0].project_name)
      }
      if (app.isDefine(head[0].ivt_project_code)) {
        that.appendContent('投资工作令号', head[0].ivt_project_code)
      }
      if (app.isDefine(head[0].company_name)) {
        that.appendContent('项目承担单位', head[0].company_name)
      }
      if (app.isDefine(head[0].construction_design_company)) {
        that.appendContent('设计单位', head[0].construction_design_company)
      }
      if (app.isDefine(head[0].completetion_date)) {
        that.appendContent('完成日期', head[0].completetion_date)
      }
      that.setData({
        contents: contents,
        opinionContents: data.approve_history_list
      })
      var fileList = JSON.parse(head[0].att_list)
      if (fileList.length) {
        that.setData({
          fileList: fileList
        })
      }
    })
  },
  getYdzjjhDetail: function () {
    var that = this
    fk.getYdzjjhDetail(record_id, function (data) {
      var head = data.head
      if (app.isDefine(head[0].exp_requisition_number)) {
        that.appendContent('单据编号', head[0].exp_requisition_number)
      }
      if (app.isDefine(head[0].bgt_req_type_name)) {
        that.appendContent('单据类型', head[0].bgt_req_type_name)
      }
      if (app.isDefine(head[0].name)) {
        that.appendContent('申请人', head[0].name)
      }
      if (app.isDefine(head[0].requisition_date)) {
        that.appendContent('申请日期', head[0].requisition_date)
      }
      if (app.isDefine(head[0].currency_code)) {
        that.appendContent('币种', head[0].currency_code)
      }
      if (app.isDefine(head[0].exchange_rate)) {
        that.appendContent('汇率', head[0].exchange_rate)
      }
      that.setData({
        contents: contents,
        opinionContents: data.approve_history_list
      })
      var fileList = JSON.parse(head[0].att_list)
      if (fileList.length) {
        that.setData({
          fileList: fileList
        })
      }
    })
  },
  getNdyssqDetail: function () {
    var that = this
    fk.getNdyssqDetail(record_id, function (data) {
      var head = data.head
      if (app.isDefine(head[0].bgt_requisition_number)) {
        that.appendContent('单据编号', head[0].bgt_requisition_number)
      }
      if (app.isDefine(head[0].bgt_req_type_name)) {
        that.appendContent('单据类型', head[0].bgt_req_type_name)
      }
      if (app.isDefine(head[0].name)) {
        that.appendContent('申请人', head[0].name)
      }
      if (app.isDefine(head[0].unit_name)) {
        that.appendContent('申请部门', head[0].unit_name)
      }
      if (app.isDefine(head[0].year_total_amount)) {
        that.appendContent('年度付款总额', head[0].year_total_amount)
      }
      that.setData({
        contents: contents,
        opinionContents: data.approve_history_list
      })
    })
  },
  appendContent: function (key, value) {
    var obj = {}
    obj.key = key
    obj.value = value
    contents.push(obj)
  },
  openFile: function (e) {
    var that = this
    var fileid = e.target.dataset.fileid
    var filename = e.target.dataset.filename
    var fileType = filename.substring(filename.indexOf('.') + 1, filename.length)
    var docurl = app.tzUrl + 'tz_filedown?attach_id=' + fileid + '&file_name=' + filename;
    docurl = encodeURI(docurl);
    if (fileType == 'jpg' || fileType == 'png' || fileType == 'bmp' || fileType == 'jpeg' || fileType == 'gif') {
      wx.previewImage({
        urls: [
          docurl
        ]
      })
    } else {
      wx.showLoading({
        title: '正在打开',
        mask: true
      })
      wx.downloadFile({
        url: docurl,
        success: function (res) {
          var filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            fileType: fileType,
            success: function (res) {
              wx.hideLoading()
              console.log('打开文档成功')
            },
            fail: function (res) {
              wx.showToast({
                title: '无法打开该类型文件',
                image: '../../../images/error.png'
              })
            }
          })
        },
        fail: function (res) {
          wx.showToast({
            title: '打开失败',
            image: '../../../images/error.png'
          })
        }
      })
    }
  },
  btn_click: function (e) {
    this.setData({
      hideMask: false
    })
    var btnType = e.target.dataset.type
    switch (btnType) {
      case 'approve':
        this.setData({
          isApprove: true,
          isReject: false,
          isTransfer: false
        })
        break
      case 'reject':
        this.setData({
          isApprove: false,
          isReject: true,
          isTransfer: false
        })
        break
      case 'transfer':
        this.setData({
          isApprove: false,
          isReject: false,
          isTransfer: true
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
  generateOrderNum: function () {
    wx.navigateTo({
      url: './orderNum?document_header_id=' + document_header_id
    })
  },
  getOrderNum: function () {
    var orderNum = wx.getStorageSync("orderNum")
    this.setData({
      orderNum: orderNum
    })
    wx.removeStorageSync('orderNum')
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