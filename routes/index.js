
var mongodb = require('mongodb');
var ua      = require('mobile-agent');
var colors  = require('colors');

var _db;
var _videoquiz_col;

var _query = function(err, objects){
  
  if (err)
    console.log(err.message.bold.red);
  
  if (err && err.message.indexOf('E11000 ') !== -1) {
    console.log(err.message.bold.yellow);
  }

  if(!err){
    console.log('insert succ'.bold.green);
  }
};

var mongodb_connect_cbfn = function(err, database){
  if(err)
  {
    console.log('[mongodb] connection to mongodb fail'.bold.red.underline);
    throw err;
  }
 
  _db = database;
  //_db.createCollection('test');
  //db.test.ensureIndex( { "updated_time" : 1 } );
  
  _videoquiz_col = _db.collection('videoquiz');
  
  console.log('[mongodb] connection to mongodb ok for index page'.bold.green.underline);
};

var mongodb_uri = 'mongodb://127.0.0.1:27017/wakeupeng';
// 몽고 db 설정(pooling)
mongodb.MongoClient.connect(mongodb_uri, mongodb_connect_cbfn);


exports.index = function(req, res){
  res.sendfile('./views/index.html');
};

exports.videoquiz = function(req, res){
  //console.log(req.param("lv"));
  res.sendfile('./views/index_videoquiz.html');
};


exports.videoquiz_content = function(req, res){
   var agent = ua(req.headers['user-agent']);

  if(agent.Mobile == true){
    console.log('connection from mobile');
    res.sendfile('./views/videoquiz2.html');
  }
  else{
    console.log('connection from pc');
    res.sendfile('./views/videoquiz2.html');
  }
  
//  res.sendfile('./views/videoquiz2.html');
};

//get for videoquiz_tool
exports.tool = function(req, res){
  res.sendfile('./views/tool.html');
};


//post for videoquiz_tool
exports.tool_post = function(req, res){
  var _root = req.param("root");
  var _lv = req.param("lv");
  var _title = req.param("title");
  var _video_src = req.param("video_src");
  var _poster_src = req.param("poster_src");
  var _subtitle_src = req.param("subtitle_src");
  var _duration = req.param("duration");
  var _quiz = req.param("quiz");
  var word_cnt = req.param("word_cnt");

  var _updated_date = new Date();

  console.log(_updated_date);
  
  var doc = { root: _root, lv: _lv, title: _title, video_src: _video_src, poster_src: _poster_src, duration: _duration,
	      quiz: _quiz, subtitle_src: _subtitle_src, updated_date: _updated_date};

  var word_container = [];

  for(var i=0; i<word_cnt; i++){

    var _word = {};
    
    var word  = req.param('word' + i.toString());
    console.log('word:'+  word);
    _word.word = word;
    
    var def  = req.param('def' + i.toString());
    console.log('def:'+  def);
    _word.def = def;
    
    var type  = req.param('type' + i.toString());
    console.log('type:'+  type);
    _word.type = type;
    
    var plural  = req.param('plural' + i.toString());
    console.log('plural:'+  plural);
    _word.plural = plural;
    
    var example  = req.param('example' + i.toString());
    console.log('example:'+  example);
    _word.example = example;
    
    var example_kor  = req.param('example_kor' + i.toString());
    console.log('example_kor:'+  example_kor);
    _word.example_kor = example_kor;
    
    var img_src  = req.param('img_src' + i.toString());
    console.log('img_src:'+  img_src);
    _word.img_src = img_src;
    
    var audio_src  = req.param('audio_src' + i.toString());
    console.log('audio_src:'+ audio_src);
    _word.audio_src = audio_src;
    
    word_container.push(_word);
  }

  doc.word_container = word_container;
  console.log(doc);

  _videoquiz_col.insert((doc), {w:1}, _query );
  // index잡고 save 형식이나, 업데이트 형식으로 존재한다면 바꿔줌
  // db처리

  res.send(doc);
};


