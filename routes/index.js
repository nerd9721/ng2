
var ua      = require('mobile-agent');

exports.index = function(req, res){
  res.sendfile('./views/index.html');
};

exports.videoquiz = function(req, res){
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
  var _quiz = req.param("quiz");
  var word_cnt = req.param("word_cnt");


//  console.log(_root);
//  console.log(_lv);
//  console.log(_title);
//  console.log(_quiz);
//  console.log(_word);

  var doc = { root: _root, lv: _lv, title: _title, quiz: _quiz};

  var word_container = [];

  for(var i=0; i<word_cnt; i++){
    var word  = req.param('word' + i.toString());
    console.log('word:'+  word);
    
    var def  = req.param('def' + i.toString());
    console.log('def:'+  def);
    
    var type  = req.param('type' + i.toString());
    console.log('type:'+  type);
    
    var plural  = req.param('plural' + i.toString());
    console.log('plural:'+  plural);
    
    var example  = req.param('example' + i.toString());
    console.log('example:'+  example);
    
    var example_kor  = req.param('example_kor' + i.toString());
    console.log('example_kor:'+  example_kor);
    
    var img_src  = req.param('img_src' + i.toString());
    console.log('img_src:'+  img_src);
    
    var audio_src  = req.param('audio_src' + i.toString());
    console.log('audio_src:'+ audio_src);
    
  }

  console.log(doc);
  

  res.send(_root);
};

