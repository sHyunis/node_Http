const http = require('http'); //서버와 클라이언트간의 관계를 정리해 놓은 객체
const fs = require('fs');
const fsPromise = fs.promises;
const path = require('path');   
const os = require('os');

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>index.html</h1>
    <img src="/images/the.jpg" alt="">
</body>
</html>
`

const server = http.createServer();

server.on('request', async (req, res)=>{
    console.log(req.url, req.method);

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
        default :
            contentType = "text/html;charset=utf-8"


    }
    // res.write(`${contentType} , ${filePath}`)
    // 
    if(req.url === '/' && req.method === 'GET'){
        res.end(html);
    }else if(req.url.includes('/images') && req.method === 'GET'){
        const data = await fsPromise.readFile(filePath);
        res.end(data);
    }
    res.end();
});

server.listen(3000, ()=>{
    console.log('listening : '+ 3000);

});
