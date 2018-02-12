var express = require('express');
var passport = require('passport');
var csrf  = require('csurf');
var Product = require('../models/product');

var router = express.Router();

var csrfProtection =  csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err, docs){
    let productChunks = [];
    let chunkSize = 3;
    for(let i = 0; i<docs.length; i+=chunkSize){
      productChunks.push(docs.slice(i, i + chunkSize));

    }
    res.render('shop/index', { title: 'Shopping cart', products: productChunks});
  });
  
});

router.get('/user/signup', function(req,  res,  next){
  var messages = req.flash('error');
  res.render('user/signup', {csrfToken :  req.csrfToken(), messages: messages, hasErrors: messages.length > 0});  

});

router.post('/user/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

router.get('/user/profile', function (req, res, next) {
  res.render('user/profile');
});

router.get('/user/signin', function(req,  res,  next){
  var messages = req.flash('error');
  res.render('user/signin', {csrfToken :  req.csrfToken(), messages: messages, hasErrors: messages.length > 0});  

});

router.post('/user/signin', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}));

module.exports = router;
