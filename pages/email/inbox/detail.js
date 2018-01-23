var app = getApp()
var email = require('../interface/emailInterface.js')
var wxParse = require('../../../wxParse/wxParse.js')
var username = ''
var password = ''
var emailid = ''
Page({
  data: {
    title: '',
    sender: '',
    isShowDesc: true,
    showText: '展开详情',
    isShowFiles: true,
    showFiles: '展开附件',
    addressees: [],
    ccList: [],
    sendTime: '',
    hasFiles: false,
    fileList: []
  },
  onLoad: function (options) {
    username = wx.getStorageSync('userinfo').username
    password = wx.getStorageSync('userinfo').password
    emailid = options.emailid + '='
    this.getEmailDetail()
  },
  onUnload: function () {
    emailid = ''
  },
  getEmailDetail: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this
    email.getEmailDetail(username, password, emailid, function (data) {
      console.log(data)
      //邮件标题
      var title = data.EmailTitle
      //发件人
      var sender = data.EmailFormName
      //收件人数组
      var addressees = data.ShouJianList
      //抄送人数组
      var ccList = data.ChaoSongList
      //是否有附件
      var hasFiles = data.IsHaveFuJian;
      //附件数组
      var fileList = []
      var attachmentList = data.AttachmentList;
      if (attachmentList.length){
        for (var i = 0; i < attachmentList.length; i++){
          var file = {}
          file.id = attachmentList[i].FileId
          file.name = attachmentList[i].FileName
          file.size = attachmentList[i].FileSize
          file.type = attachmentList[i].FileType.substring(1, attachmentList[i].FileType.length)
          file.icon = that.getFileIcon(file.type.toLowerCase())
          fileList.push(file)
        }
      }
      //邮件发送时间
      var sendTime = data.PushTime;
      that.setData({
        title: title,
        sender: sender,
        addressees: addressees,
        ccList: ccList,
        sendTime: sendTime,
        hasFiles: hasFiles,
        fileList: fileList
      })
      //邮件正文
      var article = data.EmailContent
      //article = article.replace(/<\/?(html|head|title|meta|body)\b[^>]*>/ig, "")
      //article = article.substring(article.indexOf("</style>"), article.length)
      article = article.replace(/<o:p>/g, "")
      article = article.replace(/<\/o:p>/g, "")
      article = article.replace(/<!\[if/g, "<!--[if")
      article = article.replace(/supportLists\]>/g, "supportLists]-->")
      article = article.replace(/<!\[endif\]>/g, "<!--[endif]-->")
      //article = article.replace(/-21.0pt/g, "0pt")
      //article = article.replace(/-36.0pt/g, "0pt")
      article = article.replace(/-[0-9]*.[0-9]*pt/g, "0pt")
      //console.log(article)
      if (article.length >= 500000) {
        var tmp = article.substring(0, article.length / 4)
        article = article.substring(0, tmp.lastIndexOf('发件人')) + '<div style="color: #C70019; font-size: 12px; text-align: center;">温馨提示：因邮件内容过长，无法显示更多的历史内容！</div>'

      }
      wxParse.wxParse('article', 'html', article, that, 5)
      wx.hideLoading()
      // var text = data.YuanBody.replace(/<\/?(html|head|title|meta|body)\b[^>]*>/ig, "")
      // text = text.replace(/<!\[/g, "<!--[")
      // text = text.replace(/]>/g, "]-->")
      // text = text.replace(/<font face=\"Tahoma\" size=\"2\">/g, "")
      // text = text.replace(/<\/font>/g, "")
      // text = text.replace(/<o:p>/g, "")
      // text = text.replace(/<\/o:p>/g, "")
      // if (text.indexOf('<div class="WordSection1">') != -1){
      //   text = text.substring(text.indexOf('<div class="WordSection1">'), text.length)
      // }
      // if (text.indexOf('<div xmlns:xs="http://www.w3.org/2001/XMLSchema"') != -1) {
      //   text = text.substring(text.indexOf('<div xmlns:xs="http://www.w3.org/2001/XMLSchema"'), text.length)
      // }
      // that.setData({
      //   text: text
      // })
    })
  },
  showDesc: function () {
    if (this.data.isShowDesc) {
      this.setData({
        isShowDesc: false,
        showText: '隐藏详情'
      })
    } else {
      this.setData({
        isShowDesc: true,
        showText: '展开详情'
      })
    }
  },
  // showFiles: function () {
  //   if (this.data.isShowFiles) {
  //     this.setData({
  //       isShowFiles: false,
  //       showFiles: '隐藏附件'
  //     })
  //   } else {
  //     this.setData({
  //       isShowFiles: true,
  //       showFiles: '展开附件'
  //     })
  //   }
  // },
  getFileIcon: function(fileType){
    var iconSrc = ''
    switch (fileType){
      case 'doc':
      case 'docx':
        iconSrc = '../images/doc.png'
        break
      case 'xls':
      case 'xlsx':
        iconSrc = '../images/xls.png'
        break
      case 'ppt':
      case 'pptx':
        iconSrc = '../images/ppt.png'
        break
      case 'pdf':
        iconSrc = '../images/pdf.png'
        break
      case 'png':
      case 'jpg':
      case 'gif':
      case 'bmp':
      case 'jpeg':
        iconSrc = '../images/image.png'
        break
      case 'zip':
      case 'rar':
        iconSrc = '../images/zip.png'
        break
      case 'txt':
        iconSrc = '../images/txt.png'
        break
      default:
        iconSrc = '../images/other.png'
        break
    }
    return iconSrc
  },
  downloadFile: function(e){
    var that = this
    var index = e.currentTarget.dataset.index
    var fileList = that.data.fileList
    var fileName = fileList[index].name
    var fileId = fileList[index].id
    var fileType = fileList[index].type
    var fileUrl = app.emailUrl + 'filedown?username=' + username + '&pwd=' + password + '&emailid=' + emailid + '&fileId=' + fileId
    fileUrl = encodeURI(fileUrl);
    if (fileType == 'jpg' || fileType == 'png' || fileType == 'bmp' || fileType == 'jpeg' || fileType == 'gif') {
      wx.previewImage({
        urls: [
          fileUrl
        ]
      })
    } else {
      wx.showLoading({
        title: '正在打开',
        mask: true
      })
      wx.downloadFile({
        url: fileUrl,
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