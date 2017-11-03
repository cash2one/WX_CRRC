var gx = require('interface/gxInterface.js')
Page({
  data: {
    unitList: []
  },
  onLoad: function (options) {
    this.setData({
      unitList: [{ "UNIT_CODE": "01000000", "UNIT_NAME": "株洲中车时代电气股份有限公司" }, 
                {"UNIT_CODE": "02000000", "UNIT_NAME":"株洲时代新材料科技股份有限公司"}]
    })
  },
  onUnload: function () {
  
  },
  toIndex: function(e){
    var unit_code = e.target.dataset.code
    console.log(unit_code)
    wx.redirectTo({
      url: 'index?UNIT_CODE=' + unit_code
    })
  }
})