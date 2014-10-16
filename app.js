
var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var multer         = require('multer');
var colors         = require('colors');
var path = require('path');


var app = express();
var routes = require('./routes');
var port    =   process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/assets'));



app.use(morgan('dev'));
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());
app.use(multer({ dest: './uploads/' }));


var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
  // 에러 핸들링
  // app.use(express.errorHandler());
}


var router = express.Router();

app.get('/', routes.index);
router.get('/index', routes.index);
router.get('/videoquiz', routes.videoquiz);
router.get('/videoquiz/content', routes.videoquiz_content);
router.get('/tool', routes.tool);
router.post('/tool', routes.tool_post);


app.use('/', router);
app.listen(port);
console.log('Express server listening on port 3000'.bold.green);
