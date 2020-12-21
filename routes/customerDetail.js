const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if(req.isAuthenticated()){
    res.render('customerDetail');
  }else{
    res.redirect('/');
  }
})
module.exports = router;