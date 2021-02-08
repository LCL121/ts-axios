import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url'
import cookie from '../helpers/cookie'
import { isFormData } from '../helpers/utils'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress
    } = config
    // 创建request 实例
    const request = new XMLHttpRequest()

    // request 初始化
    request.open(method.toUpperCase(), url!, true)

    // 配置request 对象
    configureRequest()

    // 给request 添加事件处理函数
    addEvents()

    // 处理请求headers
    processHeaders()

    // 处理请求取消逻辑
    processCancel()

    // 发送request 请求
    request.send(data)

    function configureRequest(): void {
      if (responseType) {
        request.responseType = responseType
      }

      if (timeout) {
        request.timeout = timeout
      }

      if (withCredentials) {
        request.withCredentials = withCredentials
      }
    }

    function addEvents(): void {
      // 请求成功
      request.onreadystatechange = function handleLoad() {
        if (request.readyState !== 4) {
          return
        }

        // 网络/超时错误
        if (request.status === 0) {
          return
        }

        const responseHeaders = parseHeaders(request.getAllResponseHeaders())
        const responseData = responseType !== 'text' ? request.response : request.responseText
        const response: AxiosResponse = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        }

        handleResponse(response)
      }
      // 请求出错
      request.onerror = function handleError() {
        reject(createError('Network Error', config, null, request))
      }

      // 请求超时
      request.ontimeout = function handleTimeout() {
        reject(createError(`Timeout of ${timeout}ms exceeded`, config, 'ECONNABORTED', request))
      }

      // 添加下载监听
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }

      // 添加上传监听
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    function processHeaders(): void {
      // 判断如果是FormData 类型，就删除Content-Type，让浏览器自动判断
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      // 将token 添加到请求的headers
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName && xsrfHeaderName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue) {
          headers[xsrfHeaderName] = xsrfValue
        }
      }

      // 将header 放入请求的headers
      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel(): void {
      // 如果配置中有cancelToken 就进行cancelToken.promise 状态等待
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }

    // 判断请求状态码是否在200~300
    function handleResponse(response: AxiosResponse): void {
      if (request.status >= 200 && request.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
