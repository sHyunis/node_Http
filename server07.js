const http = require('http'); //서버와 클라이언트간의 관계를 정리해 놓은 객체

const fs = require('fs').promises;
const path = require('path');   
const os = require('os');

// console.log(__filename);
// //C:\frontend_3\day13_0430\server03.js

// console.log(path.extname(__filename)); //확장자 추출 가능
// //.js

// console.log(path.basename(__filename));
// //server03.js

// console.log(path.dirname(__filename));
// //C:\frontend_3\day13_0430


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

    let filePath = path.join(__dirname, 'views', req.url === '/' ? 'index.html' : req.url);
    // __dirname/views/index.html
    // __dirname/views/../images/the.jpg
    // __dirname/views/audio.mp3
    
    
    let extname = path.extname(filePath);
    let contentType = "text/html;charset=utf-8";
    
    switch(extname){
        case '.js':
            contentType = "text/javascript" ; break;
        case '.css':
            contentType = "text/css" ; break;
        case '.json':
            contentType = "application/json" ; break;                
        case '.png':
            contentType = "image/png" ; break;
        case '.jpg':
            contentType = "image/jpg" ; break;
        case '.gif':
            contentType = "image/gif" ; break;
        case '.mp3':
            contentType = "audio/mp3" ; break;
        case '.mp4':
            contentType = "video/mp4" ; break;
        case '.zip':
            contentType = "application/zip" ; break;
        // default :
        //     contentType = "text/html;charset=utf-8"


    }
    // res.write(`${contentType} , ${filePath}`)
    // fetch('localhost:3000'); 
    // localhost:3000 <= fetch 요청하는 주소

    if(req.url === '/' && req.method === 'GET'){
        // readFile(res, './views/index.html');
        const filePath = path.join(__dirname, '/views/index.html')
        const data = await fs.readFile(filePath, 'utf-8')
        res.setHeader('content-type', contentType);
        res.write(data);
        res.end();
    }

    // 서버가 페이지에 이미지가 포함되어 있을 때 알아서 요청을 처리함
    // http://localhost:3000/images.jpg
    // http://localhost:3000/hello/images.jpg
    // http://localhost:3000/images/hello.jpg
    // http://localhost:3000/images.jpg 
    // contentType 때문에 .jpg는 꼭 붙여야 한다.

    if(req.url.includes('/images') && req.method === 'GET'){
        const filePath = path.join(__dirname, 'views', '/images/the.jpg')
        const data = await fs.readFile(filePath)
        res.setHeader('content-type', contentType);
        res.write(data);
        res.end();
    }
    // http://localhost:3000/data.json 반드시 .json 붙이기
    // http://localhost:3000/data/data.json
    // http://localhost:3000/hello.json/data.json 아무 상관 없다 
    if(req.url.includes('.json') && req.method === 'GET'){
        const filePath = path.join(__dirname, '/data/user.json')
        const data = await fs.readFile(filePath, 'utf-8')
        res.setHeader('content-type', contentType);
        res.write(data);
        res.end();
    }

});

server.listen(3000, ()=>{
    console.log('listening : '+ 3000);

});




