var Promise = require('bluebird');
var _client;

function promisifiedQuery(query,params)
{
  if(!_client)
    connect();
  return new Promise(function (resolve, reject) {
    _client.query(query,params, function (err, result) {
      if (err) reject(err);
      else resolve(result);
    });
  });

};

var db = {
  connect: function()
  {
    var pg = require('pg');
    var postgresUrl = 'postgres://localhost/acmedb';
    _client = new pg.Client(postgresUrl);
    //connect to our database
    _client.connect(function (err) {
      if (err) throw err;

      // execute a query on our database
      _client.query('SELECT * FROM Categories LIMIT 10', [], function (err, result) {
        if (err) throw err;

        // just print the result to the console
        console.log(result.rows[0]); // outputs: { name: 'brianc' }

        // disconnect the client
        // client.end(function (err) {
        //   if (err) throw err;
        // });
      });
    });
    
  },
  getCategories: function()
  {

    return promisifiedQuery('SELECT * FROM categories',[])
    .then(function(results){
        // var tmparr = result.rows.map(function(element){
        //   return element.name;
        // });
        // console.log("categories are: ",tmparr);
        return results.rows;

      },function(err){
        console.log('err was: ',err);
      });

  },
  getCategoryId: function(categoryName)
  {

    return promisifiedQuery('SELECT DISTINCT categories.id FROM categories WHERE categories.name = ($1)',[categoryName])
    .then(function(results){
        // var tmparr = result.rows.map(function(element){
        //   return element.name;
        // });
        console.log("getCategoryID: ",results.rows[0]);
        return results.rows;

      },function(err){
        console.log('err was: ',err);
      });

  },
  newCategory: function(categoryName)
  {
    console.log('new category: ',categoryName);
    return promisifiedQuery('SELECT name FROM categories WHERE categories.name = ($1)',[categoryName])
      .then(function(result){
        if (result.rows.length === 0)
          return promisifiedQuery('INSERT INTO categories (name) VALUES ($1)',[categoryName]);

      });

  },
  deleteCategory: function(categoryid)
  {
    return promisifiedQuery('DELETE FROM products WHERE products.category_id = ($1)',[categoryid]).
    then(function()
      {
        return promisifiedQuery('DELETE FROM categories WHERE categories.id = ($1)',[categoryid])
      });
  },
  getProducts: function(categoryid)
  {

    return promisifiedQuery('SELECT products.name,products.id FROM products JOIN categories ON products.category_id = categories.id WHERE categories.id = ($1)',[categoryid])
    .then(function(results){
        // var tmparr = result.rows.map(function(element){
        //   return element;
        // });
        console.log("products are: ",results.rows);
        return results.rows;

      },function(err){
        console.log('err was: ',err);
      });

  },
  addProduct: function(categoryid,productName)
  {
    console.log('new product: ',productName);
    return promisifiedQuery('SELECT products.name FROM products JOIN categories ON products.category_id = categories.id WHERE products.name = ($1) AND categories.id = ($2)',[productName,categoryid])
      .then(function(result){
        if (result.rows.length === 0)
          return promisifiedQuery('INSERT INTO products (name,category_id) VALUES ($1,$2)',[productName,categoryid]);

      });
  },
  deleteProduct: function(categoryid,productid)
  {
    //console.log('new product: ',productName);
    return promisifiedQuery('DELETE FROM products WHERE products.category_id = ($1) AND products.id = ($2)',[categoryid,productid]);
  }
} 
  

module.exports = db;