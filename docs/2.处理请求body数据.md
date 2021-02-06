# body 数据

XMLHttpRequest.send(body)

## body支持类型

1. `Document`, 在发送之前需要序列化.
2. `XMLHttpRequestBodyInit`, 包括 `Blob`^[Blob 对象表示一个不可变、原始数据的类文件对象], `BufferSource`, `FormData`^[FormData 接口提供了一种表示表单数据的键值对 key/value 的构造方式，如果送出时的编码类型被设为 `"multipart/form-data"`，它会使用和表单一样的格式], `URLSearchParams`^[URLSearchParams 接口定义了一些实用的方法来处理 URL 的查询字符串，`application/x-www-form-urlencoded`], 或者 `USVString`^[USVString 对应 unicode 标量值的所有可能序列的集合] 对象
3. `null`

需要对普通对象进行处理

## `multipart/form-data` 和`application/x-www-form-urlencoded` 区别：

### 1.x-www-form-urlencoded
当action为get时候，浏览器用x-www-form-urlencoded的编码方式把form数据转换成一个字串（name1=value1&name2=value2…），然后把这个字串append到url后面，用?分割，加载这个新的url。

### 2.multipart/form-data
当action为post时候，浏览器把form数据封装到http body中，然后发送到server。 

1. 如果没有type=file的控件，用默认的application/x-www-form-urlencoded就可以了。 
2. 但是如果有type=file的话，就要用到multipart/form-data了。浏览器会把整个表单以控件为单位分割，并为每个部分加上Content-Disposition(form-data或者file),Content-Type(默认为text/plain),name(控件name)等信息，并加上分割符(boundary)。

`application/x-www-form-urlencoded`对于非ascii字符传输效率就很低了，`multipart/form-data`将表单中的每个input转为了一个由boundary分割的小格式，没有转码，直接将utf8字节拼接到请求体中，在本地有多少字节实际就发送多少字节，极大提高了效率，适合传输长字节。

