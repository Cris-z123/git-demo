var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
    console.log('请指定端口号。例如:\nnode server.js 8888')
    process.exit(1)
}

var server = http.createServer(function(request, response){
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if(pathWithQuery.indexOf('?') >= 0){ 
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
    }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    console.log('请求发送过来了，路径:' + pathWithQuery)
    console.log(path === '/style')

    if(path === '/'){
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(
            `<!DOCTYPE html>
            <head>
              <link rel="stylesheet" href="style.css">
            </head>
            <body>
              <h1>Hello World</h1>
            </body>
            </html>`)
        response.end()
    } else if(path === '/style.css'){
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/css;charset=utf-8')
        response.write(`h1{color: blue;}`)
        response.end()
    } else{
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`你输入的路径没有内容`)
        response.end()
    }
})

server.listen(port)
console.log('监听' + port + '成功\n打开 http://localhost:' + port)

