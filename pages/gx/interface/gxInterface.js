var gxUrl = 'https://appagent2.csrzic.com/10000000/public/fsmstest/'
//获取 员工主体信息
function getUnitByUserCode(user_code, callBack) {
  wx.request({
    method: 'GET',
    url: gxUrl + 'getUnitByUserCode',
    data: {
      USER_CODE: user_code

    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var header = res.data.MSG_HEADER
      var unit_list = res.data.UNIT_LINE_LIST
      var status = header.ERROR_FLAG
      if (status == "Y") {
        callBack(unit_list)
      } else {
        var error_msg = header.ERROR_MSG
        wx.showToast({
          title: error_msg,
          image: 'images/error.png'
        })
        return
      }
    }
  })
}
//获取待办/申请事项数量
function getCount(user_code, type, unit_code, callBack) {
  wx.request({
    method: 'GET',
    url: gxUrl + 'getTodoList',
    data: {
      USER_CODE: user_code,
      CURRENT_PAGE: 1,
      PAGE_SIZE: 1,
      TYPE: type,
      UNIT_CODE: unit_code

    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var header = res.data.MSG_HEADER
      var total_record = header.TOTAL_RECORD
      callBack(total_record)
    }
  })
}
//获取待办/申请事项列表
function getList(user_code, type, unit_code, page_num, page_sum, callBack) {
  wx.request({
    method: 'GET',
    url: gxUrl + 'getTodoList',
    data: {
      USER_CODE: user_code,
      CURRENT_PAGE: page_num,
      PAGE_SIZE: page_sum,
      TYPE: type,
      UNIT_CODE: unit_code

    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var header = res.data.MSG_HEADER
      var list = res.data.LINES
      var status = header.ERROR_FALG
      if (status == "Y") {
        callBack(list)
      } else {
        var error_msg = header.ERROR_MSG
        wx.showToast({
          title: error_msg,
          image: 'images/error.png'
        })
        return
      }
    }
  })
}
//获取  待办/已办/当前申请 非差旅类  详情
function getBoeDetail(boe_header_id, unit_code, callBack) {
  wx.request({
    method: 'GET',
    url: gxUrl + 'getBoeDetail',
    data: {
      BOE_HEADER_ID: boe_header_id,
      UNIT_CODE: unit_code
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      callBack(res.data)
    }
  })
}
//获取  待办/已办/当前申请 差旅类  详情
function getTravelDetail(boe_header_id, unit_code, callBack) {
  wx.request({
    method: 'GET',
    url: gxUrl + 'getTravelDetail',
    data: {
      BOE_HEADER_ID: boe_header_id,
      UNIT_CODE: unit_code
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      callBack(res.data)
    }
  })
}
//单据审批
function approve(user_code, boe_header_id, approve_type, approve_desc, unit_code, callBack) {
  wx.request({
    method: 'GET',
    url: gxUrl + 'approve',
    data: {
      USER_CODE: user_code,
      BOE_HEADER_ID: boe_header_id,
      APPROVE_TYPE: approve_type,
      APPROVE_DESC: approve_desc,
      UNIT_CODE: unit_code
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      callBack(res.data)
    }
  })
}
//单据转交人查询
function getTransferEmployee(user_name, unit_code, callBack) {
  wx.request({
    method: 'GET',
    url: gxUrl + 'getTransferEmployee',
    data: {
      USER_NAME: user_name,
      UNIT_CODE: unit_code
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      callBack(res.data)
    }
  })
}
//单据转交
function transfer(user_code, boe_header_id, assign_to, approve_desc, unit_code, callBack) {
  wx.request({
    method: 'GET',
    url: gxUrl + 'transfer',
    data: {
      USER_CODE: user_code,
      BOE_HEADER_ID: boe_header_id,
      ASSIGN_TO: assign_to,
      APPROVE_DESC: approve_desc,
      UNIT_CODE: unit_code
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      callBack(res.data)
    }
  })
}
//当前申请是否可以收回
function canBack(user_code, boe_header_id, unit_code, callBack) {
  wx.request({
    method: 'GET',
    url: gxUrl + 'canBack',
    data: {
      USER_CODE: user_code,
      BOE_HEADER_ID: boe_header_id,
      UNIT_CODE: unit_code
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      callBack(res.data)
    }
  })
}
//单据收回
function back(user_code, boe_header_id, unit_code, callBack) {
  wx.request({
    method: 'GET',
    url: gxUrl + 'back',
    data: {
      USER_CODE: user_code,
      BOE_HEADER_ID: boe_header_id,
      UNIT_CODE: unit_code
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      callBack(res.data)
    }
  })
}
module.exports = {
  getUnitByUserCode: getUnitByUserCode,
  getCount: getCount,
  getList: getList,
  getBoeDetail: getBoeDetail,
  getTravelDetail: getTravelDetail,
  approve: approve,
  getTransferEmployee: getTransferEmployee,
  transfer: transfer,
  canBack: canBack,
  back: back
}