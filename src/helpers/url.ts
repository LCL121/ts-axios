import { isDate, isPlainObject } from './utils'

// 将URI 编码，并手动处理特殊字符
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

// 生成url
export function buildUrl(url: string, params?: any): string {
  if (!params) {
    return url
  }

  const parts: string[] = []
  Object.keys(params).forEach(key => {
    const val = params[key]
    // 值为null 或undefined
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values = []
    // 其他值转换成数组，进行统一处理
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')

  if (serializedParams) {
    // 判断是否有哈希
    // 删除哈希后面的参数
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    // 判断是否已经有?
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}
