var itsmUrl = 'https://appagent2.csrzic.com/10000000/public/itsm/'
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
//获取 个人请求/个人待办 列表
function getList(user_name, password,user_code,methodName, callBack) {
  wx.request({
    method: 'GET',
    url: itsmUrl + 'getList',
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
      var list = res.data.getListValues
      callBack(list)
    }
  })
}
//提交个人请求
function approve(user_name, password, Login_ID, Description, Detailed_Decription, callBack) {
  wx.request({
    method: 'POST',
    url: itsmUrl + 'approve',
    data: {
      user_name: user_name,
      password: password,
      Login_ID: Login_ID,
      Description: Description,
      Detailed_Decription: Detailed_Decription,
      Service_Type: '1',
      Impact: '4000',
      Urgency: '2000',
      Reported_Source: '4200',
      z1D_Action: 'CREATE'
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      //console.log(res.data)
      callBack(res.data.Incident_Number)
    }
  })
}
module.exports = {
  count: count,
  getList: getList,
  approve: approve
}