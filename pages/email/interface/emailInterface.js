var emailUrl = 'https://appagent2.csrzic.com/10000000/public/email/'

//获取待办事项列表
function getFolders(username, password, callBack) {
  wx.request({
    method: 'GET',
    url: emailUrl + 'GetFoldersHandler',
    data: {
      username: username,
      pwd: password
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var list = res.data
      callBack(list)
    },
    fail: function (e) {
      wx.showToast({
        title: '网络异常',
        image: '../../../images/error.png'
      })
    }
  })
}
//获取邮件列表
function getEmailList(username, password, folderId, pageIndex, pageSize, callBack) {
  wx.request({
    method: 'GET',
    url: emailUrl + 'GetEmailList',
    data: {
      username: username,
      pwd: password,
      folderId: folderId,
      pageIndex: pageIndex,
      pageSize: pageSize
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var list = res.data
      callBack(list)
    },
    fail: function (e) {
      wx.showToast({
        title: '网络异常',
        image: '../../../images/error.png'
      })
    }
  })
}
//邮件详情
function getEmailDetail(username, password, emailid, callBack) {
  wx.request({
    method: 'GET',
    url: emailUrl + 'GetEmailDetailByIdHandler',
    data: {
      username: username,
      pwd: password,
      emailid: emailid
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var list = res.data
      callBack(list)
    },
    fail: function (e) {
      wx.showToast({
        title: '网络异常',
        image: '../../../images/error.png'
      })
    }
  })
}

module.exports = {
  getFolders: getFolders,
  getEmailList: getEmailList,
  getEmailDetail: getEmailDetail
}