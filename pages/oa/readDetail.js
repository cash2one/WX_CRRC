var app = getApp()
//引用OA接口文件
var oa = require('interface/oaInterface.js')
//定义相关全局变量
var user_code = ''
var unid = ''
var read_unid = ''
var bu_code = ''
var contents = []
Page({
  data: {
    fw_id: '',
    sphj_isdistribution: '0',
    sphj_isdistributionopinion: '0',
    contents: [],
    fileList: []
  },
  onLoad: function (options) {
    user_code = wx.getStorageSync('userinfo').username
    unid = options.unid
    read_unid = options.read_unid
    bu_code = options.bu_code
    this.getDetail()
  },
  onUnload: function () {
    unid = ''
    read_unid = ''
    bu_code = ''
    contents = []
    var prePage = getCurrentPages()[1]
    prePage.onPullDownRefresh()
  },
  getDetail: function(){
    var that = this
    oa.getReadDetail(user_code, bu_code, unid, read_unid, function(data){
      if (data.msg == '此业务暂时未在移动端实现!') {
        wx.showModal({
          title: '温馨提示',
          content: data.msg,
          showCancel: false,
          confirmColor: '#C70019',
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
        return
      }
      that.setData({
        fw_id: data.fw_id,
        sphj_isdistribution: data.sphj_isdistribution,
        sphj_isdistributionopinion: data.sphj_isdistributionopinion
      })
      //标题
      if (app.isDefine(data.fw_title)) {
        that.appendContent("text", "标题", "fw_title", data.fw_title);
      }
      //流程名称
      if (app.isDefine(data.flowname)) {
        that.appendContent("text", "流程名称", "flowname", data.flowname);
      }
      //当前环节
      if (app.isDefine(data.unitName)) {
        that.appendContent("text", "当前环节", "unitName", data.unitName);
      }
      //拟稿人
      if (app.isDefine(data.ngr)) {
        that.appendContent("text", "拟稿人", "ngr", data.ngr);
      }
      //申请日期
      if (app.isDefine(data.fw_rq)) {
        that.appendContent("text", "申请日期", "fw_rq", data.fw_rq);
      }
      //印发时间
      if (app.isDefine(data.issuance_time)) {
        that.appendContent("text", "印发时间", "issuance_time", data.issuance_time);
      }
      //主办部门
      if (app.isDefine(data.zbbm)) {
        that.appendContent("text", "主办部门", "zbbm", data.zbbm);
      }
      //会签部门
      if (app.isDefine(data.countersigned_department)) {
        that.appendContent("text", "会签部门", "countersigned_department", data.countersigned_department);
      }
      //主送
      if (app.isDefine(data.zs)) {
        that.appendContent("text", "主送", "zs", data.zs);
      }
      //抄送
      if (app.isDefine(data.cs)) {
        that.appendContent("text", "抄送", "cs", data.cs);
      }
      //文号
      if (app.isDefine(data.wh)) {
        that.appendContent("text", "文号", "wh", data.wh);
      }
      //密级
      if (app.isDefine(data.mj)) {
        that.appendContent("text", "密级", "mj", data.mj);
      }
      //缓急
      if (app.isDefine(data.priorities)) {
        that.appendContent("text", "缓急", "priorities", data.priorities);
      }
      //文件类别
      if (app.isDefine(data.documenttype)) {
        that.appendContent("text", "文件类别", "documenttype", data.documenttype);
      }
      //文件种类
      if (app.isDefine(data.filetype)) {
        that.appendContent("text", "文件种类", "filetype", data.filetype);
      }
      that.setData({
        contents: contents
      })
      if (app.isDefine(data.fj)) {
        if (data.fj.length) {
          that.setData({
            fileList: data.fj
          })
        }
      }
    })
  },
  appendContent: function (contentType, key, id, value) {
    var obj = {}
    obj.key = key
    obj.id = id
    obj.value = value
    contents.push(obj)
  },
  openFile: function (e) {
    var that = this
    var index = e.target.dataset.index
    var fj_list = that.data.fileList
    var fj_name = fj_list[index].fj_name
    var fj_url = fj_list[index].fj_url
    var fileType = fj_name.substring(fj_name.indexOf('.') + 1, fj_name.length)
    var bu_code = fj_url.substring(fj_url.indexOf('bu_code'), fj_url.indexOf('&fw_id'))
    bu_code = bu_code.substring(bu_code.indexOf('=') + 1, bu_code.length)
    var fw_id = fj_url.substring(fj_url.indexOf('fw_id'), fj_url.indexOf('&attachment_name'))
    fw_id = fw_id.substring(fw_id.indexOf('=') + 1, fw_id.length);
    var attachment_name = fj_url.substring(fj_url.indexOf('attachment_name'), fj_url.length)
    attachment_name = attachment_name.substring(attachment_name.indexOf('=') + 1, attachment_name.length)
    var timestamp = new Date().getTime()
    var file_name = timestamp + '.' + fileType
    var docurl = app.oaUrl + 'filedown?user_id=' + user_code + '&bu_code=' + bu_code + '&fw_id=' + fw_id + '&attachment_name=' + attachment_name + '&file_name=' + file_name;
    docurl = encodeURI(docurl);
    if (fileType == 'jpg' || fileType == 'png' || fileType == 'bmp' || fileType == 'jpeg' || fileType == 'gif') {
      wx.previewImage({
        urls: [
          docurl
        ]
      })
    } else {
      wx.showLoading({
        title: '正在打开',
        mask: true
      })
      wx.downloadFile({
        url: docurl,
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
  },
  distributeBrn_click: function(){
    wx.navigateTo({
      url: './readDistribute?fw_id=' + this.data.fw_id + '&bu_code=' + bu_code + '&sphj_isdistributionopinion=' + this.data.sphj_isdistributionopinion + '&text_type=传阅'
    })
  }
})