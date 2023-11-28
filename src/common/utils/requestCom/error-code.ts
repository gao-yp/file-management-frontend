

export const errorCodeType = (code: string = '-1'): { code: string, message: string } => {
    let errMessage = {
        code: code, message: '未知错误'
    }
    errMessage.message = code_data.get(code) as string ?? '未知错误';
    return errMessage
}

const code_data = new Map([
    [
        "-1",
        "未知异常"
    ],
    [
        "0",
        "Network Error 系统资源连接失败。请稍后再试"
    ],
    [
        "100",
        "Continue 继续。客户端应继续其请求"
    ],
    [
        "101",
        "Switching Protocols 切换协议。服务器根据客户端的请求切换协议。只能切换到更高级的协议，例如，切换到HTTP的新版本协议"
    ],
    [
        "200",
        "OK 请求正常处理完毕"
    ],
    [
        "201",
        "Created 已创建。成功请求并创建了新的资源"
    ],
    [
        "202",
        "Accepted 已接受。已经接受请求，但未处理完成"
    ],
    [
        "203",
        "Non-Authoritative Information 非授权信息。请求成功。但返回的meta信息不在原始的服务器，而是一个副本"
    ],
    [
        "204",
        "No Content 请求成功处理，没有实体的主体返回"
    ],
    [
        "206",
        "Partial Content GET范围请求已成功处理"
    ],
    [
        "300",
        "Multiple Choices 多种选择。请求的资源可包括多个位置，相应可返回一个资源特征与地址的列表用于用户终端（例如：浏览器）选择"
    ],
    [
        "301",
        "Moved Permanently 永久重定向，资源已永久分配新URI"
    ],
    [
        "302",
        "Found 临时重定向，资源已临时分配新URI"
    ],
    [
        "303",
        "See Other 临时重定向，期望使用GET定向获取"
    ],
    [
        "304",
        "Not Modified 发送的附带条件请求未满足"
    ],
    [
        "305",
        "Use Proxy 使用代理。所请求的资源必须通过代理访问"
    ],
    [
        "306",
        "Unused 已经被废弃的HTTP状态码"
    ],
    [
        "307",
        "Temporary Redirect 临时重定向，POST不会变成GET"
    ],
    [
        "400",
        "Bad Request 请求报文语法错误或参数错误"
    ],
    [
        "401",
        "Unauthorized 需要通过HTTP认证，或认证失败"
    ],
    [
        "402",
        "Payment Required 保留，将来使用"
    ],
    [
        "403",
        "Forbidden 请求资源被拒绝"
    ],
    [
        "404",
        "Not Found 无法找到请求资源（服务器无理由拒绝）"
    ],
    [
        "405",
        "Method Not Allowed 客户端请求中的方法被禁止"
    ],
    [
        "406",
        "Not Acceptable 服务器无法根据客户端请求的内容特性完成请求"
    ],
    [
        "407",
        "Proxy Authentication Required 请求要求代理的身份认证，与401类似，但请求者应当使用代理进行授权"
    ],
    [
        "408",
        "Request Time-out 服务器等待客户端发送的请求时间过长，超时"
    ],
    [
        "409",
        "Conflict 服务器完成客户端的 PUT 请求时可能返回此代码，服务器处理请求时发生了冲突"
    ],
    [
        "410",
        "Gone 客户端请求的资源已经不存在。410不同于404，如果资源以前有现在被永久删除了可使用410代码，网站设计人员可通过301代码指定资源的新位置"
    ],
    [
        "411",
        "Length Required 服务器无法处理客户端发送的不带Content-Length的请求信息"
    ],
    [
        "412",
        "Precondition Failed 客户端请求信息的先决条件错误"
    ],
    [
        "413",
        "Request Entity Too Large 由于请求的实体过大，服务器无法处理，因此拒绝请求。为防止客户端的连续请求，服务器可能会关闭连接。如果只是服务器暂时无法处理，则会包含一个Retry-After的响应信息"
    ],
    [
        "414",
        "Request-URI Too Large 请求的URI过长（URI通常为网址），服务器无法处理"
    ],
    [
        "415",
        "Unsupported Media Type 服务器无法处理请求附带的媒体格式"
    ],
    [
        "416",
        "Requested range not satisfiable 客户端请求的范围无效"
    ],
    [
        "417",
        "Expectation Failed 服务器无法满足Expect的请求头信息"
    ],
    [
        "500",
        "Internal Server Error 服务器故障或Web应用故障"
    ],
    [
        "501",
        "Not Implemented 服务器不支持请求的功能，无法完成请求"
    ],
    [
        "502",
        "Bad Gateway 作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应"
    ],
    [
        "503",
        "Service Unavailable 服务器超负载或停机维护"
    ],
    [
        "504",
        "Gateway Time-out 充当网关或代理的服务器，未及时从远端服务器获取请求"
    ],
    [
        "505",
        "HTTP Version not supported 服务器不支持请求中指明的HTTP协议版本。"
    ],
    [
        "511",
        "Network Authentication Required 用户需要提供身份验证来获取网络访问入口。"
    ]
]);



