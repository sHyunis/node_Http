const http = require('http'); //서버와 클라이언트간의 관계를 정리해 놓은 객체

const server = http.createServer();

// http://localhost:3000/
// http://localhost:3000/board?name=kim&page=30&limit=1

// get : http://localhost:3000/
/* <a href="localhost:3000/">home</a> */

// get : http://localhost:3000/board
/* <a href="localhost:3000/board">board</a> */

// get : ttp://localhost:3000/hello
/* <a href="localhost:3000/hello">hello</a> */

// node ver 18 --watch
// nodemon 모듈
// 둘다 서버를 갱신 시켜준다.

// get, post, delete, update
// tool : postman, thunder client
server.on('request', (request, response)=>{
    // 어떤 요청인지 확인해서
    // 처리
    // 응답
    console.log(request.url, request.method); // 요청
    response.statusCode = 200;
    response.setHeader('content-type', 'text/html;charset=utf-8');
    response.write('응답 index');
    response.end();
});

server.listen(3000, ()=>{
    console.log('listening : '+ 3000);

});
