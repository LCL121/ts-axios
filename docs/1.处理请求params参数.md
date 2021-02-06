# 参数分类

## 1. 普通参数
```javascript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo1: 'bar',
    foo2: 'baz'
  }
})
```
最终请求的 `url` 是`/base/get?foo1=bar&foo2=baz`

## 2. 参数值为数组
```javascript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})
```
最终请求的`url` 是`/base/get?foo[]=bar&foo[]=baz`

## 3. 参数值为对象
```javascript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})
```
最终请求的`url` 是`/base/get?foo=%7B%22bar%22:%22baz%22%7D`

## 4. 参数值为 Date 类型
```javascript
const date = new Date()
axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})
```
最终请求的`url` 是`/base/get?date=2021-02-05T15:34:56.874Z`

## 5. 参数值包含特殊字符
```javascript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})
```
最终请求的`url` 是`/base/get?foo=@:$,+`

## 6. 参数值包含null或undefined
```javascript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    baz: 'bar',
    foo1: null,
    foo2: undefined
  }
})
```
最终请求的`url` 是`/base/get?baz=bar`

## 7. url 中存在哈希#标记
```javascript
axios({
  method: 'get',
  url: '/base/get#hash?bar=foo',
  params: {
    foo: 'baz'
  }
})
```
最终请求的`url` 是`/base/get?foo=baz`

## 7. url 中已存在的参数
```javascript
axios({
  method: 'get',
  url: '/base/get?baz=foo',
  params: {
    foo: 'bar'
  }
})
```
最终请求的`url` 是`/base/get?baz=foo&foo=bar`
