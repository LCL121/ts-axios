const toString = Object.prototype.toString

// 类型保护 类型谓词
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// 判断对象
export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

// 判断普通对象
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

// 混合对象
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
