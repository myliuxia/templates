import axios, { CancelToken as cancelToken, isCancel as IsCancel } from 'axios'
import nprogress from 'nprogress'
import { db } from '@/libs/util'
import { MessageBox, Message } from 'element-ui'

const instance = axios.create({
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})

const statusTextMap = {
  401: '登录超时, 请重新登录',
}
const successResultCode = ['000000', '200', 200]

/**
 * 登陆超时提示弹框
 * @param msg 提示信息
 */
function showAletWith401(msg) {
  MessageBox.alert(msg, '提示', {
    type: 'warning',
    showClose: false,
  })
    .then(async () => {
      db.removeItem('token')
      window.location.reload()
    })
    .catch(() => {
      db.removeItem('token')
    })
}
/**
 * 错误提示
 */
function showAlert() {
  if (this.withLogout) {
    return Promise.resolve(showAletWith401(this.message))
  }
  if (this.status === 412 || this.status === 415) {
    return Promise.resolve(Message.error(this.message || '操作失败'))
  }
  return Promise.resolve(MessageBox.alert(this.message, '提示', { type: 'warning' }))
}

/**
 * 创建错误信息
 * @param e
 * @param status
 * @param withLogout
 * @param isCancel
 */
function createError(e, status, withLogout = false, isCancel, code) {
  let err
  if (typeof e === 'string') {
    err = createError(new Error(e), status, withLogout)
  } else {
    err = {
      name: e.name,
      message: e.message,
      status: code || status,
      withLogout: withLogout,
      stack: e.stack,
      isCancel: isCancel === undefined ? IsCancel(e) : isCancel,
      showAlert: showAlert,
    }
  }
  return err
}

// 请求拦截
instance.interceptors.request.use(async request => {
  nprogress.start()
  try {
    const token = await db.getItem('token')
    const jdDeviceId = await db.getItem('jd_device_id')
    request.headers.jdDeviceId = jdDeviceId
    if (token) {
      // 注入token
      request.headers.Authorization = 'Bearer ' + token
    }
  } catch (error) {
    // 无法注入token
  }
  return request
})

/**
 * 响应拦截
 * json数据请求相应格式：{head: {code: 500, message: "系统异常", success: false}, data: Object}
 * blob数据相应：Blob
 */
instance.interceptors.response.use(
  response => {
    nprogress.done()
    // 相应数据是blob
    if (response.request.responseType == 'blob') {
      return Promise.resolve([response.data, null, response])
    }
    const res = response.data
    // 如果返回格式不为{head:{},deta:{}}
    if (!res.head) {
      return Promise.resolve([null, createError('数据返回格式错误！'), res])
    }
    if (!res.head.success || !successResultCode.includes(res.head.code)) {
      // 业务错误
      return Promise.resolve([res.data, createError(res.head || '服务器异常', res.head.code), response])
    }
    // 只将请求结果的data字段返回
    return Promise.resolve([res.data, null, response])
  },
  error => {
    nprogress.done()
    // console.log('error')
    // console.log(error)
    // console.log(error.response)

    let status = 400
    let code = ''
    let withLogout = false
    let message = '服务器正忙，请稍后再试。'
    if (error && error.response) {
      const res = error.response.data
      status = error.response.status
      if (res.head) {
        message = res.head.message ? res.head.message : message
        code = res.head.code
      }
      switch (error.response.status) {
        case 401:
          withLogout = true
          showAletWith401(statusTextMap['401'])
          break
        default:
          break
      }
    }
    return Promise.resolve([
      null,
      createError(withLogout ? new Error(statusTextMap['401']) : new Error(message), status, withLogout, IsCancel(error), code),
      error.response,
    ])
  },
)

// 路径参数名
const uriName = ['path_uri']
function deleteUri(params) {
  if (!params) return
  uriName.forEach(name => {
    Object.prototype.hasOwnProperty.call(params, name) ? delete params[name] : ''
  })
}
// 不带拦截器纯粹的http请求
export const pureHttp = axios

export const http = {
  get(url, params, config = {}) {
    deleteUri(params)
    return instance.get(url, { params, ...config })
  },

  post(url, body, config = {}) {
    deleteUri(body)
    return instance.post(url, body, config)
  },

  put(url, body, config = {}) {
    deleteUri(body)
    return instance.put(url, body, config)
  },

  delete(url, params, config = {}) {
    deleteUri(params)
    return instance.delete(url, { params, ...config })
  },

  file(url, file) {
    const formdata = new FormData()
    formdata.append('file', file)
    return instance.post(url, formdata, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  origin: instance,
}
// CancelToken
export const CancelToken = cancelToken
// IsCancel
// export const isCancel = IsCancel;

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$http', {
      get() {
        return http
      },
    })
  },
}
