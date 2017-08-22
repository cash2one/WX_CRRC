// detail.js
var requestUrl = getApp().globalUrl
Page({
  data: {
    depts: [],
    peoples: [],
    hasMgr: false
  },
  onLoad: function (options) {
    var gid = options.gid
    this.getDept(gid)
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  getDept: function(gid){
    if(typeof gid == 'object'){
      gid = gid.target.dataset.gid
    }
    var that = this
    that.setData({
      hasMgr: false,
      peoples: [],
      depts: []
    })
    wx.request({
      url: requestUrl + 'index/contact',
      method: 'GET',
      data: {
        unit_code: gid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var unit_list = JSON.parse(res.data.return).unit
        var people_list = JSON.parse(res.data.return).person
        if(unit_list.length && people_list.length){
          that.setData({
            hasMgr: true,
            peoples: people_list,
            depts: unit_list
          })
        } else if (!unit_list.length && people_list.length){
          that.setData({
            hasMgr: false,
            peoples: people_list,
            depts: []
          })
          that.getPersons(people_list)
        } else if (unit_list.length && !people_list.length){
          that.setData({
            hasMgr: false,
            peoples: [],
            depts: unit_list
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
  getPersons: function(e){
    if (e.target == undefined){
      var persons = e
    }else{
      var persons = e.target.dataset.peoples
    }
    this.setData({
      hasMgr: false,
      peoples: persons,
      depts: []
    })
  },
  getInfo: function(e){
    var info = e.currentTarget.dataset.info
    wx.navigateTo({
      url: './info?info='+JSON.stringify(info),
    })
  }
})