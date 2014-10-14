
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
exports.videoquiz_tool = function(req, res){
  res.sendfile('./views/videoquiz_tool.html');
};
//post for videoquiz_tool
exports.videoquiz_tool2 = function(req, res){
 var _input = req.param("input");
  console.log(_input);
  res.send(_input);
};
