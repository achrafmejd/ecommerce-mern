const Product = require('../models/Product');

module.exports.get_home = async (req,res) => {
   try {
       const sortedProducts = await Product.find({}).sort({date_added : -1}).limit(4);
       const popularProducts = await Product.find({}).sort({numberOfItemSold: -1}).limit(4);
       res.status(200).json([{sortedProducts, popularProducts}]);
   } catch (error) {
        console.log(products);
   }
}