var _data =  
{
  SpyWare: [
    { name: 'Glass Tumbler'}
  ],
  Test: [
    { name: 'Test test Tumbler' },
    { name: 'asdfasdf'}
  ],
  Stationary: [
    { name: 'Paper Clips' },
    { name: 'Paper' }
  ]
};

var db = {
	getCategories: function()
	{
		return Object.keys(_data);
	},
  newCategory: function(categoryName)
  {
    if (this.getCategories().indexOf(categoryName) == -1)
    {
      _data[categoryName] = [];
    }
  },
  deleteCategory: function(categoryName)
  {
    if (this.getCategories().indexOf(categoryName) != -1)
    {
      delete _data[categoryName];
    }
  },
  getProducts: function(categoryName)
  {
    if (this.getCategories().indexOf(categoryName) != -1)
    {
      return _data[categoryName];
    }
  },
  addProduct: function(categoryName,productName)
  {
    if (this.getCategories().indexOf(categoryName) != -1)
    {
      _data[categoryName].push({name: productName});
    }
  },
  deleteProduct: function(categoryName,index)
  {
    if (this.getCategories().indexOf(categoryName) != -1)
    {
      _data[categoryName].splice(index,1);
    }
  }
}	
	

module.exports = db;