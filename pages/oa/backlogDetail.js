var app = getApp()
//引用OA接口文件
var oa = require('interface/oaInterface.js')
//定义相关全局变量
var user_code = ''
var isCanApprove = true
var isCanOpinion = true
var contents = []
var scrollContents = []
var temp = []
var fw_id = ''
var bu_code = ''
Page({
  data: {
    switchTitle: [
      '详细信息',
      '审批进度'
    ],
    switchCurrent: 0,
    isCanDistribution: false,
    contents: [],
    fileList: [],
    scrollLength: [],
    scrollContents: []
  },
  onLoad: function (options) {
    user_code = wx.getStorageSync('userinfo').username
    fw_id = options.fw_id
    bu_code = options.bu_code
    this.getBacklogDetail(fw_id, bu_code)
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
    fw_id = []
    bu_code = []
    contents = []
    scrollContents = []
    scollContents = []
    temp = []
    isCanApprove = true
    isCanOpinion = true
  },
  changeItem: function(e){
    if (typeof e == 'object') {
      var index = e.target.dataset.index
    } else {
      var index = e
    }
    this.setData({
      switchCurrent: index
    })
  },
  getBacklogDetail: function (fw_id, bu_code){
    var that = this
    oa.getBacklogDetail(user_code, fw_id, bu_code, function(data){
      //是否可以发送，1为可以发送；0为不能发送
      if (data.sphj_iscanapprove == '0'){
        isCanApprove = false
      }
      //是否可以填写审批意见，1为可以填写；0为不能填写
      if (data.sphj_isopinion == '0'){
        isCanOpinion = false
      }
      //是否可以进行分发，1为可以分发；0为不能分发
      if (data.sphj_isdistribution == '0') {
        that.setData({
          isCanDistribution: false
        })
      }
      //是否属于管理流程，0为管理流程；1为普通流程
      if (data.isImplemented == '0'){
        //流程名称
        if (app.isDefine(data.flowname)) {
          that.appendContent('text', 'flowname', '流程名称', data.flowname)
        }
        //当前环节
        if (app.isDefine(data.unitname)) {
          that.appendContent('text', 'unitname', '当前环节', data.unitname)
        }
        //拟稿人
        if (app.isDefine(data.drafter)) {
          that.appendContent('text', 'drafter', '拟稿人', data.drafter)
        }
        //拟稿部门
        if (app.isDefine(data.draft_dep)) {
          that.appendContent('text', 'draft_dep', '拟稿部门', data.draft_dep)
        }
        if (data.tabList.length){
          for (var i in data.tabList){
            var fieldList = data.tabList[i].fieldList
            for (var j in fieldList){
              if (!app.isDefine(fieldList[j].attribute) && !app.isDefine(fieldList[j].rowList) && app.isDefine(fieldList[j].tableList)){
                var tableList = fieldList[j].tableList[0]
                var table = tableList.table
                that.setData({
                  scrollLength: table.length
                })
                for(var k in table){
                  var tr = table[k].tr
                  for(var l in tr){
                    that.appendContent('scroll', tr[l].name, tr[l].attribute, tr[l].value)
                  }
                  var temp1 = {}
                  temp1.subList = temp
                  scrollContents.push(temp1)
                  temp = []
                }
              }
              if (!app.isDefine(fieldList[j].attribute) && app.isDefine(fieldList[j].rowList) && !app.isDefine(fieldList[j].tableList)) {
                for (var m in fieldList[j].rowList[0].fields){
                  that.appendContent('text', fieldList[j].rowList[0].fields[m].name, fieldList[j].rowList[0].fields[m].attribute, fieldList[j].rowList[0].fields[m].value)
                }
                continue
              }
              if (app.isDefine(fieldList[j].attribute) && !app.isDefine(fieldList[j].rowList) && !app.isDefine(fieldList[j].tableList)) {
                that.appendContent('text', fieldList[j].name, fieldList[j].attribute, fieldList[j].value)
              }
            }
          }
          that.setData({
            scrollContents: scrollContents
          })
        }
      }else{
        //流程名称
        if (app.isDefine(data.flowname)){
          that.appendContent('text', 'flowname', '流程名称', data.flowname)
        }
        //当前环节
        if (app.isDefine(data.unitName)) {
          that.appendContent('text', 'unitName', '当前环节', data.unitName)
        }
        //拟稿人
        if (app.isDefine(data.ngr)) {
          that.appendContent('text', 'ngr', '拟稿人', data.ngr)
        }
        //申请日期
        if (app.isDefine(data.fw_rq)) {
          that.appendContent('text', 'fw_rq', '申请日期', data.fw_rq)
        }
        //要求完成时间（业联）
        if (app.isDefine(data.required_complete_time)) {
          that.appendContent('text', 'required_complete_time', '要求完成时间', data.required_complete_time)
        }
        //实施日期（规章制度、通知通报）
        if (app.isDefine(data.effective_date)) {
          that.appendContent('text', 'effective_date', '实施日期', data.effective_date)
        }
        //主办部门
        if (app.isDefine(data.zbbm)) {
          that.appendContent('text', 'zbbm', '主办部门', data.zbbm)
        }
        //会签部门
        if (app.isDefine(data.countersigned_department)) {
          that.appendContent('text', 'countersigned_department', '会签部门', data.countersigned_department)
        }
        //主送
        if (app.isDefine(data.zs)) {
          that.appendContent('text', 'zs', '主送', data.zs)
        }
        //抄送
        if (app.isDefine(data.cs)) {
          that.appendContent('text', 'cs', '抄送', data.cs)
        }
        //印发时间
        if (app.isDefine(data.issuance_time)) {
          that.appendContent('text', 'issuance_time', '印发时间', data.issuance_time)
        }
        //文号
        if (app.isDefine(data.wh)) {
          that.appendContent('text', 'wh', '文号', data.wh)
        }
        //密级
        if (app.isDefine(data.mj)) {
          that.appendContent('text', 'mj', '密级', data.mj)
        }
        //缓急
        if (app.isDefine(data.priorities)) {
          that.appendContent('text', 'priorities', '缓急', data.priorities)
        }
        //文件类别
        if (app.isDefine(data.documenttype)) {
          that.appendContent('text', 'documenttype', '文件类别', data.documenttype)
        }
        //文件种类
        if (app.isDefine(data.filetype)) {
          that.appendContent('text', 'filetype', '文件种类', data.filetype)
        }
        //发布单位（电子公告、新闻）
        if (app.isDefine(data.release_dep)) {
          that.appendContent('text', 'release_dep', '发布单位', data.release_dep)
        }
        //发布人（电子公告、新闻）
        if (app.isDefine(data.release_user)) {
          that.appendContent('text', 'release_user', '发布人', data.release_user)
        }
        //批准人（电子公告、新闻）
        if (app.isDefine(data.approval_person)) {
          that.appendContent('text', 'approval_person', '批准人', data.approval_person)
        }
        //发布时间（电子公告、新闻）
        if (app.isDefine(data.release_time)) {
          that.appendContent('text', 'release_time', '发布时间', data.release_time)
        }
        //内容（电子公告、新闻）
        if (app.isDefine(data.release_content)) {
          that.appendContent('text', 'release_content', '内容', data.release_content)
        }
      }
      that.setData({
        contents: contents
      })
      if (app.isDefine(data.fj)){
        if(data.fj.length){
          that.setData({
            fileList: data.fj
          })
        }
      }
    })
  },
  appendContent: function(contentType, id, key, value){
    switch (contentType){
      case 'text':
        var obj = {}
        obj.key = key
        obj.id = id
        obj.value = value
        contents.push(obj)
        break
      case 'scroll':
        var obj = {}
        obj.key = key
        obj.id = id
        obj.value = value
        temp.push(obj)
        break
    }
  },
  openFile: function(e){
    var that = this
    var index = e.target.dataset.index
    var fj_list = that.data.fileList
    var fj_name = fj_list[index].fj_name
    var fj_url = fj_list[index].fj_url
    var docurl = oa.oaUrl + 'filedown?user_id=' + user_code + '&bu_code=' + bu_code + '&fw_id=' + fw_id + '&attachment_name=' + fj_name + '&file_name=' + fj_name;
    docurl = encodeURI(docurl);
  }
})