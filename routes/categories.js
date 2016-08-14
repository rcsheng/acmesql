var router = require('express').Router();
var db = require('../db/db');

module.exports = router;

var methodOverride = require('method-override');//not here.. do this in app.js

router.use(methodOverride('_method'));//do this in app.js


router.post('/', function(req,res){
	db.newCategory(req.body.categoryName)
    .then(function(id){
      res.redirect('/categories/' + id);
    });
});


router.get('/:id',function(req,res){
	var categoryId = req.params.id;
	var categories;
	db.getCategories()
    .then(function(results){
      categories = results;
      return db.getProducts(categoryId);
    })
    .then(function(products){
      res.render('category',{
        categories: categories,
        selectedCategory: categoryId,
        products: products
      });
    });
});

router.delete('/:id', function(req,res){
	//console.log('deleting ',req.params.category);
	db.deleteCategory(req.params.id)
    .then(function(){
      res.redirect('/');
    });
});

router.post('/:categoryid/products', function(req,res){
	db.addProduct(req.params.categoryid, req.body.productName)
    .then(function(){
      res.redirect('/categories/'+req.params.categoryid);
    });
});

router.delete('/:categoryid/products/:productid',function(req,res)
{
	db.deleteProduct(req.params.categoryid, Number(req.params.productid))
    .then(function(){
        res.redirect('/categories/'+ req.params.categoryid);
    });
});

