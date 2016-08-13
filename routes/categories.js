var router = require('express').Router();
var db = require('../db/db');
var methodOverride = require('method-override');

router.use(methodOverride('_method'));


router.post('/', function(req,res)
{
	var categoryID;
	var categoryName =req.body.categoryName; 
	db.newCategory(categoryName)
	.then(function()
	{
		return db.getCategoryId(categoryName);
	})
	.then(function(category)
	{
		console.log('before render:',category[0].id);
		res.redirect('/categories/'+category[0].id);
	});
	
});


router.get('/:categoryid',function(req,res)
{
	
	var category_id = req.params.categoryid;
	var categories;
	db.getCategories()
	.then(function(results){
			categories = results;
			return db.getProducts(category_id);
		})
	.then(function(products)
	{
		console.log('products for ',category_id,' are: ',products);
		res.render('category',{categories: categories, selectedCategory: category_id, products: products});
	});
	
});

router.delete('/:categoryid',function(req,res)
{
	//console.log('deleting ',req.params.category);
	db.deleteCategory(req.params.categoryid)
	.then(function()
	{
		res.redirect('/');
	});
	
})

router.post('/:categoryid/products',function(req,res)
{
	//console.log('adding product!');
	
	db.addProduct(req.params.categoryid, req.body.productName)
	.then(
		res.redirect('/categories/'+req.params.categoryid)
		);
	

});

router.delete('/:categoryid/products/:productid',function(req,res)
{
	console.log('deleting product ',req.params.categoryid,Number(req.params.productid));
	db.deleteProduct(req.params.categoryid, Number(req.params.productid))
	.then(function()
		{
			res.redirect('/categories/'+req.params.categoryid);
		});
	
})

module.exports = router;