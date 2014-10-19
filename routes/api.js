var mongodb = require('mongodb');
var ua      = require('mobile-agent');
var colors  = require('colors');
var url_param = require('url');
var url = require('url');

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


exports.get_videoquiz = function(req, res){
  
  var url_parts = url.parse(req.url, true);
  var query_arg = url_parts.query;

  console.log(url_parts);
  
  var _lv = query_arg['lv'];
  var _title = query_arg['title'];

  console.log('call get_videoquiz');
  console.log(_lv);
  console.log(_title);

  _videoquiz_col.find({ lv: _lv, title: _title}).toArray(function(err,rtn){
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    console.log(rtn);
    res.end(JSON.stringify(rtn));
  });
  
};


exports.get_videoquiz_by_lv = function(req, res){
  
  var url_parts = url.parse(req.url, true);
  var query_arg = url_parts.query;
  var _lv = query_arg['lv'];
  var _begin_cnt = query_arg['begin_cnt'];

  console.log(_lv);
  console.log(_begin_cnt);

  _videoquiz_col.find({ lv: _lv}, {title:1, poster_src:1, updated_date:1}).sort({_id:-1}).skip(_begin_cnt).limit(10).toArray(function(err,rtn){
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(rtn));
  });
  
};
