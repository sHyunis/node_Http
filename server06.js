const http = require('http');
const server = http.createServer();
const PORT = 3000;
const fs = require('fs').promises;
const path = require('path');

const user = require('./data/user.json');
// javascript로 알아서 바뀐다.

// localhost:3000/images/the.jpg
// localhost:3000/images/the.gif
// localhost:3000/images/the.png
// localhost:3000/public/API/images/the.jpg
// localhost:3000/data/user.json

function htmlTemplate(str){

    const temp = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h1>${str}</h1>
    </body>
    </html>
    `

    return temp;
}

async function readFile(res, myPath){
    const filePath = path.join(__dirname, myPath)
    const data = await fs.readFile(filePath, 'utf-8')
    res.write(data);
    res.end();
}

// temp.replace('{{data}}', 'mytext')
server.on('request', async (req, res)=>{ //request 이벤트가 일어난다면
    console.log(req.url);

    if(req.url === '/' && req.method === 'GET'){
        // readFile(res, './views/index.html');
        const filePath = path.join(__dirname, '/views/index.html')
        const data = await fs.readFile(filePath, 'utf-8');
        res.setHeader('content-type', 'text/html');
        res.write(data);
        res.end();
    }
    // fetch(url, {method: 'POST'})
    if(req.url === '/' && req.method === 'POST'){
        const data = htmlTemplate("post");
        res.write(data);
        res.end();
    }
    // fetch(url, {method: 'PUT'})
    if(req.url === '/' && req.method === 'PUT'){
        const data = htmlTemplate("update");
        res.write(data);
        res.end();
    }
    // fetch(url, {method: 'DELETE'})
    if(req.url === '/' && req.method === 'DELETE'){
        const data = htmlTemplate("delete");
        res.write(data);
        res.end();
    }
    if(req.url.includes('/images') && req.method === 'GET'){
        const filePath = path.join(__dirname, 'views', '/images/the.jpg')
        const data = await fs.readFile(filePath)
        res.setHeader('content-type', 'image/jpg');
        res.write(data);
        res.end();
    }
    // if(req.url.includes('/data') && req.method === 'GET'){
    if(req.url.includes('.json') && req.method === 'GET'){
        const filePath = path.join(__dirname, '/data/user.json')
        const data = await fs.readFile(filePath, 'utf-8')
        res.setHeader('content-type', 'application/json');
        res.write(data);
        res.end();
    }

    res.end();
});

server.listen(PORT, ()=>{
    console.log('server on : ' + PORT);
});