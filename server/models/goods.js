var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  "productId": {type:String},
  "productName": String,
  "salePrice": Number,
  "productImage": String,
  "productNum":Number,
  "checked":Number
});

// good 自动和数据库中goods关联
module.exports = mongoose.model('Good', productSchema);