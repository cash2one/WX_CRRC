var app = getApp()
//引用OA接口文件
var oa = require('interface/oaInterface.js')
//定义相关全局变量
var user_code = ''
var fw_id = ''
var bu_code = ''
var unit_list = []
Page({
  data: {
    thhj: []
  },
  onLoad: function (options) {
    user_code = wx.getStorageSync('userinfo').username
    fw_id = options.fw_id
    bu_code = options.bu_code
    this.getRejectInfo()
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
    unit_list = []
  },
  getRejectInfo: function(){
    var that = this
    oa.getRejectInfo(user_code, fw_id, bu_code, function(data){
      var status = data.status
      if(status == 0){
        unit_list = data.unit_list
        var thhj = [];
        if (unit_list.length) {
          if (unit_list.length > 1){
            thhj.push({ "unitindex": "-1", "unitname": "请选择退回环节", "unituser": ''})
            for (var i in splist) {
              thhj.push({ "unitindex": unit_list[i].unitindex, "unitname": unit_list[i].unitname, "unituser": unit_list[i].unituser})
            }
            that.setData({
              thhj: thhj
            })
          }else{
            thhj.push({ "unitindex": unit_list[0].unitindex, "unitname": unit_list[0].unitname, "unituser": unit_list[0].unituser })
            that.setData({
              thhj: thhj
            })
          }
          that.thhjChange(0)
        }
      }else{
        wx.showToast({
          title: '当前环节无法退回',
          image: 'images/error.png'
        })
      }
    })
  }
})