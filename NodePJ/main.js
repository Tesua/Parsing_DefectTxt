var app = require('express')();
var http = require('http').Server(app);
var url = require('url');
var colors = require('colors');
const {spawn} = require('child_process');
const iconv = require('iconv-lite');

let dataToSend;

if(!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
} 
 
// 전체 치환
if(!String.prototype.replaceAll) {
    String.prototype.replaceAll = function(org, dest) {
        return this.split(org).join(dest);
    }
}

http.listen(7777, function(){
  console.log('server is ready!!'.rainbow);
});

// REST API 메소드
// 첫번째 인자: End Point
// 두번째 인자: 콜백함수 - 이 함수는 두개의 인자를 받는다.
// '/user'에 get 요청이 오면 아래의 콜백함수가 실행이되는 것이다.

// Test용 호출 ./NodePJ/test.py
app.get('/', function(req, res){
  // 첫번째 인자 req: 클라이언트에서 요청이올 때, ReqBody, ReqHeader, url 등등 그런 정보들이 모두 들어있다.
  // 두번째 인자 res: 클라이언트에 응답할 때 필요한 모든 정보들이 들어있다. 
  // 지금부터 저희가 작성할 내용 외에도 기본적으로 들어가야되는 네트워크 정보라던지 그런 것들이 모두 여기 들어있다.
  const python = spawn('python', ['./NodePJ/test.py']);
  python.stdout.on('data', (data) => {
    dataToSend = iconv.decode(data, 'euc-kr');
  })
    python.on('close', (code) => {
    res.send(dataToSend);
    //res.json(dataToSend);
  })
});

//mecab 실행   ./NodePJ/mecab.py
app.get('/mecab', function(req, res){
  const python = spawn('python', ['./NodePJ/mecab.py']);
  python.stdout.on('data', (data) => {
   dataToSend = iconv.decode(data, 'euc-kr');
  })
   python.on('close', (code) => {
    res.send(dataToSend);
 })
});

//품목 or 플랫폼별 결과 추출  './NodePJ/GetData.py'
app.get('/select/:type/:item', function(req, res){
  let type = req.params.type.toUpperCase()
  let val = req.params.item.toUpperCase()

  if ((type == 'PJT' || type == 'ITEM')) {
    const python = spawn('python', ['./NodePJ/GetData.py', type, val]);
    python.stdout.on('data', (data) => {
    dataToSend = iconv.decode(data, 'euc-kr');
    })
    python.on('close', (code) => {
    res.send(dataToSend);
    })
  }
  else{
    res.status(400).send('입력가능한 Type은 `PJT` 혹은 `ITEM` 뿐입니다.');
    return;
  }
  
});

//사용자 사전 추가   './NodePJ/UserDictionary.py'
app.get('/SetDictionary/:word', function(req, res){
  let val = req.params.word
  const python = spawn('python', ['./NodePJ/UserDictionary.py', val] );
  //const python = spawn('python', ['UserDictionary.py', val], {cwd : "C:\\Project\\mecab"} );
  python.stdout.on('data', (data) => {
   dataToSend = data.toString();
  })
   python.on('close', (code) => {
    res.send(dataToSend);
 })
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({statusCode : res.statusCode, errMessage : err.errMessage});
});


