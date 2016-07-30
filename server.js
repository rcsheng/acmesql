var express = require('express');
var app = express();

var swig = require('swig');
swig.setDefaults({ cache: false });

app.set('views','./views');
app.set('view engine','html');
app.engine('html',swig.renderFile);

var db = require('./db');

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))

var router = express.Router();
var categoriesRouter = require('./routes/categories');

app.use('/categories',categoriesRouter);

app.get('/',function(req,res)
{
	//console.log('here');
	res.render('index',{categories: db.getCategories()});


});

app.listen(3000,function(err)
{
	if (err)
		console.error(err);
	console.log("app listening");
})