const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if(req.isAuthenticated()){
    res.render('customerList');
  }else{
    console.log('customer not authenticated');
    res.redirect('/');
  }
});

module.exports = router;