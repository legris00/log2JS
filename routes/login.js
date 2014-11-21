var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
res.render('login', { title: 'Express' });
});


router.post('/', function (req, res) {
  var post = req.body;
  var login = req.body.user;
  var password = req.body.password;
  var session = req.session;
  console.log(session);
  console.log('Login as: ' + login + ' with ' + password);
  if (post.user === 'user' && post.password === 'password') {
    req.session.username = post.user;
    res.render('index', {username: req.session.username});
  } else {
    res.send('Sorry bad user/pass');
    res.redirect('/');
  }
});module.exports = router;
