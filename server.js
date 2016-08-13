var express = require('express');
var app = express();

var swig = require('swig');
swig.setDefaults({ cache: false });

app.set('views','./views');
app.set('view engine','html');
app.engine('html',swig.renderFile);

var db = require('./db/db');

db.connect();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))

var router = express.Router();
var categoriesRouter = require('./routes/categories');

app.use('/categories',categoriesRouter);

app.get('/',function(req,res)
{

	console.log('here');
	db.getCategories().then(function(results){
		//console.log('app get', results); // shows undefineds
		res.render('index',{categories: results});
	});

});

app.listen(3000,function(err)
{
	if (err)
		console.error(err);
	console.log("app listening");
})