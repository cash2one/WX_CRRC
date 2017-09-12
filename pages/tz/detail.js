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
    fileList:[],
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
    } else {
      this.getHistoryOpinion()
    }
  },
  getBacklogDetail: function(){
    switch (category){
      case 'PROP_OF_PROJECT':
      case 'FEASIBILITY_STUDY':
      case 'INITIAL_DESIGN':
      case 'ADJ_PROJECT':
        this.getLxtzDetail()
        break
      case 'APM_ASSET_REQ':
        this.getYwsqDetail()
    }
  },
  getLxtzDetail: function(){
    var that = this
    tz.getLxtzDetail(record_id, function (data) {
      var head = data.head
      //当前环节是否能在移动端审批
      var node_code = head[0].node_code
      if (node_code == 'PROCESSES'){
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
      if (head[0].att_list.length) {
        that.setData({
          fileList: head[0].att_list
        })
      }
      
    })
  },
  appendContent: function (key, value) {
    var obj = {}
    obj.key = key
    obj.value = value
    contents.push(obj)
  },
})