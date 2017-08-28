var app = getApp()
//引用OA接口文件
var oa = require('interface/oaInterface.js')
//定义相关全局变量
var user_code = ''
var splist = []
Page({
  data: {
    isCanOpinion: '',
    sphj_index: 0,
    sphj_id: [],
    sphj_name: [],
    spfs_index: 0,
    spfs_id: [],
    spfs_name: []
  },
  onLoad: function (options) {
    user_code = wx.getStorageSync('userinfo').username
    var fw_id = options.fw_id
    var bu_code = options.bu_code
    this.setData({
      isCanOpinion: options.isCanOpinion
    })
    this.getApproveInfo(fw_id, bu_code)
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
    splist = []
  },
  getApproveInfo: function (fw_id, bu_code){
    var that = this
    oa.getApproveInfo(user_code, fw_id, bu_code, function(data){
      splist = data.sphj_list;
      var sphj_id = [];
      var sphj_name = [];
      if (splist.length > 1){
        sphj_id.push('empty')
        sphj_name.push('请选择审批环节')
        for (var i in splist) {
          sphj_id.push(splist[i].sphj_id)
          sphj_name.push(splist[i].sphj_name)
        }
        that.setData({
          sphj_id: sphj_id,
          sphj_name: sphj_name
        })
      }else{
        sphj_id.push(splist[0].sphj_id)
        sphj_name.push(splist[0].sphj_name);
        that.setData({
          sphj_id: sphj_id,
          sphj_name: sphj_name
        })
      }
      that.sphjChange(0)
      
    })
  },
  sphjChange: function (e) {
    if (typeof e == 'object') {
      var index = e.detail.value
    } else {
      var index = e
    }
    var value = this.data.sphj_id[index]
    this.setData({
      sphj_index: index
    })
    var spfs = this.getValueByKey('sphj_id', value, 'spfs_name', splist)
    var spbmids = this.getValueByKey('sphj_id', value, 'sphj_depid', splist)
    var spbmmcs = this.getValueByKey('sphj_id', value, 'sphj_depname', splist)
    var spqzids = this.getValueByKey('sphj_id', value, 'sphj_groupid', splist)
    var spqzmcs = this.getValueByKey('sphj_id', value, 'sphj_groupname', splist)
    var spydyy = this.getValueByKey('sphj_id', value, 'sphj_person', splist)
    if (app.isDefine(spfs)) {
      var spfs_list = spfs.split(':')
      var spfs_id = []
      var spfs_name = []
      if (spfs_list.length > 1) {
        spfs_id.push('empty')
        spfs_name.push('请选择审批方式')
        for (var i in spfs_list) {
          spfs_id.push(spfs_list[i])
          spfs_name.push(spfs_list[i])
        }
        this.setData({
          spfs_id: spfs_id,
          spfs_name: spfs_name
        })
      }else{
        spfs_id.push(spfs_list[0])
        spfs_name.push(spfs_list[0]);
        this.setData({
          spfs_id: spfs_id,
          spfs_name: spfs_name
        })
      }
    }else{
      this.setData({
        spfs_id: ['empty'],
        spfs_name: ['请选择审批方式']
      })
    }
  },
  spfsChange: function (e) {
    this.setData({
      spfs_index: e.detail.value
    })
  },
  getValueByKey: function (key, value, rekey, arr){
    if(arr.length) {
      for (var i in arr) {
        if (arr[i][key] == value) {
          return arr[i][rekey];
        } else {
          continue;
        }
      }
    }else {
      return '-1';
    }
  }
})