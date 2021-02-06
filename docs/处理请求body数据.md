# body 数据

XMLHttpRequest.send(body)

## body支持类型

1. `Document`, 在发送之前需要序列化.
2. `XMLHttpRequestBodyInit`, 包括 `Blob`^[Blob 对象表示一个不可变、原始数据的类文件对象], `BufferSource`, `FormData`^[FormData 接口提供了一种表示表单数据的键值对 key/value 的构造方式，如果送出时的编码类型被设为 `"multipart/form-data"`，它会使用和表单一样的格式], `URLSearchParams`^[URLSearchParams 接口定义了一些实用的方法来处理 URL 的查询字符串], 或者 `USVString`^[USVString 对应 unicode 标量值的所有可能序列的集合] 对象
3. `null`

需要对普通对象进行处理

