const http = require('http');
const server = http.createServer();
const PORT = 3000;
server.on('request', (req, res)=>{ //request 이벤트가 일어난다면
    switch(req.method){
        case 'GET':
            res.write('get response'); 
            break;
        case 'POST':
            res.write('post response'); 
            break;
        case 'PUT':
            res.write('put response'); 
            break;
        case 'DELETE':
            res.write('delete response'); 
            break;                                
    }
    res.end();
});

server.listen(PORT, ()=>{
    console.log('server on : ' + PORT);
});