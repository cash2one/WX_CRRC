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
module.exports = {
  count: count,
  getList: getList
}