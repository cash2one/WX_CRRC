var tzUrl = 'https://appagent2.csrzic.com/10000000/public/tz/'

//获取待办事项数量
function getBacklogCount(user_code, callBack) {
  wx.request({
    method: 'GET',
    url: tzUrl + 'tz_backlog',
    data: {
      user_code: user_code,
      page_num: 0,
      page_sum: 0

    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var list = JSON.parse(res.data.list)
      callBack(list)
    }
  })
}
//获取待阅事项数量
function getMyApplyCount(user_code, callBack) {
  wx.request({
    method: 'GET',
    url: tzUrl + 'tz_myapply',
    data: {
      user_code: user_code,
      page_num: 0,
      page_sum: 0
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var list = JSON.parse(res.data.list)
      callBack(list)
    }
  })
}
//获取待办事项列表
function getBacklogList(user_code, page_num, page_sum, callBack) {
  wx.request({
    method: 'GET',
    url: tzUrl + 'tz_backlog',
    data: {
      user_code: user_code,
      page_num: page_num,
      page_sum: page_sum

    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var list = JSON.parse(res.data.list)
      callBack(list)
    }
  })
}
//获取当前申请列表
function getMyApplyList(user_code, page_num, page_sum, callBack) {
  wx.request({
    method: 'GET',
    url: tzUrl + 'tz_myapply',
    data: {
      user_code: user_code,
      page_num: page_num,
      page_sum: page_sum

    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var list = JSON.parse(res.data.list)
      callBack(list)
    }
  })
}
//获取立项申请单详情
function getLxtzDetail(record_id, callBack) {
  wx.request({
    method: 'GET',
    url: tzUrl + 'tz_lxtz_detail',
    data: {
      record_id: record_id

    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var list = JSON.parse(res.data.list)
      callBack(list)
    }
  })
}
//获取投资业务申请单详情
function getYwsqDetail(record_id, callBack) {
  wx.request({
    method: 'GET',
    url: tzUrl + 'tz_ywsq_detail',
    data: {
      record_id: record_id

    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var list = JSON.parse(res.data.list)
      callBack(list)
    }
  })
}
//获取招标申请单详情
function getZbsqDetail(record_id, callBack) {
  wx.request({
    method: 'GET',
    url: tzUrl + 'tz_zbsq_detail',
    data: {
      record_id: record_id

    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var list = JSON.parse(res.data.list)
      callBack(list)
    }
  })
}
//获取合同审批单详情
function getHtspDetail(record_id, callBack) {
  wx.request({
    method: 'GET',
    url: tzUrl + 'tz_htsp_detail',
    data: {
      record_id: record_id

    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var list = JSON.parse(res.data.list)
      callBack(list)
    }
  })
}
//获取合同变更单详情
function getHtbgDetail(record_id, callBack) {
  wx.request({
    method: 'GET',
    url: tzUrl + 'tz_htbg_detail',
    data: {
      record_id: record_id

    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var list = JSON.parse(res.data.list)
      callBack(list)
    }
  })
}
//获取发票结算单详情
function getFpjsDetail(record_id, callBack) {
  wx.request({
    method: 'GET',
    url: tzUrl + 'tz_fpjs_detail',
    data: {
      record_id: record_id

    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var list = JSON.parse(res.data.list)
      callBack(list)
    }
  })
}
//获取规划许可证单详情
function getGhxkzDetail(record_id, callBack) {
  wx.request({
    method: 'GET',
    url: tzUrl + 'tz_ghxkz_detail',
    data: {
      record_id: record_id

    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var list = JSON.parse(res.data.list)
      callBack(list)
    }
  })
}
//获取三同时预评价单详情
function getStsypjDetail(record_id, callBack) {
  wx.request({
    method: 'GET',
    url: tzUrl + 'tz_stsypj_detail',
    data: {
      record_id: record_id

    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var list = JSON.parse(res.data.list)
      callBack(list)
    }
  })
}
//获取勘探单详情
function getKtDetail(record_id, callBack) {
  wx.request({
    method: 'GET',
    url: tzUrl + 'tz_kt_detail',
    data: {
      record_id: record_id

    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var list = JSON.parse(res.data.list)
      callBack(list)
    }
  })
}
//获取施工图设计单详情
function getSgtsjDetail(record_id, callBack) {
  wx.request({
    method: 'GET',
    url: tzUrl + 'tz_sgtsj_detail',
    data: {
      record_id: record_id

    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var list = JSON.parse(res.data.list)
      callBack(list)
    }
  })
}
//获取月度资金计划单详情
function getYdzjjhDetail(record_id, callBack) {
  wx.request({
    method: 'GET',
    url: tzUrl + 'tz_ydzjjh_detail',
    data: {
      record_id: record_id

    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var list = JSON.parse(res.data.list)
      callBack(list)
    }
  })
}
//获取年度预算申请单详情
function getNdyssqDetail(record_id, callBack) {
  wx.request({
    method: 'GET',
    url: tzUrl + 'tz_ndyssq_detail',
    data: {
      record_id: record_id

    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var list = JSON.parse(res.data.list)
      callBack(list)
    }
  })
}
//获取生成工作令号所需信息
function orderNumInit(callBack) {
  wx.request({
    method: 'GET',
    url: tzUrl + 'tz_tzgzlh_init',
    data: {},
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var list = JSON.parse(res.data.list)
      callBack(list)
    }
  })
}
//根据单位编号获得立项部门
function getDept(company_code, company_short_name, callBack) {
  wx.request({
    method: 'POST',
    url: tzUrl + 'tz_tzgzlh_getdept',
    data: {
      company_code: company_code,
      company_short_name: company_short_name
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      var list = JSON.parse(res.data.list)
      callBack(list)
    }
  })
}
//生成投资工作令号
function getOrderNum(code_seg1, code_seg2, code_seg3, code_seg4, code_seg5, code_seg7, user_id, callBack) {
  wx.request({
    method: 'POST',
    url: tzUrl + 'tz_tzgzlh_getcode',
    data: {
      code_seg1: code_seg1,
      code_seg2: code_seg2,
      code_seg3: code_seg3,
      code_seg4: code_seg4,
      code_seg5: code_seg5,
      code_seg7: code_seg7,
      user_id: user_id
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      var list = JSON.parse(res.data.list)
      callBack(list)
    }
  })
}
//保存工作令号
function saveOrderNum(document_header_id, ivt_project_code, user_id, callBack) {
  wx.request({
    method: 'GET',
    url: tzUrl + 'tz_tzgzlh_save',
    data: {
      document_header_id: document_header_id,
      ivt_project_code: ivt_project_code,
      user_id: user_id
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var list = JSON.parse(res.data.list)
      callBack(list)
    }
  })
}
//同意
function approve(user_code, record_id, approve_desc, callBack) {
  wx.request({
    method: 'POST',
    url: tzUrl + 'tz_approve',
    data: {
      user_code: user_code,
      record_id: record_id,
      approve_desc: approve_desc
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      var list = JSON.parse(res.data.list)
      callBack(list)
    },
    fail: function (e) {
      wx.showToast({
        title: '网络异常',
        image: 'images/error.png'
      })
    }
  })
}
//拒绝
function reject(user_code, record_id, approve_desc, callBack) {
  wx.request({
    method: 'POST',
    url: tzUrl + 'tz_reject',
    data: {
      user_code: user_code,
      record_id: record_id,
      approve_desc: approve_desc
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      var list = JSON.parse(res.data.list)
      callBack(list)
    },
    fail: function (e) {
      wx.showToast({
        title: '网络异常',
        image: 'images/error.png'
      })
    }
  })
}
//搜索转交人
function getPeople(user_name, callBack) {
  wx.request({
    method: 'POST',
    url: tzUrl + 'tz_userlist',
    data: {
      user_name: user_name
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      var list = JSON.parse(res.data.list)
      callBack(list)
    },
    fail: function (e) {
      wx.showToast({
        title: '网络异常',
        image: 'images/error.png'
      })
    }
  })
}
//转交
function transfer(record_id, assign_to, approve_desc, callBack) {
  wx.request({
    method: 'POST',
    url: tzUrl + 'tz_assign',
    data: {
      record_id: record_id,
      assign_to: assign_to,
      approve_desc: approve_desc
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      var list = JSON.parse(res.data.list)
      callBack(list)
    },
    fail: function (e) {
      wx.showToast({
        title: '网络异常',
        image: 'images/error.png'
      })
    }
  })
}
module.exports = {
  getBacklogCount: getBacklogCount,
  getMyApplyCount: getMyApplyCount,
  getBacklogList: getBacklogList,
  getMyApplyList: getMyApplyList,
  getLxtzDetail: getLxtzDetail,
  getYwsqDetail: getYwsqDetail,
  getZbsqDetail: getZbsqDetail,
  getHtspDetail: getHtspDetail,
  getHtbgDetail: getHtbgDetail,
  getFpjsDetail: getFpjsDetail,
  getGhxkzDetail: getGhxkzDetail,
  getStsypjDetail: getStsypjDetail,
  getKtDetail: getKtDetail,
  getSgtsjDetail: getSgtsjDetail,
  getYdzjjhDetail: getYdzjjhDetail,
  getNdyssqDetail: getNdyssqDetail,
  orderNumInit: orderNumInit,
  getDept: getDept,
  getOrderNum: getOrderNum,
  saveOrderNum: saveOrderNum,
  approve: approve,
  reject: reject,
  getPeople: getPeople,
  transfer: transfer
}