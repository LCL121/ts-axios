export function getAjaxRequest(): Promise<JasmineAjaxRequest> {
  return new Promise(function(resolve) {
    setTimeout(() => {
      // jasmine-ajax 模拟
      return resolve(jasmine.Ajax.requests.mostRecent())
    }, 0)
  })
}
