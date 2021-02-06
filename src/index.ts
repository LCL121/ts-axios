import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildUrl } from './helpers/url'
import { transformRequest } from './helpers/data'

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

// 对config 处理
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transformRequestData(config)
}

// 对请求url 参数进行处理
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url, params)
}

// 对请求data 进行处理
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

export default axios
