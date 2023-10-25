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

// Test용 호출 ./NodePJ/test.py
app.get('/', function(req, res){
  const python = spawn('python', ['./NodePJ/test.py']);
  python.stdout.on('data', (data) => {
    dataToSend = iconv.decode(data, 'euc-kr');
  })
    python.on('close', (code) => {
    res.send(dataToSend);
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


