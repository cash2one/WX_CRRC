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
//获取立项调整单据详情
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
module.exports = {
  getBacklogCount: getBacklogCount,
  getMyApplyCount: getMyApplyCount,
  getBacklogList: getBacklogList,
  getMyApplyList: getMyApplyList,
  getLxtzDetail: getLxtzDetail
}