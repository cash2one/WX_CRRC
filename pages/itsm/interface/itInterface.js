var itsmUrl = 'https://appagent2.csrzic.com/10000000/public/it/'
//获取 个人请求/个人待办 数量
function count(user_name, password, user_code, methodName, callBack) {
  wx.request({
    method: 'GET',
    url: itsmUrl + 'count',
    data: {
      user_name: user_name,
      password: password,
      user_code: user_code,
      methodName: methodName
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var count = res.data.ListCount
      callBack(count)
    }
  })
}
//获取 满意度 数量
function mydCount(user_name, password, user_code, callBack) {
  wx.request({
    method: 'GET',
    url: itsmUrl + 'mydCount',
    data: {
      user_name: user_name,
      password: password,
      user_code: user_code
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var count = res.data.ListCount
      callBack(count)
    }
  })
}
//获取 个人请求/个人待办 列表
function getList(user_name, password,user_code, callBack) {
  wx.request({
    method: 'GET',
    url: itsmUrl + 'getList',
    data: {
      user_name: user_name,
      password: password,
      user_code: user_code
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var list = JSON.parse(res.data.HelpDesk_QueryList_Service_RequesterResult)
      callBack(list)
    }
  })
}
//获取 满意度 列表
function getMydList(user_name, password, user_code, callBack) {
  wx.request({
    method: 'GET',
    url: itsmUrl + 'getMydList',
    data: {
      user_name: user_name,
      password: password,
      user_code: user_code
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var list = JSON.parse(res.data.Survey_QueryList_ServiceResult)
      callBack(list)
    }
  })
}
//获取 个人请求详情
function getDetail(user_name, password, IncidentNumber, callBack) {
  wx.request({
    method: 'GET',
    url: itsmUrl + 'getDetail',
    data: {
      user_name: user_name,
      password: password,
      IncidentNumber: IncidentNumber
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      callBack(res.data)
    }
  })
}
//提交个人请求
function approve(user_name, password, user_code, Description, Detailed_Decription, callBack) {
  wx.request({
    method: 'POST',
    url: itsmUrl + 'approve',
    data: {
      user_name: user_name,
      password: password,
      user_code: user_code,
      Description: Description,
      Detailed_Decription: Detailed_Decription
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      callBack(res.data.Incident_Number)
    }
  })
}
//提交满意度
function mydApprove(user_name, password, InstanceId, userComments, satisfactionRating, agreedToClose, selectSatisfaction, callBack) {
  wx.request({
    method: 'POST',
    url: itsmUrl + 'mydApprove',
    data: {
      user_name: user_name,
      password: password,
      InstanceId: InstanceId,
      userComments: userComments,
      satisfactionRating: satisfactionRating,
      agreedToClose: agreedToClose,
      selectSatisfaction: selectSatisfaction
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      callBack(res.data.Incident_Number)
    }
  })
}
module.exports = {
  count: count,
  mydCount: mydCount,
  getList: getList,
  getMydList: getMydList,
  getDetail: getDetail,
  approve: approve,
  mydApprove: mydApprove
}