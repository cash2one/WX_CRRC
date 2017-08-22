// info.js
Page({
  data: {
    surname: '',
    userName: '',
    dept: '',
    userCode: '',
    email: '',
    mobile: '',
    workTel: ''
  },
  onLoad: function (options) {
    var info = JSON.parse(options.info)
    this.setData({
      surname: info.PNAME.substring(0, 1),
      userName: info.PNAME,
      dept: info.GNAME,
      userCode: info.PID,
      email: info.PMAIL,
      mobile: info.PMOBILE,
      workTel: info.WORKTEL
    })
  },
  call: function(e){
    var num = e.target.dataset.num;
    wx.makePhoneCall({
      phoneNumber: num
    })
  },
  saveContact: function(){
    wx.addPhoneContact({
      firstName: this.data.userName,
      organization: this.data.dept,
      mobilePhoneNumber: this.data.mobile,
      workPhoneNumber: this.data.workTel,
      email: this.data.email,
      success: function(res){
        wx.showToast({
          title: '添加成功',
          icon: 'success'
        })
      }
    })
  }
})