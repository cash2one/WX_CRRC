var tz = require('interface/tzInterface.js')
var record_id = ''
var contents = []
Page({

  data: {
    switchTitle: [
      '详细信息',
      '审批进度'
    ],
    switchCurrent: 0,
  },
  onLoad: function (options) {
    record_id = options.instance_record_id
    this.changeItem(0)
  },
  onUnload: function () {
    contents = []
  },
  changeItem: function (e) {
    if (typeof e == 'object') {
      var index = e.target.dataset.index
    } else {
      var index = e
    }
    this.setData({
      switchCurrent: index
    })
    if (index == 0) {
      contents = []
      this.getBacklogDetail()
    } else {
      this.getHistoryOpinion()
    }
  },
  getBacklogDetail: function(){
    var that = this
    tz.getLxtzDetail(record_id, function(data){
      console.log(data)
    })
  },
  getHistoryOpinion: function () {

  },
})