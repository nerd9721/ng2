
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.sendfile('./views/index.html');
};

exports.videoquiz = function(req, res){
  res.sendfile('./views/index_videoquiz.html');
};


exports.videoquiz_content = function(req, res){
  res.sendfile('./views/videoquiz.html');
};
