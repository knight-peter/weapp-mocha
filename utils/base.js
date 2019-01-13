import wxAPI from './wxAPI.js'
import Config from '../config.js';
const baseUrl = Config.baseUrl;
const appkey = Config.request.tokenName;
const msgName = Config.response.msgName;
const statusName = Config.response.statusName;
const ossUrl = Config.ossUrl
class Base extends wxAPI {
  constructor() {
    super();
    this.baseUrl = Config.baseUrl;
    this.ossUrl = Config.ossUrl;
    this.tokenName = Config.request.tokenName;
    this.tokenValue = Config[Config.request.tokenName];
    this.msgName = Config.response.msgName;
    this.statusName = Config.response.statusName;
    this.app = getApp();
  }
  /* 获取数据添加loading弹窗 */
  req({
    url,
    method = 'GET',
    apiToken = this.tokenValue,
    data = {},
    complete = null,
    loading = false
  }) {
    const startDate = new Date()
    const startTime = startDate.getTime()
    if (loading) {
      wx.showLoading({
        title: '加载中'
      })
    }

    const token = apiToken || wx.getStorageSync(this.tokenName);
    return super.request({
        url,
        method,
        data,
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          [this.tokenName]: token,
        },
        complete
      })
      .then(res => {
        const endDate = new Date()
        const endTime = endDate.getTime()
        if (loading) {
          if (endTime - startTime > 500) {
            wx.hideLoading();
          } else {
            setTimeout(function () {
              wx.hideLoading();
            }, 500)
          }
        }
        return res
      })
  }
  /* 在缓存中写入token */
  checkToken() {
    const token = wx.getStorageSync(this.tokenName);
    if (token) {
      return super.request({
          url: 'https://xcx.ef-tool.com/api/v1/checkToken',
          method: 'POST',
          header: {
            'content-type': 'application/json',
            [this.tokenName]: token,
          }
        })
        .then(res => {
          if (!res.data.result) {
            return this.loginIn()
          } else {
            return res.data
          }
        })
    } else {
      return this.loginIn()
    }
  }
  /* wx.login()获取code,发送到后台换取 openId, sessionKey, unionId */
  loginIn({
    nickname,
    avatar,
    sex
  }) {
    return super.login()
      .then(res => {

        return this.req({
          method: 'POST',
          url: 'merchant/merchant/doLogin',
          data: {
            code: res.code,
            nickname: nickname || '',
            avatar: avatar || '',
            sex: sex || ''
          },
        })
      })
      .then(res => {
        // console.log('loginSet:', res)
        // console.log('loginSet:', this.tokenName)
        wx.setStorage({
          key: "userInfo",
          data: res
        })
        wx.setStorage({
          key: this.tokenName,
          data: res[this.tokenName]
        })
        return res
      })
  }
  /* 加载页面检测app.globalData.userInfo是否存在 */
  setUserInfo(that) {
    // 如果app.globalData.userInfo存在，则setData
    if (this.app.globalData.userInfo) {
      that.setData({
        userInfo: this.app.globalData.userInfo,
        hasUserInfo: true
      })
      return new Promise((resolve) => {
        resolve(this.app.globalData.userInfo)
      })
    } else {
      // 如果app.globalData.userInfo不存在，则用getUserInfo获取用户信息
      return this.getSetting()
        .then(data => {
          // console.log('getSetting:', data, data.authSetting['scope.userInfo'])
          if (data.authSetting['scope.userInfo']) {
            return this.getUserInfo()
          } else {
            return false
          }
        })
        .then(data => {
          if (!data) return
          this.app.globalData.userInfo = data.userInfo
          that.setData({
            userInfo: data.userInfo,
            hasUserInfo: true
          })
          return new Promise((resolve) => {
            resolve(this.app.globalData.userInfo)
          })
        })
    }
  }
  /* 未注册提示 */
  loginConfirm() {
    this.showModal({
      title: '提示',
      cancelColor: '#BDBEBD',
      confirmColor: '#006EC0',
      confirmText: '立即认证',
      content: '您还不是姿客认证商户，点击【立即认证】，填写您真实的商家信息，我们会第一时间给您安排审核哦~',
    }).then(res => {
      if (res.confirm) {
        wx.redirectTo({
          url: '/pages/common/login/login',
        })
      }
    })
  }
  /* 扫码错误提示 */
  QRcodeConfirm({
    route,
    content = '此二维码不存在或已失效，请提醒顾客关闭二维码界面并重新点击获取。'
  }) {
    let conetnt_end = content || '此二维码不存在或已失效，请提醒顾客关闭二维码界面并重新点击获取。'
    this.showModal({
        title: '提示',
        content: conetnt_end,
        showCancel: false,
        confirmColor: '#006EC0',
        confirmText: '知道了'
      })
      .then(res => {
        if (route === 'pages/index/index') return
        if (res.confirm) {
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      })
  }
  /*时间转换*/
  checkTime(i) {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  }
  formatTime(date) {
    var getFullYear = this.checkTime(date.getFullYear());
    var getMonth = this.checkTime(date.getMonth() + 1);
    var getDate = this.checkTime(date.getDate());
    var getHours = this.checkTime(date.getHours());
    var getMinutes = this.checkTime(date.getMinutes());
    var getSeconds = this.checkTime(date.getSeconds());
    return getFullYear + "-" + getMonth + "-" + getDate + " " + getHours + ":" + getMinutes + ":" + getSeconds;
  }
  /* 深拷贝 */
  deepCopy(data) {
    return JSON.parse(JSON.stringify(data));
  }
  /* 参数空缺提示 */
  formDataRequired(obj) {
    for (var objKey in obj) {
      if (!obj[objKey] && obj[objKey] !== 0) {
        return false;
      }
    }
    return true
  }
  /* 获取位置权限 */
  getUserLocation() {
    return this.getSetting()
      .then(res => {
        if (!res.authSetting['scope.userLocation']) {
          return this.authorize({
            scope: 'scope.userLocation',
          })
        }
        return res
      })
      .then(res => {
        return this.getLocation({})
      })
  }
  /* 根据数字生成一个数组 */
  createArr(num) {
    let newArr = []
    for (let i = 0; i < num; i++) {
      newArr[i] = i
    }
    return newArr
  }
  /* 把图片名称组成的字符串转换成数组Array */
  strToArr(str, separator) {
    var splitStr = separator || '|';
    var Arr = [];
    if (str) {
      Arr = str.split(splitStr)
    }
    return Arr;
  }
  /* 把图片名称组成的数组Array转换成字符串String */
  arrToStr(arr, separator) {
    var splitStr = separator || '|';
    var Str = arr.join(splitStr);
    if (arr.length === 1) {
      Str = arr[0]
    }
    if (arr.length === 0) {
      Str = ''
    }
    return Str;
  }
  /* 删除前缀 */
  urlSubstring(str, index) {
    let num = this.ossUrl.length;
    let idx = index || str.length;
    let newStr = str.substring(num, idx)
    return newStr
  }
  /* 补全前缀 */
  imgUrl(img, size, url) {
    let newUrl = img;
    let baseUrl = url || this.ossUrl;
    let urlAfter = size || '';
    if (size === 'sm') {
      urlAfter = '?x-oss-process=image/resize,w_132,h_132';
    }
    if (size === 'lg') {
      urlAfter = '?x-oss-process=image/resize,w_800,h_800';
    }
    if (img.indexOf('http') === -1) {
      // newUrl=baseUrl+newUrl;
      newUrl = baseUrl + newUrl + urlAfter;
    }
    return newUrl;
  }
  /* 保留两位小数 */
  returnFloat(val) {
    let value = val || 0
    var xsd = value.toString().split(".");
    if (xsd.length == 1) {
      value = value.toString() + ".00";
      return value;
    }
    if (xsd.length > 1) {
      if (xsd[1].length < 2) {
        value = value.toString() + "0";
      } else {
        value = xsd[0] + '.' + xsd[1].substr(0, 2);
      }
      return value;
    }
  }
}

export default Base;