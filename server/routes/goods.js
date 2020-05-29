var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');
var User = require('./../models/user');



mongoose.connect('mongodb://root:123456@127.0.0.1:27017/dumall', { useNewUrlParser: true });

mongoose.connection.on("connected", function () {
  console.log('MongoDB connected success');
});

mongoose.connection.on("error", function () {
  console.log('MongoDB connected fail');
});

mongoose.connection.on("disconnected", function () {
  console.log('MongoDB disconnected');
});

/* GET goods listing. */
router.get('/list', function (req, res, next) {
  let page = parseInt(req.param("page"));
  let pageSize = parseInt(req.param("pageSize"));
  let priceLevel = req.param("priceLevel");
  let sort = req.param("sort");
  let skip = (page - 1) * pageSize;
  let priceGt = '',
    priceLt = '';
  let params = {};

  if (priceLevel !== 'all') {
    switch (priceLevel) {
      case '0':
        priceGt = 0;
        priceLt = 100;
        break
      case '1':
        priceGt = 100;
        priceLt = 500;
        break
      case '2':
        priceGt = 500;
        priceLt = 1000;
        break
      case '3':
        priceGt = 1000;
        priceLt = 5000;
        break
    }
    params = {
      salePrice: {
        $gte: priceGt,
        $lt: priceLt
      }
    }
  }

  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({ 'salePrice': sort });
  goodsModel.exec({}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      });
    }
  })
});

// 加入到购物车
router.post("/addCart", function (req, res, next) {
  var userId = '100000077',
    productId = req.body.productId;
  // 查找特定用户
  User.findOne({ userId: userId }, function (err, userDoc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      })
    } else {
      if (userDoc) {
        let goodItem = '';
        userDoc.cartList.forEach(item => {
          if (item.productId == productId) {
            goodItem = item;
            item.productNum++;
          }
        });
        if (goodItem) {
          userDoc.save(function (err2, doc2) {
            if (err2) {
              res.json({
                status: "1",
                msg: err2.message
              })
            } else {
              res.json({
                status: '0',
                msg: '',
                result: 'suc'
              })
            }
          })
        } else {
          Goods.findOne({ productId: productId }, function (err1, doc) {
            if (err1) {
              res.json({
                status: "1",
                msg: err1.message
              })
            } else {
              if (doc) {

                // console.log(`doc:${doc}`);
                // console.log(`userDoc.cartList:${userDoc.cartList.toObject()}`);
                // console.log(Object.getPrototypeOf(userDoc));
                userDoc.cartList.push({
                  "productId": doc.productId,
                  "productName": doc.productName,
                  "salePrice": doc.salePrice,
                  "productImage": doc.productImage,
                  "productNum": 1,
                  "checked": 1
                });

                userDoc.save(function (err2, doc2) {
                  if (err2) {
                    res.json({
                      status: "1",
                      msg: err2.message
                    })
                  } else {
                    res.json({
                      status: '0',
                      msg: '',
                      result: 'suc'
                    })
                  }
                })
              }
            }
          })
        }
      }
    }
  })

})



module.exports = router;