require('./lib/db');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.configure(function() {
    // Enable the cookie parser.
    app.use(express.cookieParser());
    // Enable Session
    app.use(express.cookieSession({
		key: 'node',
		secret: 'HelloExpressSESSION'
	}));
    // Enable body parser
    app.use(express.bodyParser());
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/register', user.register);		//Register page.
app.get('/signin', user.signin);			//LogIn page.
app.get('/signout', user.signout);			//LogOut function.
app.get('/forget', user.forget);			//Forget password page.
app.get('/add_article', user.add_article);	//Add article page.
app.get('/profile', user.profile);			//Manager page for the articles.
app.get('/modify/:id', user.modify);		//Modify page to update the article.
app.get('/message/:id', user.message);		//Leave a message for the article.
app.post('/apis/login', user.login);
app.post('/apis/add', user.add);
app.get('/apis/delete/:id', user.del_article);
app.post('/apis/update/:id', user.update);
app.post('/apis/comment/:id', user.comment);

http.createServer(app).listen(app.get('port'), function(){
  console.log('SimpleBlog server listening on port ' + app.get('port'));
});
