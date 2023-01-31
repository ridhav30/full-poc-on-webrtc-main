var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/webrtc', function(req, res, next) {
  res.render('pureWebrtc/webrtc');
});
module.exports = router;