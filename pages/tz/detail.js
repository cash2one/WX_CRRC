var app = getApp()
var tz = require('interface/tzInterface.js')
var record_id = ''
var category = ''
var contents = []
Page({
  data: {
    switchTitle: [
      '详细信息',
      '审批进度'
    ],
    switchCurrent: 0,
    contents: [],
    fileList: [],
    opinionContents: [],
    isCanApprove: true
  },
  onLoad: function (options) {
    record_id = options.instance_record_id
    category = options.workflow_category
    this.changeItem(0)
  },
  onUnload: function () {
    record_id = ''
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
      case 'PROP_OF_PROJECT':
      case 'FEASIBILITY_STUDY':
      case 'INITIAL_DESIGN':
      case 'ADJ_PROJECT':
        this.getLxtzDetail()
        break
      case 'APM_ASSET_REQ':
        this.getYwsqDetail()
        break
      case 'BDM_BIDDING_REQ':
        this.getZbsqDetail()
        break
      case 'CON_CONTRACT':
        this.getHtspDetail()
        break
      case 'CON_CONTRACT_ADJ':
        this.getHtbgDetail()
        break
      case 'EXP_REPORT':
        this.getFpjsDetail()
        break
      case 'PRS_LAND_USER_CFT':
        this.getGhxkzDetail()
        break
      case 'PRS_THRESS_SIMULTANEOUS':
        this.getStsypjDetail()
        break
      case 'PRS_EXPLORATION':
        this.getKtDetail()
        break
      case 'PRS_CONSTRUCTION':
        this.getSgtsjDetail()
        break
      case 'EXP_REQUISITION':
        this.getYdzjjhDetail()
        break
      case 'BGT_REQUISITION':
        this.getNdyssqDetail()
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
  getLxtzDetail: function () {
    var that = this
    tz.getLxtzDetail(record_id, function (data) {
      var head = data.head
      //当前环节是否能在移动端审批
      var node_code = head[0].node_code
      if (node_code == 'PROCESSES') {
        that.setData({
          isCanApprove: false
        })
      }
      if (app.isDefine(head[0].document_number)) {
        that.appendContent('单据编号', head[0].document_number)
      }
      if (app.isDefine(head[0].req_type_name)) {
        that.appendContent('单据类型', head[0].req_type_name)
      }
      if (app.isDefine(head[0].name)) {
        that.appendContent('申请人', head[0].name)
      }
      if (app.isDefine(head[0].unit_name)) {
        that.appendContent('申请人部门', head[0].unit_name)
      }
      if (app.isDefine(head[0].project_name)) {
        that.appendContent('项目名称', head[0].project_name)
      }
      if (app.isDefine(head[0].prj_nature_desc)) {
        that.appendContent('项目属性', head[0].prj_nature_desc)
      }
      if (app.isDefine(head[0].company_name)) {
        that.appendContent('项目承担单位', head[0].company_name)
      }
      if (app.isDefine(head[0].project_principal_name)) {
        that.appendContent('项目负责人', head[0].project_principal_name)
      }
      if (app.isDefine(head[0].prj_start_date_plan)) {
        that.appendContent('计划开始时间', head[0].prj_start_date_plan)
      }
      if (app.isDefine(head[0].prj_end_date_plan)) {
        that.appendContent('计划结束时间', head[0].prj_end_date_plan)
      }
      if (app.isDefine(head[0].currency_code)) {
        that.appendContent('币种', head[0].currency_code)
      }
      if (app.isDefine(head[0].total_investment_amount)) {
        that.appendContent('总投资额', head[0].total_investment_amount)
      }
      if (app.isDefine(head[0].initial_working_capital)) {
        that.appendContent('铺底流动资金', head[0].initial_working_capital)
      }
      that.setData({
        contents: contents,
        opinionContents: data.approve_history_list
      })
    })
  },
  getYwsqDetail: function () {
    var that = this
    tz.getYwsqDetail(record_id, function (data) {
      var head = data.head
      if (app.isDefine(head[0].apm_asset_req_number)) {
        that.appendContent('单据编号', head[0].apm_asset_req_number)
      }
      if (app.isDefine(head[0].asset_requisition_type_desc)) {
        that.appendContent('单据类型', head[0].asset_requisition_type_desc)
      }
      if (app.isDefine(head[0].employee_name)) {
        that.appendContent('申请人', head[0].employee_name)
      }
      if (app.isDefine(head[0].unit_name)) {
        that.appendContent('申请人部门', head[0].unit_name)
      }
      if (app.isDefine(head[0].requisition_date)) {
        that.appendContent('申请日期', head[0].requisition_date)
      }
      if (app.isDefine(head[0].project_name)) {
        that.appendContent('项目名称', head[0].project_name)
      }
      if (app.isDefine(head[0].ivt_project_code)) {
        that.appendContent('投资工作令号', head[0].ivt_project_code)
      }
      if (app.isDefine(head[0].currency_code)) {
        that.appendContent('币种', head[0].currency_code)
      }
      if (app.isDefine(head[0].requisition_functional_amount)) {
        that.appendContent('总金额', head[0].requisition_functional_amount)
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
  getZbsqDetail: function () {
    var that = this
    tz.getZbsqDetail(record_id, function (data) {
      var head = data.head
      if (app.isDefine(head[0].project_bid_req_number)) {
        that.appendContent('单据编号', head[0].project_bid_req_number)
      }
      if (app.isDefine(head[0].bidding_req_type_desc)) {
        that.appendContent('单据类型', head[0].bidding_req_type_desc)
      }
      if (app.isDefine(head[0].employee_name)) {
        that.appendContent('申请人', head[0].employee_name)
      }
      if (app.isDefine(head[0].unit_name)) {
        that.appendContent('申请人部门', head[0].unit_name)
      }
      if (app.isDefine(head[0].project_name)) {
        that.appendContent('项目名称', head[0].project_name)
      }
      if (app.isDefine(head[0].ivt_project_code)) {
        that.appendContent('投资工作令号', head[0].ivt_project_code)
      }
      if (app.isDefine(head[0].avoid_bidding_type_desc)) {
        that.appendContent('免招标类型', head[0].avoid_bidding_type_desc)
      }
      if (app.isDefine(head[0].description)) {
        that.appendContent('说明', head[0].description)
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
  getHtspDetail: function () {
    var that = this
    tz.getHtspDetail(record_id, function (data) {
      var head = data.head
      if (app.isDefine(head[0].contract_number)) {
        that.appendContent('合同编号', head[0].contract_number)
      }
      if (app.isDefine(head[0].contract_type_desc)) {
        that.appendContent('合同类型', head[0].contract_type_desc)
      }
      if (app.isDefine(head[0].document_number)) {
        that.appendContent('合同号', head[0].document_number)
      }
      if (app.isDefine(head[0].document_desc)) {
        that.appendContent('合同名称', head[0].document_desc)
      }
      if (app.isDefine(head[0].con_employee_name)) {
        that.appendContent('申请人', head[0].con_employee_name)
      }
      if (app.isDefine(head[0].con_unit_name)) {
        that.appendContent('申请人部门', head[0].con_unit_name)
      }
      if (app.isDefine(head[0].partner_code)) {
        that.appendContent('供应商', head[0].partner_code)
      }
      if (app.isDefine(head[0].document_date)) {
        that.appendContent('签订日期', head[0].document_date)
      }
      if (app.isDefine(head[0].start_date)) {
        that.appendContent('起始日期', head[0].start_date)
      }
      if (app.isDefine(head[0].end_date)) {
        that.appendContent('终止日期', head[0].end_date)
      }
      if (app.isDefine(head[0].currency_code)) {
        that.appendContent('币种', head[0].currency_code)
      }
      if (app.isDefine(head[0].amount)) {
        that.appendContent('总金额', head[0].amount)
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
  getHtbgDetail: function () {
    var that = this
    tz.getHtbgDetail(record_id, function (data) {
      var head = data.head
      if (app.isDefine(head[0].con_adj_number)) {
        that.appendContent('变更单号', head[0].con_adj_number)
      }
      if (app.isDefine(head[0].con_adj_type_desc)) {
        that.appendContent('变更单类型', head[0].con_adj_type_desc)
      }
      if (app.isDefine(head[0].contract_number)) {
        that.appendContent('合同编号', head[0].contract_number)
      }
      if (app.isDefine(head[0].contract_type_desc)) {
        that.appendContent('合同类型', head[0].contract_type_desc)
      }
      if (app.isDefine(head[0].document_number)) {
        that.appendContent('合同号', head[0].document_number)
      }
      if (app.isDefine(head[0].document_desc)) {
        that.appendContent('合同名称', head[0].document_desc)
      }
      if (app.isDefine(head[0].con_employee_name)) {
        that.appendContent('申请人', head[0].con_employee_name)
      }
      if (app.isDefine(head[0].con_unit_name)) {
        that.appendContent('申请人部门', head[0].con_unit_name)
      }
      if (app.isDefine(head[0].partner_code)) {
        that.appendContent('供应商', head[0].partner_code)
      }
      if (app.isDefine(head[0].document_date)) {
        that.appendContent('签订日期', head[0].document_date)
      }
      if (app.isDefine(head[0].start_date)) {
        that.appendContent('起始日期', head[0].start_date)
      }
      if (app.isDefine(head[0].end_date)) {
        that.appendContent('终止日期', head[0].end_date)
      }
      if (app.isDefine(head[0].amount)) {
        that.appendContent('本币金额', head[0].amount)
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
  getFpjsDetail: function () {
    var that = this
    tz.getFpjsDetail(record_id, function (data) {
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
    tz.getGhxkzDetail(record_id, function (data) {
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
    tz.getStsypjDetail(record_id, function (data) {
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
    tz.getKtDetail(record_id, function (data) {
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
    tz.getSgtsjDetail(record_id, function (data) {
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
    tz.getYdzjjhDetail(record_id, function (data) {
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
    tz.getNdyssqDetail(record_id, function (data) {
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
  }
})