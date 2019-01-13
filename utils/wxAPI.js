/*
 * @Description: 
 * @Author: xuqi
 * @Github: https://github.com/knight-peter
 * @LastEditors: xuqi
 */
import Config from '../config.js';
import promisify from './promisify.js';
const baseUrl = Config.baseUrl;
const appkey = Config.appkey;
const msgName = Config.response.msgName;
const statusName = Config.response.statusName;
const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效，请前往www.7yue.pro申请',
  3000: '期刊不存在',
};

class wxAPI {
  constructor() {
    this.baseUrl = Config.baseUrl;
    this.tokenName = Config.request.tokenName;
    this.tokenValue = Config[Config.request.tokenName];
    this.msgName = Config.response.msgName;
    this.statusName = Config.response.statusName;

  }
  /* 网络 */
  /* wx.request() 发起 HTTPS 网络请求 ----------------------------------------------------------------*/
  request({
    url,
    method = 'GET',
    data = {},
    header = {
      'content-type': 'application/json',
      [this.tokenName]: this.tokenValue,
    },
    complete = null
  }) {

    return this._return(this._request(url, method, data, header, complete));
  }
  _request(url, method, data, header, complete) {
    const wx_request = promisify(wx.request)
    return wx_request({
      url: this._url(url),
      method,
      data,
      header,
      complete,
    });
  }
  /* 上传，下载 */
  /* wx.downloadFile() 下载文件资源到本地，客户端直接发起一个 HTTPS GET 请求，返回文件的本地临时路径。---------- */
  downloadFile({
    url,
    complete = null
  }) {
    return this._return(this._downloadFile(url, complete));
  }
  _downloadFile(url, complete) {
    const wx_downloadFile = promisify(wx.downloadFile);
    return wx_downloadFile({
      url,
      header: {
        'content-type': 'multipart/form-data',
        [this.tokenName]: this.tokenValue,
      },
      complete,
    });
  }
  /* wx.uploadFile() 将本地资源上传到开发者服务器，客户端发起一个 HTTPS POST 请求，其中 content-type 为 multipart/form-data ------------ */
  uploadFile({
    url,
    filePath,
    name = 'file',
    formData = {},
    header,
    complete = null
  }) {
    return this._return(this._uploadFile(url, filePath, name, formData, header, complete));
  }
  _uploadFile(url, filePath, name, formData, header, complete) {
    const wx_uploadFile = promisify(wx.uploadFile);
    return wx_uploadFile({
      url,
      filePath,
      name,
      formData,
      header,
      complete,
    });
  }
  /* WebSocket */
  /* wx.connectSocket(OBJECT) 创建一个 WebSocket 连接。--------------------------------------- */
  connectSocket({
    url,
    complete = null
  }) {
    return this._return(this._connectSocket(url, complete));
  }
  _connectSocket(url, complete) {
    const wx_connectSocket = promisify(wx.connectSocket);
    return wx_connectSocket({
      url,
      header: {
        'content-type': 'application/json',
      },
      complete,
    });
  }
  /* wx.onSocketOpen(CALLBACK) 监听WebSocket连接打开事件。------------------------------------------------- */
  onSocketOpen() {
    return new Promise((resolve, reject) => {
      wx.onSocketOpen(res => {
        resolve(res);
      });
    });
  }
  /* wx.onSocketError(CALLBACK) 监听WebSocket错误。 */
  onSocketError() {
    return new Promise((resolve, reject) => {
      wx.onSocketError(res => {
        reject(res);
      });
    });
  }
  /* wx.sendSocketMessage(OBJECT) 通过 WebSocket 连接发送数据，需要先 wx.connectSocket，并在 wx.onSocketOpen 回调之后才能发送。--------- */
  sendSocketMessage({
    data,
    complete = null
  }) {
    return this._return(this._sendSocketMessage(data, complete));
  }
  _sendSocketMessage(data, complete) {
    const wx_sendSocketMessage = promisify(wx.sendSocketMessage);
    return wx_sendSocketMessage({
      url,
      complete,
    });
  }
  /* wx.onSocketMessage(CALLBACK) 监听WebSocket接受到服务器的消息事件。 */
  onSocketMessage() {
    return new Promise((resolve, reject) => {
      wx.onSocketMessage(res => {
        resolve(res);
      });
    });
  }
  /* wx.closeSocket(OBJECT) 关闭 WebSocket 连接。 */
  closeSocket({
    code = 1000,
    reason = '',
    complete = null
  }) {
    return this._return(this._closeSocket(code, complete));
  }
  _closeSocket(code, reason, complete) {
    const wx_closeSocket = promisify(wx.closeSocket);
    return wx_closeSocket({
      code,
      reason,
      complete,
    });
  }
  /* wx.onSocketClose(CALLBACK)  监听WebSocket关闭。 ---------------------------------------------- */
  onSocketClose() {
    return new Promise((resolve, reject) => {
      wx.onSocketClose(SocketTask => resolve(SocketTask));
    });
  }
  /* 媒体 */
  /* 音频 */
  /* wx.createInnerAudioContext() 创建并返回内部 audio 上下文 innerAudioContext 对象。本接口是 wx.createAudioContext 升级版。----------------- */
  createInnerAudioContext() {
    return new Promise((resolve, reject) => {
      const innerAudioContext = wx.createInnerAudioContext();
      resolve(innerAudioContext);
    });
  }
  /* wx.getAvailableAudioSources(Object object) 获取当前支持的音频输入源 -------------------------- */
  getAvailableAudioSources({
    wx_complete
  }) {
    const complete = !wx_complete ?
      null :
      wx_complete.complete ?
      wx_complete.complete :
      null;
    return this._return(this._getAvailableAudioSources(complete));
  }
  _getAvailableAudioSources(complete) {
    const wx_getAvailableAudioSources = promisify(wx.getAvailableAudioSources);
    return wx_getAvailableAudioSources({
      complete,
    });
  }
  /* 图片 */
  /* wx.chooseImage(OBJECT) 从本地相册选择图片或使用相机拍照。------------------------------- */
  chooseImage({
    count = 1, // 默认9
    sizeType = ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType = ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    complete = null,
  }) {
    return this._return(
      this._chooseImage(count, sizeType, sourceType, complete),
    );
  }
  _chooseImage(count, sizeType, sourceType, complete) {
    const wx_chooseImage = promisify(wx.chooseImage);
    return wx_chooseImage({
      count,
      sizeType,
      sourceType,
      complete,
    });
  }
  /* wx.previewImage(OBJECT) 预览图片。2.3.0起支持云文件ID。-------------------------------------------- */
  previewImage({
    current = '',
    urls,
    complete = null
  }) {
    return this._return(this._previewImage(current, urls, complete));
  }
  _previewImage(current, urls, complete) {
    const wx_previewImage = promisify(wx.previewImage);
    return wx_previewImage({
      current,
      urls,
      complete,
    });
  }
  /* wx.getImageInfo(OBJECT) 获取图片信息，倘若为网络图片，需先配置download域名才能生效。------------- */
  getImageInfo({
    src,
    complete
  }) {
    return this._return(this._getImageInfo(src, complete));
  }
  _getImageInfo(src, complete) {
    const wx_getImageInfo = promisify(wx.getImageInfo);
    return wx_getImageInfo({
      src,
      complete,
    });
  }
  /* wx.saveImageToPhotosAlbum(OBJECT) 保存图片到系统相册。需要用户授权 scope.writePhotosAlbum */
  saveImageToPhotosAlbum({
    filePath, //	图片保存在小程序中的文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
    complete = null,
  }) {
    return this._return(this._saveImageToPhotosAlbum(filePath, complete));
  }
  _saveImageToPhotosAlbum(filePath, complete) {
    const wx_saveImageToPhotosAlbum = promisify(wx.saveImageToPhotosAlbum);
    return wx_saveImageToPhotosAlbum({
      filePath,
      complete,
    });
  }
  /* 录音 */
  /* wx.getRecorderManager() 获取全局唯一的录音管理器 recorderManager。 */
  getRecorderManager() {
    return new Promise((resolve, reject) => {
      const recorderManager = wx.getRecorderManager();
      resolve(recorderManager);
    });
  }
  /* 背景音频播放管理 */
  getBackgroundAudioManager() {
    return new Promise((resolve, reject) => {
      const backgroundAudioManager = wx.getBackgroundAudioManager();
      resolve(backgroundAudioManager);
    });
  }

  /* wx.saveVideoToPhotosAlbum(Object object) 调用前需要 用户授权 scope.writePhotosAlbum 保存视频到系统相册 */
  saveVideoToPhotosAlbum({
    filePath,
    complete
  }) {
    return this._return(this._saveVideoToPhotosAlbum(filePath, complete));
  }
  _saveVideoToPhotosAlbum(filePath, complete) {
    const wx_saveVideoToPhotosAlbum = promisify(wx.saveVideoToPhotosAlbum);
    return wx_saveVideoToPhotosAlbum({
      filePath,
      complete,
    });
  }
  /* wx.chooseVideo(OBJECT) 拍摄视频或从手机相册中选视频，返回视频的临时文件路径。 */
  chooseVideo({
    sourceType = ['album', 'camera'],
    compressed = true,
    maxDuration = 10,
    complete = null,
  }) {
    return this._chooseVideo(sourceType, compressed, maxDuration, complete)
  }
  _chooseVideo(sourceType, compressed, maxDuration, complete) {
    const wx_chooseVideo = promisify(wx.chooseVideo);
    return wx_chooseVideo({
      sourceType,
      compressed,
      maxDuration,
      complete,
    });
  }
  /* wx.setInnerAudioOption(Object object) 设置 InnerAudioContext 的播放选项，设置之后对当前小程序全局生效------------------- */
  setInnerAudioOption({
    wx_complete
  }) {
    const complete = !wx_complete ?
      null :
      wx_complete.complete ?
      wx_complete.complete :
      null;
    return this._return(this._setInnerAudioOption(complete));
  }
  _setInnerAudioOption(complete) {
    const wx_setInnerAudioOption = promisify(wx.setInnerAudioOption);
    return wx_setInnerAudioOption({
      complete,
    });
  }
  /* 文件 */
  /* wx.saveFile(Object object)保存文件到本地。注意：saveFile 会把临时文件移动，因此调用成功后传入的 tempFilePath 将不可用 */
  saveFile({
    tempFilePath,
    complete = null
  }) {
    return this._return(this._saveFile(tempFilePath, complete));
  }
  _saveFile(tempFilePath, complete) {
    const wx_saveFile = promisify(wx.saveFile);
    return wx_saveFile({
      tempFilePath,
      complete,
    });
  }
  /* wx.openDocument(Object object) 新开页面打开文档 */
  openDocument({
    filePath,
    wx_complete
  }) {
    const complete = !wx_complete ?
      null :
      wx_complete.complete ?
      wx_complete.complete :
      null;
    return _openDocument(filePath, complete);
  }
  _openDocument(filePath, complete) {
    const wx_openDocument = promisify(wx.openDocument);
    return wx_openDocument({
      filePath,
      complete,
    });
  }
  /* wx.getSavedFileList(Object object) 获取该小程序下已保存的本地缓存文件列表 */
  getSavedFileList({
    wx_complete
  }) {
    const complete = !wx_complete ?
      null :
      wx_complete.complete ?
      wx_complete.complete :
      null;
    return this._return(this._getSavedFileList(complete));
  }
  _getSavedFileList(complete) {
    const wx_getSavedFileList = promisify(wx.getSavedFileList);
    return wx_getSavedFileList({
      complete,
    });
  }
  /* wx.getSavedFileInfo(Object object) 获取本地文件的文件信息。此接口只能用于获取已保存到本地的文件，若需要获取临时文件信息，请使用 wx.getFileInfo() 接口。----- */
  getSavedFileInfo({
    filePath,
    complete = null
  }) {
    return this._return(this._getSavedFileInfo(filePath, complete));
  }
  _getSavedFileInfo(filePath, complete) {
    const wx_getSavedFileInfo = promisify(wx.getSavedFileInfo);
    return wx_getSavedFileInfo({
      filePath,
      complete,
    });
  }
  /* wx.removeSavedFile(Object object) 删除本地缓存文件 */
  removeSavedFile({
    filePath,
    complete = null
  }) {
    return this._return(this._removeSavedFile(filePath, complete));
  }
  _removeSavedFile(filePath, complete) {
    const wx_removeSavedFile = promisify(wx.removeSavedFile);
    return wx_removeSavedFile({
      filePath,
      complete,
    });
  }
  /* wx.getFileInfo(Object object) 获取文件信息 */
  getFileInfo({
    filePath,
    digestAlgorithm = 'md5',
    complete = null
  }) {
    return this._return(this._getFileInfo(filePath, digestAlgorithm, complete));
  }
  _getFileInfo(filePath, digestAlgorithm, complete) {
    const wx_getFileInfo = promisify(wx.getFileInfo);
    return wx_getFileInfo({
      filePath,
      digestAlgorithm,
      complete,
    });
  }
  /* wx.getFileSystemManager() 获取全局唯一的文件管理器 FileSystemManager */
  getFileSystemManager() {
    return new Promise((resolve, reject) => {
      const FileSystemManager = wx.getFileSystemManager();
      resolve(FileSystemManager);
    });
  }
  /* 数据缓存 */
  /* wx.getStorage(Object object) 从本地缓存中异步获取指定 key 的内容 -------------------------- */
  getStorage({
    key,
    complete = null
  }) {
    return this._getStorage(key, complete);
  }
  _getStorage(key, complete) {
    const wx_getStorage = promisify(wx.getStorage);
    return wx_getStorage({
      key,
      complete,
    });
  }
  /* wx.setStorage(Object object) 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容。------- */
  setStorage({
    key,
    data,
    complete = null
  }) {
    return this._return(this._setStorage(key, data, complete));
  }
  _setStorage(key, data, complete) {
    const wx_setStorage = promisify(wx.setStorage);
    return wx_setStorage({
      key,
      data,
      complete,
    });
  }

  /* wx.removeStorage(Object object) 从本地缓存中移除指定 key */
  removeStorage({
    key,
    complete = null
  }) {
    return this._return(this._removeStorage(key, complete));
  }
  _removeStorage(key, complete) {
    const wx_removeStorage = promisify(wx.removeStorage);
    return wx_removeStorage({
      key,
      complete,
    });
  }
  /* wx.clearStorage(Object object) 清理本地数据缓存------------------------------------------------------ */
  clearStorage({
    wx_complete
  }) {
    const complete = !wx_complete ?
      null :
      wx_complete.complete ?
      wx_complete.complete :
      null;
    return this._return(this._clearStorage(complete));
  }
  _clearStorage(complete) {
    const wx_clearStorage = promisify(wx.clearStorage);
    return wx_clearStorage({
      complete,
    });
  }
  /* wx.getStorageInfo(Object object) 异步获取当前storage的相关信息 */
  getStorageInfo(wx_complete) {
    const complete = !wx_complete ?
      null :
      wx_complete.complete ?
      wx_complete.complete :
      null;
    return this._return(this._getStorageInfo(complete));
  }
  _getStorageInfo(complete) {
    const wx_getStorageInfo = promisify(wx.getStorageInfo);
    return wx_getStorageInfo({
      complete,
    });
  }
  /* 位置 */
  /* wx.getLocation(Object object) 获取当前的地理位置、速度。当用户离开小程序后，此接口无法调用。------------ */
  getLocation({
    type = 'wgs84',
    altitude = 'false',
    complete = null
  }) {
    return this._return(this._getLocation(type, altitude, complete));
  }
  _getLocation(type, altitude, complete) {
    const wx_getLocation = promisify(wx.getLocation);
    return wx_getLocation({
      type,
      altitude,
      complete,
    });
  }
  /* wx.openLocation(Object object) ​使用微信内置地图查看位置。 */
  openLocation({
    latitude,
    longitude,
    scale = 18,
    complete = null
  }) {
    return this._return(
      this._openLocation(latitude, longitude, scale, complete),
    );
  }
  _openLocation(latitude, longitude, scale, complete) {
    const wx_openLocation = promisify(wx.openLocation);
    return wx_openLocation({
      latitude,
      longitude,
      scale,
      complete,
    });
  }
  /* wx.chooseLocation(Object object) 打开地图选择位置。 */
  chooseLocation(wx_complete) {
    const complete = !wx_complete ?
      null :
      wx_complete.complete ?
      wx_complete.complete :
      null;
    return this._chooseLocation(complete);
  }
  _chooseLocation(complete) {
    const wx_chooseLocation = promisify(wx.chooseLocation);
    return wx_chooseLocation({
      complete,
    });
  }
  /* 设备 */
  /* 网络 */
  /* wx.getNetworkType(Object object) 获取网络类型 */
  getNetworkType(wx_complete) {
    const complete = !wx_complete ?
      null :
      wx_complete.complete ?
      wx_complete.complete :
      null;
    return this._return(this._getNetworkType(complete));
  }
  _getNetworkType(complete) {
    const wx_getNetworkType = promisify(wx.getNetworkType);
    return wx_getNetworkType({
      complete,
    });
  }
  /* wx.onNetworkStatusChange(function callback) 监听网络状态变化事件 */
  onNetworkStatusChange() {
    return new Promise((resolve, reject) => {
      wx.onNetworkStatusChange(res => {
        resolve(res);
      });
    });
  }
  /* wx.startAccelerometer(Object object) 开始监听加速度数据。 */
  startAccelerometer({
    interval = 'normal',
    complete = null
  }) {
    return this._return(this._startAccelerometer(interval, complete));
  }
  _startAccelerometer(interval, complete) {
    const wx_startAccelerometer = promisify(wx.startAccelerometer);
    return wx_startAccelerometer({
      interval,
      complete,
    });
  }
  /* wx.stopAccelerometer(Object object) 停止监听加速度数据。 */
  stopAccelerometer(wx_complete) {
    const complete = !wx_complete ?
      null :
      wx_complete.complete ?
      wx_complete.complete :
      null;
    return this._return(this._stopAccelerometer(complete));
  }
  _stopAccelerometer(complete) {
    const wx_stopAccelerometer = promisify(wx.stopAccelerometer);
    return wx_stopAccelerometer({
      complete,
    });
  }
  /* wx.onAccelerometerChange(function callback) 监听加速度数据事件。频率根据 wx.startAccelerometer() 的 interval 参数。可使用 wx.stopAccelerometer() 停止监听。----- */
  onAccelerometerChange() {
    return new Promise((resolve, reject) => {
      wx.onAccelerometerChange(res => resolve(res));
    });
  }
  /* 剪切板 */
  /* wx.getClipboardData(Object object) 获取系统剪贴板的内容 */
  getClipboardData(wx_complete) {
    const complete = !wx_complete ?
      null :
      wx_complete.complete ?
      wx_complete.complete :
      null;
    return this._return(this._getClipboardData(complete));
  }
  _getClipboardData(complete) {
    const wx_getClipboardData = promisify(wx.getClipboardData);
    return wx_getClipboardData({
      complete,
    });
  }
  /* wx.setClipboardData(Object object) 设置系统剪贴板的内容 */
  setClipboardData({
    data,
    complete = null
  }) {
    return this._return(this._setClipboardData(data, complete));
  }
  _setClipboardData(data, complete) {
    const wx_setClipboardData = promisify(wx.setClipboardData);
    return wx_setClipboardData({
      data,
      complete,
    });
  }
  /* 罗盘 */
  /* wx.startCompass(Object object) 开始监听罗盘数据 */
  startCompass(wx_complete) {
    const complete = !wx_complete ?
      null :
      wx_complete.complete ?
      wx_complete.complete :
      null;
    return this._return(this._startCompass(complete));
  }
  _startCompass(complete) {
    const wx_startCompass = promisify(wx.startCompass);
    return wx_startCompass({
      complete,
    });
  }
  /* wx.stopCompass(Object object) 停止监听罗盘数据 */
  stopCompass(wx_complete) {
    const complete = !wx_complete ?
      null :
      wx_complete.complete ?
      wx_complete.complete :
      null;
    return this._return(this._stopCompass(complete));
  }
  _stopCompass(complete) {
    const wx_stopCompass = promisify(wx.stopCompass);
    return wx_stopCompass({
      complete,
    });
  }
  /* wx.onCompassChange(function callback) 监听罗盘数据变化事件，频率：5 次/秒，接口调用后会自动开始监听，可使用 wx.stopCompass 停止监听。------- */
  onCompassChange() {
    return new Promise((resolve, reject) => {
      wx.onCompassChange(res => {
        resolve(res);
      });
    });
  }
  /* 联系人 */
  /* wx.addPhoneContact(Object object) 添加手机通讯录联系人。用户可以选择将该表单以「新增联系人」或「添加到已有联系人」的方式，写入手机系统通讯录 ----- */
  addPhoneContact({
    firstName,
    photoFilePath = null,
    nickName = null,
    lastName = null,
    middleName = null,
    remark = null,
    mobilePhoneNumber = null,
    weChatNumber = null,
    addressCountry = null,
    addressState = null,
    addressCity = null,
    addressStreet = null,
    addressPostalCode = null,
    organization = null,
    title = null,
    workFaxNumber = null,
    workPhoneNumber = null,
    hostNumber = null,
    email = null,
    url = null,
    workAddressCountry = null,
    workAddressState = null,
    workAddressCity = null,
    workAddressStreet = null,
    workAddressPostalCode = null,
    homeFaxNumber = null,
    homePhoneNumber = null,
    homeAddressCountry = null,
    homeAddressState = null,
    homeAddressCity = null,
    homeAddressStreet = null,
    homeAddressPostalCode = null,
    complete = null,
  }) {
    return this._return(
      this._addPhoneContact(
        firstName,
        photoFilePath,
        nickName,
        lastName,
        middleName,
        remark,
        mobilePhoneNumber,
        weChatNumber,
        addressCountry,
        addressState,
        addressCity,
        addressStreet,
        addressPostalCode,
        organization,
        title,
        workFaxNumber,
        workPhoneNumber,
        hostNumber,
        email,
        url,
        workAddressCountry,
        workAddressState,
        workAddressCity,
        workAddressStreet,
        workAddressPostalCode,
        homeFaxNumber,
        homePhoneNumber,
        homeAddressCountry,
        homeAddressState,
        homeAddressCity,
        homeAddressStreet,
        homeAddressPostalCode,
        complete,
      ),
    );
  }
  _addPhoneContact(
    firstName,
    photoFilePath,
    nickName,
    lastName,
    middleName,
    remark,
    mobilePhoneNumber,
    weChatNumber,
    addressCountry,
    addressState,
    addressCity,
    addressStreet,
    addressPostalCode,
    organization,
    title,
    workFaxNumber,
    workPhoneNumber,
    hostNumber,
    email,
    url,
    workAddressCountry,
    workAddressState,
    workAddressCity,
    workAddressStreet,
    workAddressPostalCode,
    homeFaxNumber,
    homePhoneNumber,
    homeAddressCountry,
    homeAddressState,
    homeAddressCity,
    homeAddressStreet,
    homeAddressPostalCode,
    complete,
  ) {
    const wx_addPhoneContact = promisify(wx.addPhoneContact);
    return wx_addPhoneContact({
      firstName,
      photoFilePath,
      nickName,
      lastName,
      middleName,
      remark,
      mobilePhoneNumber,
      weChatNumber,
      addressCountry,
      addressState,
      addressCity,
      addressStreet,
      addressPostalCode,
      organization,
      title,
      workFaxNumber,
      workPhoneNumber,
      hostNumber,
      email,
      url,
      workAddressCountry,
      workAddressState,
      workAddressCity,
      workAddressStreet,
      workAddressPostalCode,
      homeFaxNumber,
      homePhoneNumber,
      homeAddressCountry,
      homeAddressState,
      homeAddressCity,
      homeAddressStreet,
      homeAddressPostalCode,
      complete,
    });
  }
  /* 陀螺仪 */
  /* iBeacon */
  /* 设备方向 */
  /* 电量 */
  /* 电话 */
  /* wx.makePhoneCall(Object object) 拨打电话 */
  makePhoneCall({
    phoneNumber,
    complete = null
  }) {
    return this._return(this._makePhoneCall(phoneNumber, complete));
  }
  _makePhoneCall(phoneNumber, complete) {
    const wx_makePhoneCall = promisify(wx.makePhoneCall);
    return wx_makePhoneCall({
      phoneNumber,
      complete,
    });
  }
  /* 扫码 */
  /* wx.scanCode(Object object) 调起客户端扫码界面进行扫码 */
  scanCode({
    onlyFromCamera = false,
    scanType = ['barCode', 'qrCode'],
    complete = null,
  }) {
    return this._scanCode(onlyFromCamera, scanType, complete);
  }
  _scanCode(onlyFromCamera, scanType, complete) {
    const wx_scanCode = promisify(wx.scanCode);
    return wx_scanCode({
      onlyFromCamera,
      scanType,
      complete,
    });
  }
  /* 振动 */
  /* wx.vibrateShort(Object object)使手机发生较短时间的振动（15 ms）。仅在 iPhone 7 / 7 Plus 以上及 Android 机型生效----- */
  vibrateShort(wx_complete) {
    const complete = !wx_complete ?
      null :
      wx_complete.complete ?
      wx_complete.complete :
      null;
    return this._return(this._vibrateShort(complete));
  }
  _vibrateShort(complete) {
    const wx_vibrateShort = promisify(wx.vibrateShort);
    return wx_vibrateShort({
      complete,
    });
  }
  /* wx.vibrateLong(Object object)使手机发生较长时间的振动（400 ms)----- */
  vibrateShort(wx_complete) {
    const complete = !wx_complete ?
      null :
      wx_complete.complete ?
      wx_complete.complete :
      null;
    return this._return(this._vibrateShort(complete));
  }
  _vibrateShort(complete) {
    const wx_vibrateShort = promisify(wx.vibrateShort);
    return wx_vibrateShort({
      complete,
    });
  }
  /* 性能 */
  /* 蓝牙 */
  /* NFC */
  /* 屏幕 */
  /* Wi-Fi */
  /* 界面 */
  /* 下拉刷新 */
  /* wx.startPullDownRefresh(Object object) 开始下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致。----- */
  startPullDownRefresh(wx_complete) {
    const complete = !wx_complete ?
      null :
      wx_complete.complete ?
      wx_complete.complete :
      null;
    return this._return(this._startPullDownRefresh(complete));
  }
  _startPullDownRefresh(complete) {
    const wx_startPullDownRefresh = promisify(wx.startPullDownRefresh);
    return wx_startPullDownRefresh({
      complete,
    });
  }
  /* wx.stopPullDownRefresh(Object object) 停止当前页面下拉刷新。------------------------------------------------- */
  stopPullDownRefresh(wx_complete) {
    const complete = !wx_complete ?
      null :
      wx_complete.complete ?
      wx_complete.complete :
      null;
    return this._return(this._stopPullDownRefresh(complete));
  }
  _stopPullDownRefresh(complete) {
    const wx_stopPullDownRefresh = promisify(wx.stopPullDownRefresh);
    return wx_stopPullDownRefresh({
      complete,
    });
  }
  /* 自定义组件 */
  /* 菜单 */
  /* 交互 */
  /* wx.showModal(Object object) 显示模态对话框------------------------------------------------------- */
  showModal({
    title,
    content,
    showCancel = true,
    cancelText = '取消',
    cancelColor = '#000000',
    confirmText = '确定',
    confirmColor = '#3cc51f',
    complete = null,
  }) {
    return this._showModal(
      title,
      content,
      showCancel,
      cancelText,
      cancelColor,
      confirmText,
      confirmColor,
      complete,
    )
  }
  _showModal(
    title,
    content,
    showCancel,
    cancelText,
    cancelColor,
    confirmText,
    confirmColor,
    complete,
  ) {
    const wx_showModal = promisify(wx.showModal);
    return wx_showModal({
      title,
      content,
      showCancel,
      cancelText,
      cancelColor,
      confirmText,
      confirmColor,
      complete,
    });
  }
  /*wx.showToast(Object object) 显示消息提示框 -------------------------------------------------------------------*/
  showToast({
    title,
    icon = 'none',
    image = null,
    duration = 1000,
    mask = false,
    complete = null,
  }) {
    return this._return(
      this._showToast(title, icon, image, duration, mask, complete),
    );
  }
  _showToast(title, icon, image, duration, mask, complete) {
    const wx_showToast = promisify(wx.showToast);
    return wx_showToast({
      icon,
      title,
      image,
      duration,
      mask,
      complete
    });
  }
  /* wx.showLoading(Object object) 显示 loading 提示框, 需主动调用 wx.hideLoading 才能关闭提示框 */
  showLoading({
    title,
    mask = false,
    complete = null
  }) {
    return this._return(this._showLoading(title, mask, complete));
  }
  _showLoading(title, mask, complete) {
    const wx_showLoading = promisify(wx.showLoading);
    return wx_showLoading({
      title,
      mask,
      complete,
    });
  }
  /* wx.hideLoading(Object object) 隐藏 loading 提示框 ----------------------------------------- */
  /* wx.hideToast(Object object) 隐藏消息提示框 ------------------------------------------------ */
  /* wx.showActionSheet(Object object) ------------------------------------------------------- */
  showActionSheet({
    itemList = [],
    itemColor = '#000000',
    complete = null
  }) {
    return this._return(this._showActionSheet(itemList, itemColor, complete));
  }
  _showActionSheet(itemList, itemColor, complete) {
    const wx_showActionSheet = promisify(wx.showActionSheet);
    return wx_showActionSheet({
      itemList,
      itemColor,
      complete,
    });
  }
  /* 设置导航条 */
  /* wx.setNavigationBarTitle(OBJECT) 动态设置当前页面的标题。 ----------------------------------------- */
  setNavigationBarTitle(options) {
    let {
      title = '小程序标题',
        complete = null
    } = options || {}
    return this._return(this._setNavigationBarTitle(title, complete));
  }
  _setNavigationBarTitle(title, complete) {
    const wx_setNavigationBarTitle = promisify(wx.setNavigationBarTitle);
    return wx_setNavigationBarTitle({
      title,
      complete,
    });
  }
  /* wx.setNavigationBarColor(OBJECT) ------------------------------------------------------------ */
  setNavigationBarColor({
    frontColor = '#000000',
    backgroundColor = '#ffffff',
    animation = {
      duration: 0,
      timingFunc: 'linear',
    },
    complete = null,
  }) {
    return this._return(
      this._setNavigationBarColor(
        frontColor,
        backgroundColor,
        animation,
        complete,
      ),
    );
  }
  _setNavigationBarColor(frontColor, backgroundColor, animation, complete) {
    const wx_setNavigationBarColor = promisify(wx.setNavigationBarColor);
    return wx_setNavigationBarColor({
      frontColor,
      backgroundColor,
      animation,
      complete,
    });
  }

  /* 设置tabBar */
  /* wx.setTabBarBadge(OBJECT) 为 tabBar 某一项的右上角添加文本 ------------------------------------ */
  setTabBarBadge({
    index,
    text,
    complete = null
  }) {
    return this._return(this._setTabBarBadge(index, text, complete));
  }
  _setTabBarBadge(index, text, complete) {
    const wx_setTabBarBadge = promisify(wx.setTabBarBadge);
    return wx_setTabBarBadge({
      index,
      text,
      complete,
    });
  }
  /* wx.removeTabBarBadge(OBJECT) 移除 tabBar 某一项右上角的文本 -------------------------------------- */
  removeTabBarBadge({
    index,
    complete = null
  }) {
    return this._return(this._removeTabBarBadge(index, complete));
  }
  _removeTabBarBadge(index, complete) {
    const wx_removeTabBarBadge = promisify(wx.removeTabBarBadge);
    return wx_removeTabBarBadge({
      index,
      complete,
    });
  }
  /* wx.showTabBarRedDot(OBJECT) 显示 tabBar 某一项的右上角的红点 ----------------------------------- */
  showTabBarRedDot({
    index,
    complete = null
  }) {
    return this._return(this._showTabBarRedDot(index, complete));
  }
  _showTabBarRedDot(index, complete) {
    const wx_showTabBarRedDot = promisify(wx.showTabBarRedDot);
    return wx_showTabBarRedDot({
      index,
      complete,
    });
  }
  /* wx.setTabBarItem(OBJECT) 动态设置 tabBar 某一项的内容 ------------------------------------ */
  setTabBarItem({
    index,
    text = '',
    iconPath = '',
    selectedIconPath = '',
    complete = null,
  }) {
    return this._return(
      this._setTabBarItem(index, text, iconPath, selectedIconPath, complete),
    );
  }
  _setTabBarItem(index, text, iconPath, selectedIconPath, complete) {
    const wx_setTabBarItem = promisify(wx.setTabBarItem);
    return wx_setTabBarItem({
      index,
      text,
      iconPath,
      selectedIconPath,
      complete,
    });
  }
  /* wx.showTabBar(OBJECT) 显示 tabBar --------------------------------------------------------------------- */
  showTabBar({
    animation = false,
    complete = null
  }) {
    return this._return(this._showTabBar(animation, complete));
  }
  _showTabBar(animation, complete) {
    const wx_showTabBar = promisify(wx.showTabBar);
    return wx_showTabBar({
      animation,
      complete,
    });
  }
  /* wx.hideTabBar(OBJECT) 隐藏 tabBar ----------------------------------------------------------------------- */
  hideTabBar({
    animation = false,
    complete = null
  }) {
    return this._return(this._hideTabBar(animation, complete));
  }
  _hideTabBar(animation, complete) {
    const wx_hideTabBar = promisify(wx.hideTabBar);
    return wx_hideTabBar({
      animation,
      complete,
    });
  }
  /* 设置窗口背景 */
  /* 设置置顶信息 */
  /* 导航 */
  /* wx.navigateTo(OBJECT) 保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。 ----------------------- */
  navigateTo({
    url,
    complete = null
  }) {
    return this._return(this._navigateTo(url, complete))
  }
  _navigateTo(url, complete) {
    const wx_navigateTo = promisify(wx.navigateTo)
    return wx_navigateTo({
      url,
      complete
    })
  }
  /* wx.redirectTo(OBJECT) 关闭当前页面，跳转到应用内的某个页面。 ------------------------------------ */
  redirectTo({
    url,
    complete = null
  }) {
    return this._return(this._redirectTo(url, complete))
  }
  _redirectTo(url, complete) {
    const wx_redirectTo = promisify(wx.redirectTo)
    return wx_redirectTo({
      url,
      complete
    })
  }
  /* wx.switchTab(OBJECT) 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面 -------------------------------- */
  switchTab({
    url,
    complete = null
  }) {
    return this._return(this._switchTab(url, complete))
  }
  _switchTab(url, complete) {
    const wx_switchTab = promisify(wx.switchTab)
    return wx_switchTab({
      url,
      complete
    })
  }
  /* wx.reLaunch(OBJECT) 关闭所有页面，打开到应用内的某个页面。 ----------------------------------------- */
  reLaunch({
    url,
    complete
  }) {
    return this._return(this._reLaunch(url, complete))
  }
  _reLaunch(url, complete) {
    const wx_reLaunch = promisify(wx.reLaunch)
    return wx_reLaunch({
      url,
      complete
    })
  }
  /* 动画 */
  /* 位置 */
  /* 绘图 */
  /* 下拉刷新 */
  /* Page.onPullDownRefresh() 在 Page 中定义 onPullDownRefresh 处理函数，监听该页面用户下拉刷新事件。 */
  /* wx.startPullDownRefresh(OBJECT) 开始下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致 ------------------------- */
  startPullDownRefresh(wx_complete) {
    const complete = !wx_complete ?
      null :
      wx_complete.complete ?
      wx_complete.complete :
      null;
    return this._return(this._startPullDownRefresh(complete))
  }
  _startPullDownRefresh(complete) {
    const wx_startPullDownRefresh = promisify(wx.startPullDownRefresh)
    return wx_startPullDownRefresh({
      complete
    })
  }
  /* 第三方平台 */
  /* wx.getExtConfig(OBJECT) 获取第三方平台自定义的数据字段。 ---------------------------------------------------- */
  getExtConfig(wx_complete) {
    const complete = !wx_complete ?
      null :
      wx_complete.complete ?
      wx_complete.complete :
      null;
    return this._return(this._getExtConfig(complete))
  }
  _getExtConfig(complete) {
    const wx_getExtConfig = promisify(wx.getExtConfig)
    return wx_getExtConfig({
      complete
    })
  }
  /* 开发接口 */
  /* 设置 */
  /* wx.getSetting(Object object) 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限。-----------| */
  getSetting(wx_complete) {
    const complete = !wx_complete ?
      null :
      wx_complete.complete ?
      wx_complete.complete :
      null;
    return this._return(this._getSetting(complete))
  }
  _getSetting(complete) {
    const wx_getSetting = promisify(wx.getSetting)
    return wx_getSetting({
      complete
    })
  }
  /* 收货地址 */
  /* wx.chooseAddress(Object object) 调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址。 */
  /* 调用前需要 用户授权 scope.address */
  chooseAddress(wx_complete) {
    const complete = !wx_complete ?
      null :
      wx_complete.complete ?
      wx_complete.complete :
      null;
    return this._return(this._chooseAddress(complete))
  }
  _chooseAddress(complete) {
    const wx_chooseAddress = promisify(wx.chooseAddress)
    return wx_chooseAddress({
      complete
    })
  }
  /* 授权 */
  /* wx.authorize(OBJECT) 提前向用户发起授权请求。调用后会立刻弹窗询问用户是否同意授权小程序使用某项功能或获取用户的某些数据，但不会实际调用对应接口。如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。------ */
  /* 注意：wx.authorize({scope: "scope.userInfo"})，无法弹出授权窗口，请使用 <button open-type="getUserInfo"></button> */
  authorize({
    scope,
    complete = null
  }) {
    return this._return(this._authorize(scope, complete))
  }
  _authorize(scope, complete) {
    const wx_authorize = promisify(wx.authorize)
    return wx_authorize({
      scope,
      complete
    })
  }
  /* 卡券 */
  /* wx.addCard(Object object) 批量添加卡券。只有通过 认证 的小程序才能使用。更多文档请参考 微信卡券接口文档。 -------------------------------------------------- */
  addCard({
    cardList = [],
    complete = null
  }) {
    return this._return(this._addCard(cardList, complete))
  }
  _addCard(cardList, complete) {
    const wx_addCard = promisify(wx.addCard)
    return wx_addCard({
      cardList,
      complete
    })
  }
  /* 发票 */
  /* wx.chooseInvoice(Object object) 选择用户已有的发票 */
  /* 调用前需要 用户授权 scope.invoice */
  chooseInvoice(wx_complete) {
    const complete = !wx_complete ?
      null :
      wx_complete.complete ?
      wx_complete.complete :
      null;
    return this._return(this._chooseInvoice(complete))
  }
  _chooseInvoice(complete) {
    const wx_chooseInvoice = promisify(wx.chooseInvoice)
    return wx_chooseInvoice({
      complete
    })
  }
  /* wx.faceVerifyForPay(Object object) 支付各个安全场景验证人脸 ---------------------------------- */
  faceVerifyForPay({
    scene,
    packages,
    packageSign,
    otherVerifyTitle,
    complete = null
  }) {
    return this._return(this._faceVerifyForPay(scene, packages, packageSign, otherVerifyTitle, complete))
  }
  _faceVerifyForPay(scene, packages, packageSign, otherVerifyTitle, complete) {
    const wx_faceVerifyForPay = promisify(wx.faceVerifyForPay)
    return wx_faceVerifyForPay({
      scene,
      packages,
      packageSign,
      otherVerifyTitle,
      complete
    })
  }
  /* wx.requestPayment(Object object) 发起微信支付。了解更多信息，请查看微信支付接口文档 ------------------------------- */
  requestPayment({
    timeStamp,
    nonceStr,
    packages,
    signType,
    paySign,
    complete = null
  }) {
    return this._return(this._requestPayment(timeStamp,
      nonceStr,
      packages,
      signType,
      paySign,
      complete))
  }
  _requestPayment(timeStamp,
    nonceStr,
    packages,
    signType,
    paySign,
    complete) {
    const wx_requestPayment = promisify(wx.requestPayment)
    return wx_requestPayment({
      timeStamp,
      nonceStr,
      packages,
      signType,
      paySign,
      complete
    })
  }
  /* wx.getUserInfo(Object object) 获取用户信息。 --------------------------------------------------- */
  /* 调用前需要 用户授权 scope.userInfo。 */
  getUserInfo(options) {
    let {
      withCredentials = false,
        lang = 'en',
        complete = null
    } = options || {}
    return this._return(this._getUserInfo(withCredentials, lang, complete))
  }
  _getUserInfo(withCredentials, lang, complete) {
    const wx_getUserInfo = promisify(wx.getUserInfo)
    return wx_getUserInfo({
      withCredentials,
      lang,
      complete
    })
  }
  /* 微信运动 */
  /* wx.getWeRunData(Object object) 获取用户过去三十天微信运动步数，需要先调用 wx.login 接口--------------- */
  getWeRunData(wx_complete) {
    const complete = !wx_complete ?
      null :
      wx_complete.complete ?
      wx_complete.complete :
      null;
    return this._return(this._getWeRunData(complete))
  }
  _getWeRunData(complete) {
    const wx_getWeRunData = promisify(wx.getWeRunData)
    return wx_getWeRunData({
      complete
    })
  }

  /* 登录 */
  /* wx.login(OBJECT) 调用接口wx.login() 获取临时登录凭证（code）--------------------------------------- */
  login(obj) {
    let {
      timeout = 30000,
        complete = null
    } = obj ? obj : {}
    return this._return(this._login(timeout, complete))
  }
  _login(timeout, complete) {
    const wx_login = promisify(wx.login)
    return wx_login({
      timeout,
      complete,
    })
  }
  /* wx.checkSession(OBJECT) 校验用户当前session_key是否有效。 ----------------------------------- */
  checkSession(wx_complete) {
    const complete = !wx_complete ?
      null :
      wx_complete.complete ?
      wx_complete.complete :
      null;
    return this._return(this._checkSession(complete))
  }
  _checkSession(complete) {
    const wx_checkSession = promisify(wx.checkSession)
    return wx_checkSession({
      complete
    })
  }

  /* 生物认证 */
  /* wx.checkIsSoterEnrolledInDevice(Object object) 获取设备内是否录入如指纹等生物信息的接口 -------------------------- */
  checkIsSoterEnrolledInDevice({
    checkAuthMode = [],
    complete = null
  }) {
    return this._return(this._checkIsSoterEnrolledInDevice(checkAuthMode, complete))
  }
  _checkIsSoterEnrolledInDevice(checkAuthMode, complete) {
    const wx_checkIsSoterEnrolledInDevice = promisify(wx.checkIsSoterEnrolledInDevice)
    return wx_checkIsSoterEnrolledInDevice({
      checkAuthMode,
      complete
    })
  }
  /* 小程序跳转 返回到上一个小程序，只有在当前小程序是被其他小程序打开时可以调用成功 -------------------- */
  navigateBackMiniProgram({
    extraData = {},
    complete = null
  }) {
    return this._return(this._navigateBackMiniProgram(extraData, complete))
  }
  _navigateBackMiniProgram(extraData, complete) {
    const wx_navigateBackMiniProgram = promisify(wx.navigateBackMiniProgram)
    return wx_navigateBackMiniProgram({
      extraData,
      complete
    })
  }
  /* 接口调用凭证 */
  /* 统一服务消息 */
  /* 客服消息 */
  /* wx.getSystemInfo() 获取系统信息 ------------------------------------------------------------------------ */
  getSystemInfo(wx_complete) {
    const complete = !wx_complete ?
      null :
      wx_complete.complete ?
      wx_complete.complete :
      null;
    return this._return(this._getSystemInfo(complete));
  }
  _getSystemInfo(complete) {
    const wx_getSystemInfo = promisify(wx.getSystemInfo);
    return wx_getSystemInfo({
      complete,
    });
  }
  /* 转发 */
  /* wx.getShareInfo(Object object) 获取转发详细信息 */
  getShareInfo({
    shareTicket,
    timeout = 30000,
    complete = null
  }) {
    return this._return(this._getShareInfo(shareTicket, timeout, complete))
  }
  _getShareInfo(shareTicket, timeout, complete) {
    const wx_getShareInfo = promisify(wx.getShareInfo)
    return wx_getShareInfo({
      shareTicket,
      timeout,
      complete
    })
  }
  /* 补充方法 -------------------------------------------------------------------------------*/
  /* 错误提示 */
  _show_error(error_code, error_msg) {
    if (!error_code) {
      error_code = 1;
    }
    const tip = tips[error_code];
    let {
      title,
      icon = 'none',
      image = null,
      duration = 2000,
      mask = false,
      complete = null,
    } = {
      title: tip ? tip : tips[1]
    }
    return this._showToast(title, icon, image, duration, mask, complete);
  }
  /* 对success返回值进行内部处理 */
  _resReturn(res) {
    const code = res.statusCode.toString();
    if (code.startsWith('2')) {
      return res.data;
    } else {
      const error_code = res.data[this.statusName] || '';
      const error_msg = res.data[this.msgName] || '';
      this._show_error(error_code, error_msg);
    }
  }
  /* 返回值进行内部处理 */
  _return(fnc, resfnc) {
    const that = this;
    return fnc
      .then(res => {
        if (resfnc) {
          return resfnc();
        }
        if (!res.statusCode) {
          return res;
        }
        return that._resReturn(res);
      })
      .catch(err => {
        that._show_error(1);
      });
  }
  /* 判断返回正确的url */
  _url(url) {
    if (url.startsWith('http')) {
      return url
    } else {
      return `${this.baseUrl}${url}`
    }
  }
}

export default wxAPI;