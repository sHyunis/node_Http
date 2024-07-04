const http = require('http'); //서버와 클라이언트간의 관계를 정리해 놓은 객체
const fs = require('fs');
const fsPromise = fs.promises;
const path = require('path');   

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
server.on('request', async (req, res)=>{
    // 어떤 요청인지 확인해서
    // 처리
    // 응답
    console.log(req.url, req.method); // 요청

    // ROUTING : 요청마다 다른 처리를 할 수 있도록 분기 작업
    // HTML 메뉴 작성
    if( req.url === '/' && req.method === 'GET'){
        res.statusCode = 200;
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.write('hello index !!');
    }else if( req.url === '/hello' && req.method === 'GET'){
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.write('<h1>hello nodejs</h1>');
    }else if( req.url === '/json' && req.method === 'GET'){
        res.setHeader('content-type', 'application/json;charset=utf-8');
        res.write(JSON.stringify({ name : "kim", page : 30 }));
    }else if( req.url === '/img' && req.method === 'GET'){
        res.setHeader('content-type', 'image/jpg');
        const image = await fsPromise.readFile(path.join(__dirname, 'images', 'the.jpg')) // 이미지는 원하는 것을 넣자
        res.write(image);
    }
    res.end();
});

server.listen(3000, ()=>{
    console.log('listening : '+ 3000);

});
