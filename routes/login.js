var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
res.render('login', { title: 'Express' });
});


router.post('/', function (req, res) {
  var post = req.body;
  if (post.user === 'user' && post.password === 'password') {
    req.session.user_id = post.user;
    res.redirect('/');
  } else {
    res.send('Sorry bad user/pass');
    res.redirect('/');
  }
});module.exports = router;
