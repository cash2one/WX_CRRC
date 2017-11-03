var fkUrl = 'https://appagent2.csrzic.com/10000000/public/fk/'
var slptUrl = 'https://appagent2.csrzic.com/10000000/public/slpt/'
//获取待办事项数量
function getBacklogCount(user_code, callBack) {
  wx.request({
    method: 'GET',
    url: fkUrl + 'fklist',
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
//获取当前申请数量
function getMyApplyCount(user_code, callBack) {
  wx.request({
    method: 'GET',
    url: fkUrl + 'fk_myapply',
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
    url: fkUrl + 'fklist',
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
    url: fkUrl + 'fk_myapply',
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
//获取差旅报销单详情
function getTravelDetail(record_id, callBack) {
  wx.request({
    method: 'GET',
    url: fkUrl + 'fk_cn_detail',
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
//获取借款申请单详情
function getLoanDetail(record_id, callBack) {
  wx.request({
    method: 'GET',
    url: fkUrl + 'fk_dwyz_detail',
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
//获取费用申请单详情
function getApplicationDetail(record_id, callBack) {
  wx.request({
    method: 'GET',
    url: fkUrl + 'fk_dz_detail',
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
//获取费用报销单详情
function getReimbursementDetail(record_id, callBack) {
  wx.request({
    method: 'GET',
    url: fkUrl + 'fk_fy_detail',
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
//获取机票申请单详情
function getBookingDetail(record_id, callBack) {
  wx.request({
    method: 'GET',
    url: fkUrl + 'fk_dp_detail',
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
//是否可以收回
function canBack(user_code, instance_id, callBack) {
  wx.request({
    method: 'GET',
    url: slptUrl + 'canBack',
    data: {
      user_code: user_code,
      instance_id: instance_id
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var status = JSON.parse(res.data).status
      callBack(status)
    }
  })
}
//收回单据
function backInstance(user_code, instance_id, callBack) {
  wx.request({
    method: 'GET',
    url: slptUrl + 'backInstance',
    data: {
      user_code: user_code,
      instance_id: instance_id
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var status = JSON.parse(res.data).status
      callBack(status)
    }
  })
}
//同意
function approve(user_code, record_id, approve_desc, callBack) {
  wx.request({
    method: 'POST',
    url: fkUrl + 'fk_approve',
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
    url: fkUrl + 'fk_reject',
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
    url: fkUrl + 'fk_userlist',
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
    url: fkUrl + 'fk_assign',
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
  getTravelDetail: getTravelDetail,
  getLoanDetail: getLoanDetail,
  getApplicationDetail: getApplicationDetail,
  getReimbursementDetail: getReimbursementDetail,
  getBookingDetail: getBookingDetail,
  canBack: canBack,
  backInstance: backInstance,
  approve: approve,
  reject: reject,
  getPeople: getPeople,
  transfer: transfer
}