const KEY_API = `http://localhost:3000/api/makeup?name=kim&page=1&limit=5#hello`;

const myUrl = require('url');
// const url_obj = myUrl.parse(KEY_API); 옛날 버전
const url_obj = new URL(KEY_API);
console.log(url_obj);

// searchParams: URLSearchParams { 'name' => 'kim', 'page' => '1', 'limit' => '5' },
// 유사 객체 
console.log(Array.isArray(url_obj.searchParams)); //false;
const [name, page, limit] = url_obj.searchParams;
// 디스트럭쳐링
console.log(name, page, limit);

const qrStr = url_obj.search.slice(1);
console.log(qrStr);

const ampStr = qrStr.split('&');
console.log(ampStr); // [ 'name=kim', 'page=1', 'limit=5' ]

const myObject = {}
ampStr.forEach(item => {
    const Ary = item.split('=')
    console.log(Ary);
    myObject[`${Ary[0]}`] = Ary[1];
});

console.log(myObject); // { name: 'kim', page: '1', limit: '5' }


