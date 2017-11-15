// private property
var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

// public method for encoding
function encode(input) {
  var output = "";
  var chr1,
    chr2,
    chr3,
    enc1,
    enc2,
    enc3,
    enc4;
  var i = 0;
  input = _utf8_encode(input);
  while (i < input.length) {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;
    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
  }
  return output;
}
// public method for decoding
function decode(input) {
  var output = "";
  var chr1,
    chr2,
    chr3;
  var enc1,
    enc2,
    enc3,
    enc4;
  var i = 0;
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  while (i < input.length) {
    enc1 = _keyStr.indexOf(input.charAt(i++));
    enc2 = _keyStr.indexOf(input.charAt(i++));
    enc3 = _keyStr.indexOf(input.charAt(i++));
    enc4 = _keyStr.indexOf(input.charAt(i++));
    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;
    output = output + String.fromCharCode(chr1);
    if (enc3 != 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 != 64) {
      output = output + String.fromCharCode(chr3);
    }
  }
  output = _utf8_decode(output);
  return output;
}
// private method for UTF-8 encoding
function _utf8_encode(string) {
  string = string.replace(/\r\n/g, "\n");
  var utftext = "";
  for (var n = 0; n < string.length; n++) {
    var c = string.charCodeAt(n);
    if (c < 128) {
      utftext += String.fromCharCode(c);
    } else if ((c > 127) && (c < 2048)) {
      utftext += String.fromCharCode((c >> 6) | 192);
      utftext += String.fromCharCode((c & 63) | 128);
    } else {
      utftext += String.fromCharCode((c >> 12) | 224);
      utftext += String.fromCharCode(((c >> 6) & 63) | 128);
      utftext += String.fromCharCode((c & 63) | 128);
    }

  }
  return utftext;
}
// private method for UTF-8 decoding
function _utf8_decode(utftext) {
  var string = "";
  var i = 0;
  var c = 0;
  var c1 = 0;
  var c2 = 0;
  while (i < utftext.length) {
    c = utftext.charCodeAt(i);
    if (c < 128) {
      string += String.fromCharCode(c);
      i++;
    } else if ((c > 191) && (c < 224)) {
      c2 = utftext.charCodeAt(i + 1);
      string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
      i += 2;
    } else {
      c2 = utftext.charCodeAt(i + 1);
      c3 = utftext.charCodeAt(i + 2);
      string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
      i += 3;
    }
  }
  return string;
}

module.exports = {
  encode: encode,
  decode: decode,
  _utf8_encode: _utf8_encode,
  _utf8_decode: _utf8_decode
}
// function formatTime(date) {
//   var year = date.getFullYear()
//   var month = date.getMonth() + 1
//   var day = date.getDate()

//   var hour = date.getHours()
//   var minute = date.getMinutes()
//   var second = date.getSeconds()


//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }

// function formatNumber(n) {
//   n = n.toString()
//   return n[1] ? n : '0' + n
// }


// //过滤器
// function formatWan(n){
//   n = n.toString();
//   return (n/10000).toFixed(1) +'万';
// }

// //获取推荐频道数据
// function getRecommend(callback) {
//   wx.request({
//     url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
//     data: {
//       g_tk: 5381,
//       uin: 0,
//       format: 'json',
//       inCharset: 'utf-8',
//       outCharset: 'utf-8',
//       notice: 0,
//       platform: 'h5',
//       needNewCode: 1,
//       _: Date.now()
//     },
//     method: 'GET',
//     header: {'content-Type': 'application/json'},
//     success: function(res){
//       if(res.statusCode == 200){
//         callback(res.data);
//       }
//     }
//   })
// }

// //获取热门搜索
// function getHotSearch(callback){
//   wx.request({
//     url: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',
//     data: {
//       g_tk: 5381,
//       uin: 0,
//       format: 'json',
//       inCharset: 'utf-8',
//       outCharset: 'utf-8',
//       notice: 0,
//       platform: 'h5',
//       needNewCode: 1,
//       _: Date.now()
//     },
//     method: 'GET',
//     header: {'content-Type': 'application/json'},
//     success: function(res){
//       if(res.statusCode == 200){
//         let data = res.data;
//         data.data.hotkey = data.data.hotkey.slice(0,8)
//         callback(data);
//       }
//     }
//   })
// }

// //获取搜索结果
// function getSearchMusic(keyword, page, callback){
//   wx.request({
//     url: 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp',
//     data: {
//       g_tk: 5381,
//       uin: 0,
//       format: 'json',
//       inCharset: 'utf-8',
//       outCharset: 'utf-8',
//       notice: 0,
//       platform: 'h5',
//       needNewCode: 1,
//       w: keyword,
//       zhidaqu: 1,
//       catZhida: 1,
//       t: 0,
//       flag: 1,
//       ie: 'utf-8',
//       sem: 1,
//       aggr: 0,
//       perpage: 20,
//       n: 20,
//       p: page,
//       remoteplace: 'txt.mqq.all',
//       _: Date.now()
//     },
//     method: 'GET',
//     header: {'content-Type': 'application/json'},
//     success: function(res){
//       if(res.statusCode == 200){
//         callback(res.data);
//       }
//     }
//   })
// }


// /*
// ** 排行榜相关api
// */

// //获取排行榜频道数据
// function getToplist(callback){
//   wx.request({
//     url: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
//     data: {
//       format: 'json',
//       g_tk: 5381,
//       uin: 0,
//       inCharset: 'utf-8',
//       outCharset: 'utf-8',
//       notice: 0,
//       platform: 'h5',
//       needNewCode: 1,
//       _: Date.now()
//     },
//     method: 'GET',
//     header: {'content-Type': 'application/json'},
//     success: function(res){
//       if(res.statusCode == 200){
//         let data = res.data;
//         let toplist = data.data.topList;
//         for(let i=0; i<toplist.length; i++){
//           toplist[i].listenCount = formatWan(toplist[i].listenCount);
//         }
//         callback(data);
//       }
//     }
//   })
// }
// //获取排行榜详细信息
// function getToplistInfo(id, callback){
//   wx.request({
//     url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
//     data: {
//       g_tk: 5381,
//       uin: 0,
//       format: 'json',
//       inCharset: 'utf-8',
//       outCharset: 'utf-8',
//       notice: 0,
//       platform: 'h5',
//       needNewCode: 1,
//       tpl: 3,
//       page: 'detail',
//       type: 'top',
//       topid: id,
//       _: Date.now()
//     },
//     method: 'GET',
//     header: {'Content-Type': 'application/json'},
//     success: function(res){
//       if(res.statusCode == 200){
//         callback(res.data);
//       }
//     }
//   })
// }

// module.exports = {
//   formatTime: formatTime,
//   getRecommend: getRecommend,
//   getHotSearch: getHotSearch,
//   getSearchMusic: getSearchMusic,
//   getToplist: getToplist,
//   getToplistInfo: getToplistInfo
// }
