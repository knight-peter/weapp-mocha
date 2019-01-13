import Promise from '../extend/es6-promise.min.js'
/* 将微信小程序异步API封装为Promise */

const promisify = (api) => {
  return (options, ...params) => {
    return new Promise((resolve, reject) => {
      api(Object.assign({}, {
        success: resolve,
        fail: reject
      }, options), ...params);
    })
  }
}

export default promisify