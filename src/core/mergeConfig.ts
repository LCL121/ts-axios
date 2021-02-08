import { isPlainObject, deepMerge } from '../helpers/utils'
import { AxiosRequestConfig } from '../types'

// 存放合并策略
const strategies = Object.create(null)

// 默认合并策略
function defaultStrategy(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

function fromVal2Strategy(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

// 复杂对象合并策略
function deepMergeStrategy(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const strategyKeysFromVal2 = ['url', 'params', 'data']

strategyKeysFromVal2.forEach(key => {
  strategies[key] = fromVal2Strategy
})

const strategyKeysDeepMerge = ['headers', 'auth']

strategyKeysDeepMerge.forEach(key => {
  strategies[key] = deepMergeStrategy
})

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)
  for (const key in config2) {
    mergeField(key)
  }

  for (const key in config1) {
    // 判断key 在config2 没出现过
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strategy = strategies[key] || defaultStrategy
    config[key] = strategy(config1[key], config2![key])
  }

  return config
}
