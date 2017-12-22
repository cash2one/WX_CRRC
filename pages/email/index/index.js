var flag = -1
Page({
  data: {
    swiperCurrent: 0,
    tabBar: [
      {
        iconPath: "../images/main.png",
        selectedIconPath: "../images/main-active.png",
        text: "收件箱"
      },
      {
        iconPath: "../images/more.png",
        selectedIconPath: "../images/more-active.png",
        text: "更多"
      }
    ]
  },
  onLoad: function (options) {
    this.changeItem(0)
  },
  onUnload: function () {
    flag = -1
    
  },
  changeItem: function (e) {
    if (typeof e == 'object') {
      var index = e.currentTarget.dataset.index
    } else {
      var index = e
    }
    if (flag == index) {
      return
    } else {
      flag = index
    }
    this.setData({
      swiperCurrent: index
    })

    switch (index) {
      case 0:
        break
      case 1:
        break
    }
  },
})