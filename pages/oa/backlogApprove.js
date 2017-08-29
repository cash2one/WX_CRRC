var app = getApp()
//引用OA接口文件
var oa = require('interface/oaInterface.js')
//定义相关全局变量
var user_code = ''
var fw_id = ''
var bu_code = ''
var splist = []
var ryfw_type = ''
var ryfw_id = ''
Page({
  data: {
    isCanOpinion: '',
    sphj_index: 0,
    sphj: [],
    spfs_index: 0,
    spfs: [],
    ryfw_index: 0,
    ryfw: [],
    isDefault: false,
    hasDefault: true,
    person_list: []
  },
  onLoad: function (options) {
    user_code = wx.getStorageSync('userinfo').username
    fw_id = options.fw_id
    bu_code = options.bu_code
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
    fw_id = ''
    bu_code = ''
    splist = []
    ryfw_type = []
    ryfw_id = ''
  },
  getApproveInfo: function (fw_id, bu_code) {
    var that = this
    oa.getApproveInfo(user_code, fw_id, bu_code, function (data) {
      splist = data.sphj_list;
      var sphj = [];
      if (splist.length > 1) {
        sphj.push({ "id": "empty", "name": "请选择审批环节" })
        for (var i in splist) {
          sphj.push({ "id": splist[i].sphj_id, "name": splist[i].sphj_name })
        }
        that.setData({
          sphj: sphj
        })
      } else {
        sphj.push({ "id": splist[0].sphj_id, "name": splist[0].sphj_name })
        that.setData({
          sphj: sphj
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
    var value = this.data.sphj[index].id
    if (this.data.sphj_index != index) {
      this.setData({
        spfs_index: 0,
        ryfw_index: 0,
        person_list: [],
        hasDefault: true
      })
      wx.removeStorageSync('person_list')
    }
    this.setData({
      sphj_index: index
    })
    var spfsmcs = this.getValueByKey('sphj_id', value, 'spfs_name', splist)
    var spbmids = this.getValueByKey('sphj_id', value, 'sphj_depid', splist)
    var spbmmcs = this.getValueByKey('sphj_id', value, 'sphj_depname', splist)
    var spqzids = this.getValueByKey('sphj_id', value, 'sphj_groupid', splist)
    var spqzmcs = this.getValueByKey('sphj_id', value, 'sphj_groupname', splist)
    var spydyy = this.getValueByKey('sphj_id', value, 'sphj_person', splist)
    var spfs = []
    var ryfw = []
    if (app.isDefine(spfsmcs)) {
      var spfs_list = spfsmcs.split(':')
      if (spfs_list.length > 1) {
        spfs.push({ "id": "empty", "name": "请选择审批方式" })
        for (var i in spfs_list) {
          spfs.push({ "id": spfs_list[i], "name": spfs_list[i] })
        }
        this.setData({
          spfs: spfs
        })
      } else {
        spfs.push({ "id": spfs_list[0], "name": spfs_list[0] })
        this.setData({
          spfs: spfs
        })
      }
    } else {
      this.setData({
        spfs: [{ "id": "empty", "name": "请选择审批方式" }]
      })
    }
    //人员范围只有部门选项
    if (app.isDefine(spbmids) && !app.isDefine(spqzids) && !app.isDefine(spydyy)) {
      spbmids = spbmids.split(':')
      spbmmcs = spbmmcs.split(':')
      if (spbmids.length > 1) {
        ryfw.push({ "id": "empty", "name": "请选择审批方式", "type": "N" })
        for (var i in spbmids) {
          ryfw.push({ "id": spbmids[i], "name": spbmmcs[i], "type": "D" })
        }
        this.setData({
          ryfw: ryfw
        })
      } else {
        ryfw.push({ "id": spbmids[0], "name": spbmmcs[0], "type": "D" })
        this.setData({
          ryfw: ryfw
        })
      }
    }
    //人员范围只有群组选项
    if (!app.isDefine(spbmids) && app.isDefine(spqzids) && !app.isDefine(spydyy)) {
      spqzids = spqzids.split(':')
      spqzmcs = spqzmcs.split(':')
      if (spqzids.length > 1) {
        ryfw.push({ "id": "empty", "name": "请选择审批方式", "type": "N" })
        for (var i in spqzids) {
          ryfw.push({ "id": spqzids[i], "name": spqzmcs[i], "type": "G" })
        }
        this.setData({
          ryfw: ryfw
        })
      } else {
        ryfw.push({ "id": spqzids[0], "name": spqzmcs[0], "type": "G" })
        this.setData({
          ryfw: ryfw
        })
      }
    }
    //人员范围有部门和群组选项
    if (app.isDefine(spbmids) && app.isDefine(spqzids) && !app.isDefine(spydyy)) {
      spbmids = spbmids.split(':')
      spbmmcs = spbmmcs.split(':')
      spqzids = spqzids.split(':')
      spqzmcs = spqzmcs.split(':')
      ryfw.push({ "id": "empty", "name": "请选择审批方式", "type": "N" })
      for (var i in spbmids) {
        ryfw.push({ "id": spbmids[i], "name": spbmmcs[i], "type": "D" })
      }
      for (var i in spqzids) {
        ryfw.push({ "id": spqzids[i], "name": spqzmcs[i], "type": "G" })
      }
      this.setData({
        ryfw: ryfw
      })
    }
    //人员范围有部门和预定人员
    if (app.isDefine(spbmids) && !app.isDefine(spqzids) && app.isDefine(spydyy)) {
      spbmids = spbmids.split(':')
      spbmmcs = spbmmcs.split(':')
      ryfw.push({ "id": "empty", "name": "请选择审批方式", "type": "N" })
      ryfw.push({ "id": "0", "name": "系统预定人员", "type": "Y" })
      for (var i in spbmids) {
        ryfw.push({ "id": spbmids[i], "name": spbmmcs[i], "type": "D" })
      }
      this.setData({
        ryfw: ryfw
      })
    }
    //人员范围有群组和预定人员
    if (!app.isDefine(spbmids) && app.isDefine(spqzids) && app.isDefine(spydyy)) {
      spqzids = spqzids.split(':')
      spqzmcs = spqzmcs.split(':')
      ryfw.push({ "id": "empty", "name": "请选择审批方式", "type": "N" })
      ryfw.push({ "id": "0", "name": "系统预定人员", "type": "Y" })
      for (var i in spqzids) {
        ryfw.push({ "id": spqzids[i], "name": spqzmcs[i], "type": "G" })
      }
      this.setData({
        ryfw: ryfw
      })
    }
    //人员范围有部门、群组和预定人员
    if (app.isDefine(spbmids) && app.isDefine(spqzids) && app.isDefine(spydyy)) {
      spbmids = spbmids.split(':')
      spbmmcs = spbmmcs.split(':')
      spqzids = spqzids.split(':')
      spqzmcs = spqzmcs.split(':')
      ryfw.push({ "id": "empty", "name": "请选择审批方式", "type": "N" })
      ryfw.push({ "id": "0", "name": "系统预定人员", "type": "Y" })
      for (var i in spbmids) {
        ryfw.push({ "id": spbmids[i], "name": spbmmcs[i], "type": "D" })
      }
      for (var i in spqzids) {
        ryfw.push({ "id": spqzids[i], "name": spqzmcs[i], "type": "G" })
      }
      this.setData({
        ryfw: ryfw
      })
    }
    //人员范围只有预定人员
    if (!app.isDefine(spbmids) && !app.isDefine(spqzids) && app.isDefine(spydyy)) {
      this.setData({
        ryfw: [{ "id": "0", "name": "系统预定人员", "type": "Y" }]
      })
      this.ryfwChange(0)
    }
    //人员范围全部为空
    if (!app.isDefine(spbmids) && !app.isDefine(spqzids) && !app.isDefine(spydyy)) {
      this.setData({
        ryfw: [{ "id": "empty", "name": "请选择人员范围", "type": "N" }]
      })
    }
  },
  spfsChange: function (e) {
    this.setData({
      spfs_index: e.detail.value
    })
  },
  ryfwChange: function (e) {
    if (typeof e == 'object') {
      var index = e.detail.value
    } else {
      var index = e
    }
    if (this.data.ryfw_index != index) {
      this.setData({
        person_list: []
      })
      wx.removeStorageSync('person_list')
    }
    this.setData({
      ryfw_index: index
    })
    ryfw_type = this.data.ryfw[index].type
    ryfw_id = this.data.ryfw[index].id
    if (ryfw_type == 'Y') {
      var sphj_id = this.data.sphj[this.data.sphj_index].id
      var spydyy = this.getValueByKey('sphj_id', sphj_id, 'sphj_person', splist)
      var person_list = []
      var ydry_list = []
      if (spydyy.indexOf(":") != -1) {
        if (spydyy.substring(spydyy.length - 1, spydyy.length) == ":") {
          spydyy = spydyy.substring(0, spydyy.length - 1);
        }
        ydry_list = spydyy.split(':');
      }
      if (ydry_list.length) {
        person_list = ydry_list;
      } else {
        person_list.push(spydyy);
      }
      wx.setStorageSync("person_list", JSON.stringify(person_list))
      this.addPerson();
      this.setData({
        hasDefault: true
      })
    } else {
      if (ryfw_type != 'N') {
        this.setData({
          hasDefault: false
        })
      }else{
        this.setData({
          hasDefault: true
        })
      }
    }
  },
  addPerson: function () {
    var person_content = ''
    var name = ''
    var plist = JSON.parse(wx.getStorageSync("person_list"))
    for (var i in plist) {
      var people = []
      if (plist[i].indexOf("(") != -1) {
        name = plist[i].substring(0, plist[i].indexOf("("));
      }else{
        name = plist[i]
      }
      people.push({ "name": name, "fullname": plist[i]})
    }
    this.setData({
      hasDefault: false,
      person_list: people
    })
    if (ryfw_type == 'Y') {
      this.setData({
        isDefault: true
      })
    } else {
      this.setData({
        isDefault: false
      })
    }
  },
  addNewPerson: function(){
    wx.navigateTo({
      url: './peopleList?fw_id=' + fw_id + '&bu_code=' + bu_code + "&ryfw_id=" + ryfw_id + '&ryfw_type=' + ryfw_type
    })
  },
  getValueByKey: function (key, value, rekey, arr) {
    if (arr.length) {
      for (var i in arr) {
        if (arr[i][key] == value) {
          return arr[i][rekey];
        } else {
          continue;
        }
      }
    } else {
      return '-1';
    }
  }
})