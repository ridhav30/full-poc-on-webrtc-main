var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/peerJs', function(req, res, next) {
  res.render('peerJsWebrtc/peerJs');
});
router.get('/peerJs-pure', function(req, res, next) {
  res.render('peerJsWebrtcPure/peerJs');
});
module.exports = router;