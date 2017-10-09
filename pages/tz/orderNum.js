var tz = require('interface/tzInterface.js')
var user_code = ''
var document_header_id = ''
Page({
  data: {
    job_attributes: '',
    unit_number_index: 0,
    unit_number: [],
    project_dept_index: 0,
    project_dept: [{ "code_value": "-1", "code_value_name": "请选择立项部门" }],
    investment_category_index: 0,
    investment_category: [],
    project_year_index: 0,
    project_year: [],
    statistical_classification_index: 0,
    statistical_classification: [],
    btnStatus: 'disabled'
  },
  onLoad: function (options) {
    document_header_id = options.document_header_id
    user_code = wx.getStorageSync('userinfo').username
    this.orderNumInit()
  },
  onUnload: function () {
    document_header_id = ''
  },
  orderNumInit: function () {
    var that = this
    tz.orderNumInit(function (data) {
      if (data.status == 0) {
        var init_data = data.init_data
        var job_attributes = that.getValueByKey('type_code', 'PROJECT_SEG4', 'code_value', init_data)
        that.setData({
          job_attributes: job_attributes
        })
        var unit_list = that.getArrByKey('type_code', 'COMPANY', init_data)
        var unit_number = [];
        if (unit_list.length) {
          unit_number.push({ "code_value": "-1", "code_value_name": "请选择单位编号" })
          for (var i in unit_list) {
            unit_number.push({ "code_value": unit_list[i].code_value, "code_value_name": unit_list[i].code_value_name })
          }
          that.setData({
            unit_number: unit_number
          })
        }
        var category_list = that.getArrByKey('type_code', 'INVEST_CATEGORY', init_data)
        var investment_category = [];
        if (category_list.length) {
          investment_category.push({ "code_value": "-1", "code_value_name": "请选择投资类别" })
          for (var i in category_list) {
            investment_category.push({ "code_value": category_list[i].code_value, "code_value_name": category_list[i].code_value_name })
          }
          that.setData({
            investment_category: investment_category
          })
        }
        var project_year_list = that.getArrByKey('type_code', 'YEAR', init_data)
        var project_year = [];
        if (project_year_list.length) {
          project_year.push({ "code_value": "-1", "code_value_name": "请选择立项年度" })
          for (var i in project_year_list) {
            project_year.push({ "code_value": project_year_list[i].code_value, "code_value_name": project_year_list[i].code_value_name })
          }
          that.setData({
            project_year: project_year
          })
        }
        var statistical_classification_list = that.getArrByKey('type_code', 'PROJECT_SEG7', init_data)
        var statistical_classification = [];
        if (statistical_classification_list.length) {
          statistical_classification.push({ "code_value": "-1", "code_value_name": "请选择统计分类" })
          for (var i in statistical_classification_list) {
            statistical_classification.push({ "code_value": statistical_classification_list[i].code_value, "code_value_name": statistical_classification_list[i].code_value_name })
          }
          that.setData({
            statistical_classification: statistical_classification
          })
        }
      }
    })
  },
  unitNumberChange: function(e){
    var that = this
    var index = e.detail.value
    if (this.data.unit_number_index != index) {
      this.setData({
        project_dept_index: 0,
        project_dept: [{ "code_value": "-1", "code_value_name": "请选择立项部门" }]
      })
    }
    that.setData({
      unit_number_index: index
    })
    this.checkData()
    var company_code = that.data.unit_number[index].code_value
    var company_short_name = that.data.unit_number[index].code_value_name
    tz.getDept(company_code, company_short_name, function(data){
      if (data.status == 0) {
        var project_dept_list = data.init_data
        var project_dept = []
        if (project_dept_list.length) {
          project_dept.push({ "code_value": "-1", "code_value_name": "请选择立项部门"})
          for (var i in project_dept_list) {
            project_dept.push({ "code_value": project_dept_list[i].prj_unit_code, "code_value_name": project_dept_list[i].prj_unit_desc })
          }
          that.setData({
            project_dept: project_dept
          })
        }
      }
    })
  },
  btnClick: function(){
    var that = this
    wx.showLoading({
      title: '正在保存',
      mask: true
    })
    var code_seg1 = that.data.job_attributes
    var code_seg2 = that.data.unit_number[that.data.unit_number_index].code_value
    var code_seg3 = that.data.investment_category[that.data.investment_category_index].code_value
    var code_seg4 = that.data.project_year[that.data.project_year_index].code_value
    var code_seg5 = that.data.project_dept[that.data.project_dept_index].code_value
    var code_seg7 = that.data.statistical_classification[that.data.statistical_classification_index].code_value
    tz.getOrderNum(code_seg1, code_seg2, code_seg3, code_seg4, code_seg5, code_seg7, user_code, function(data){
      var orderNum = data.status
      //保存工作令号
      tz.saveOrderNum(document_header_id, orderNum, user_code, function(data){
        wx.hideLoading()
        if(data.status == 0){
          wx.setStorageSync('orderNum', orderNum);
          var prePage = getCurrentPages()[2]
          prePage.getOrderNum()
          wx.navigateBack({
            delta: 1
          })
        }
      })

    })
  },
  checkData: function(){
    if (this.data.unit_number_index == 0 || this.data.project_dept_index == 0 || this.data.investment_category_index == 0 || this.data.project_year_index == 0 || this.data.statistical_classification_index == 0){
      this.setData({
        btnStatus: 'disabled'
      })
    }
    if (this.data.unit_number_index != 0 && this.data.project_dept_index != 0 && this.data.investment_category_index != 0 && this.data.project_year_index != 0 && this.data.statistical_classification_index != 0) {
      this.setData({
        btnStatus: ''
      })
    }
  },
  projectDeptChange: function(e){
    this.setData({
      project_dept_index: e.detail.value
    })
    this.checkData()
  },
  investmentCategoryChange: function(e){
    this.setData({
      investment_category_index: e.detail.value
    })
    this.checkData()
  },
  projectYearChange: function(e){
    this.setData({
      project_year_index: e.detail.value
    })
    this.checkData()
  },
  statisticalClassificationChange: function(e){
    this.setData({
      statistical_classification_index: e.detail.value
    })
    this.checkData()
  },
  getValueByKey: function (key, value, rekey, arr) {
    if (arr.length) {
      for (var i in arr) {
        if (arr[i][key] == value) {
          return arr[i][rekey]
        } else {
          continue;
        }
      }
    }
    else {
      return '暂无信息'
    }
  },
  getArrByKey: function (key, value, array) {
    var arr = [];
    if (array.length > 0) {
      for (var i in array) {
        if (array[i][key] == value) {
          arr.push(array[i]);
        }
      }
    }
    return arr;
  }
})