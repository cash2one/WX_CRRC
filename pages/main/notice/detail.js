// detail.js
var requestUrl = getApp().globalUrl
var user_code = ''
var title = ''
var content = ''
var files = []
Page({
  data: {
    title: '',
    content: '',
    files: []
  },
  onLoad: function (options) {
    user_code = wx.getStorageSync('userinfo').username
    var newsid = options.id
    var newstype = options.type
    if (newstype == "01") {
      this.getNews(newsid)
    } else if (newstype == "03") {
      this.getNotice(newsid)
    } else if (newstype == "04") {
      this.getAnnouncement(newsid)
    }
  },
  onReady: function () {

  },
  onShow: function () {
    
  },
  onHide: function () {

  },
  onUnload: function () {
    title = ''
    content = ''
    files = []
  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  getNews: function (newsid) {
    var that = this
    wx.request({
      url: requestUrl + 'oa/oanewscontent',
      method: 'GET',
      data: {
        user_id: user_code,
        fw_id: newsid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var newsObj = JSON.parse(res.data)
        title = newsObj.fw_title
        content = that.formatData(newsObj.release_content)
        that.setData({
          title: title,
          content: content
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '服务器异常',
          image: '../../../images/error.png'
        })
      }
    })
  },
  getNotice: function (newsid) {
    var that = this
    wx.request({
      url: requestUrl + 'oa/tztbcontent',
      method: 'GET',
      data: {
        newsid: newsid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var newsObj = JSON.parse(res.data)
        var news_list = newsObj.news_list
        title = news_list[0].ctitle
        //content = that.formatData(news_list[0].ccontent)
        content = ''
        that.setData({
          title: title,
          content: content
        })
        var fileList = news_list[0].fj
        for (var i = 0; i < fileList.length; i++) {
          if (fileList[i].fj_name != '') {
            files.push(fileList[i])
          }
        }
        that.setData({
          files: files
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '服务器异常',
          image: '../../../images/error.png'
        })
      }
    })
  },
  getAnnouncement: function (newsid) {
    var that = this
    wx.request({
      url: requestUrl + 'oa/ggcontent',
      method: 'GET',
      data: {
        newsid: newsid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var newsObj = JSON.parse(res.data)
        var news_list = newsObj.news_list
        title = news_list[0].ctitle
        content = that.formatData(news_list[0].ccontent)
        that.setData({
          title: title,
          content: content
        })
        var fileList = news_list[0].fj
        if (fileList.length && fileList[0].fj_name != '') {
          that.setData({
            files: fileList
          })
        }
      },
      fail: function (e) {
        wx.showToast({
          title: '服务器异常',
          image: '../../../images/error.png'
        })
      }
    })
  },
  formatData: function (str) {
    str = str.toLowerCase()
    do {
      var tmp = str.substring(str.indexOf("<"), str.indexOf(">") + 1);
      if (tmp.substring(0, 2) == "<p" || tmp == "</p>") {
        str = str.replace(tmp, "\n")
        //str = str.replace(/\n\n/g,"\n")
      }
      str = str.replace(tmp, "")

    } while (str.indexOf("<") != -1)
    return str
  },
  oaLogin: function (e) {
    
    var that = this
    var fileurl = e.target.dataset.url
    if (fileurl.indexOf("http://") > -1) {
      fileurl = fileurl.substring(17, fileurl.length)
    } else if (fileurl.indexOf("/") > 0) {
      fileurl = "/" + fileurl
    }
    wx.request({
      url: requestUrl + 'oa/login',
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var sid = res.data.sid
        that.openFile(sid, fileurl)
      },
    })
  },
  openFile: function (sid, fileurl) {
    var url = 'https://appagent2.csrzic.com/10000000/' + sid + '/oa/tztbfile?filepath=' + fileurl
    url = encodeURI(url)
    var fileType = url.substring(url.lastIndexOf(".") + 1, url.length).toLowerCase()
    if (fileType == 'jpg' || fileType == 'png' || fileType == 'bmp' || fileType == 'jpeg' || fileType == 'gif'){
      wx.previewImage({
        urls: [
          url
        ] // 需要预览的图片http链接列表
      })
    }else{
      wx.showLoading({
        title: '正在打开',
        mask: true
      })
      wx.downloadFile({
        url: url,
        success: function (res) {
          var filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            fileType: fileType,
            success: function (res) {
              wx.hideLoading()
              console.log('打开文档成功')
            },
            fail: function (res) {
              wx.showToast({
                title: '无法打开该类型文件',
                image: '../../../images/error.png'
              })
            }
          })
        },
        fail: function (res) {
          wx.showToast({
            title: '打开失败',
            image: '../../../images/error.png'
          })
        }
      })
    }
  }
})  