router.get('/logout', isUser, function(req, res) {
  req.session.destroy();
  res.redirect('/');
});
