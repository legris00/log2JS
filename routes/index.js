var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.locals.user = req.user || null;
  res.render('index', { title: 'Express' });
});

module.exports = router;
