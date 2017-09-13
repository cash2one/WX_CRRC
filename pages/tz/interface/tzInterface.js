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
  getNdyssqDetail: getNdyssqDetail
}