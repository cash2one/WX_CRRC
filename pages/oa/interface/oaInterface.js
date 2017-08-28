var oaUrl = 'https://appagent2.csrzic.com/10000000/public/oaNew/'

//获取待办事项数量
function getBacklogCount(user_id, callBack) {
  wx.request({
    method: 'GET',
    url: oaUrl + 'oa_count',
    data: {
      user_id: user_id
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var list = JSON.parse(res.data)
      callBack(list)
    }
  })
}
//获取待阅事项数量
function getToReadCount(user_id, callBack) {
  wx.request({
    method: 'GET',
    url: oaUrl + 'oa_toread_list',
    data: {
      user_id: user_id,
      pageNum: 1,
      pageSum: 1
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
function getBacklogList(user_id, bu_code, pageNum, pageSum, callBack) {
  wx.request({
    method: 'GET',
    url: oaUrl + 'oa_manager',
    data: {
      user_id: user_id,
      bu_code: bu_code,
      pageNum: pageNum,
      pageSum: pageSum
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      wx.hideLoading()
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
//获取待阅事项列表
function getToReadList(user_id, pageNum, pageSum, callBack) {
  wx.request({
    method: 'GET',
    url: oaUrl + 'oa_toread_list',
    data: {
      user_id: user_id,
      pageNum: pageNum,
      pageSum: pageSum
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      wx.hideLoading()
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
//获取已阅事项列表
function getReadedList(user_id, pageNum, pageSum, callBack) {
  wx.request({
    method: 'GET',
    url: oaUrl + 'oa_readedlist',
    data: {
      user_id: user_id,
      pageNum: pageNum,
      pageSum: pageSum
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      wx.hideLoading()
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
//获取待办事项详情
function getBacklogDetail(user_id, fw_id, bu_code, callBack) {
  wx.request({
    method: 'GET',
    url: oaUrl + 'oa_manager_detail',
    data: {
      user_id: user_id,
      fw_id: fw_id,
      bu_code: bu_code
    },
    header: {
      'content-type': 'application/json'
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
//获取待办事项历史审批
function getHistoryOpinion(user_id, fw_id, bu_code, callBack) {
  wx.request({
    method: 'GET',
    url: oaUrl + 'oa_historyopinion',
    data: {
      user_id: user_id,
      fw_id: fw_id,
      bu_code: bu_code
    },
    header: {
      'content-type': 'application/json'
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
//获取审批环节信息
function getApproveInfo(user_id, fw_id, bu_code, callBack) {
  wx.request({
    method: 'GET',
    url: oaUrl + 'oa_manager_approveinfo',
    data: {
      user_id: user_id,
      fw_id: fw_id,
      bu_code: bu_code
    },
    header: {
      'content-type': 'application/json'
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
  getToReadCount: getToReadCount,
  getBacklogList: getBacklogList,
  getToReadList: getToReadList,
  getReadedList: getReadedList,
  getBacklogDetail: getBacklogDetail,
  getHistoryOpinion: getHistoryOpinion,
  getApproveInfo: getApproveInfo
}