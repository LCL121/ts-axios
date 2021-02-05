const toString = Object.prototype.toString

// 类型保护 类型谓词
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is object {
  return val !== null && typeof val === 'object'
}
