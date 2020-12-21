const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if(req.isAuthenticated()){
    res.render('addCustomer');
  }else{
    res.redirect('/');
  }
});

module.exports = router;