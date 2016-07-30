var router = require('express').Router();
var db = require('../db');
var methodOverride = require('method-override');

router.use(methodOverride('_method'));


router.post('/', function(req,res)
{
	db.newCategory(req.body.categoryName);
	res.redirect('/categories/'+req.body.categoryName);
});


router.get('/:category',function(req,res)
{
	//console.log('get categories!');
	var categoryName = req.params.category;
	res.render('category',{categories: db.getCategories(), selectedCategory: categoryName, products: db.getProducts(categoryName)});
});

router.delete('/:category',function(req,res)
{
	//console.log('deleting ',req.params.category);
	db.deleteCategory(req.params.category);
	res.redirect('/');
})

router.post('/:category/products',function(req,res)
{
	//console.log('adding product!');
	
	db.addProduct(req.params.category, req.body.productName);
	res.redirect('/categories/'+req.params.category);

});

router.delete('/:category/products/:index',function(req,res)
{
	//console.log('deleting product ',req.params.category,Number(req.params.index)-1);
	db.deleteProduct(req.params.category, Number(req.params.index)-1);
	res.redirect('/categories/'+req.params.category);
})

module.exports = router;