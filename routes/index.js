
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.sendfile('./public/index.html');
};

exports.videoquiz = function(req, res){
  res.sendfile('./views/videoquiz.html');
};
