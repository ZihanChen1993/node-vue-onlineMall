var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  "userId": {type:String},
  "userName": String,
  "userPwd": String,
  "orderList": Array,
  "cartList": [{
    "productId": String,
    "productName": String,
    "salePrice":String,
    "productImage": String,
    "checked": String,
    "productNum":String
  }],
  "addressList": [{
    "addressId": String,
    "userName": String,
    "streetName": String,
    "postCode": Number,
    "tel": Number,
    "isDefault": Boolean
  }]
});

// good 自动和数据库中goods关联
module.exports = mongoose.model('User', userSchema);