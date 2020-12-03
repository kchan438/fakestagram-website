var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html',{root: 'public/html'});
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.sendFile('login.html', {root: 'public/html'});
});

router.get('/loginsucess', function(req, res, next) {
  res.sendFile('loginsucess.html', {root: 'public/html'});
});

router.get('/loginfailed', function(req, res, next) {
  res.sendFile('loginfailed.html', {root: 'public/html'});
});

/* GET logout page. */
router.get('/logout', function(req, res, next) {
  res.sendFile('logout.html', {root: 'public/html'});
});

/* GET registration page. */
router.get('/registration', function(req, res, next) {
  res.sendFile('registration.html', {root:'public/html'});
});

router.get('/registrationsucess', function(req, res, next) {
  res.sendFile('registrationsucess.html', {root:'public/html'});
});

router.get('/registrationfailed', function(req, res, next) {
  res.sendFile('registrationfailed.html', {root:'public/html'});
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.sendFile('about.html', {root: 'public/html'});
});

/*GET post page */
router.get('/post', function(req,res,next) {
  res.sendFile('post.html', {root: 'public/html'});
})

/* GET post image page. */
router.get('/postimage', function(req, res, next) {
  res.sendFile('postimage.html', {root: 'public/html'});
});

/* GET post failed page. */
router.get('/postfailed', function(req, res, next) {
  res.sendFile('postfailed.html', {root: 'public/html'});
});

/* GET search results page. */
router.get('/searchresults', function(req, res, next) {
  res.sendFile('searchresults.html', {root: 'public/html'});
});

/* GET images page. */
router.get('/allimages', function(req, res, next) {
  res.sendFile('images.html', {root: 'public/html'});
});

module.exports = router;
