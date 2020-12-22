const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if(req.isAuthenticated()){
    res.render('customerList', {script: 'loadCustomer'});
  }else{
    console.log('not authenticated');
    res.redirect('/');
  }
});

router.get('/data', async (req, res) => {
  if(req.isAuthenticated()){
    const data = await req.Customer.find();
    res.json(data);
    //console.log(JSON.stringify(data));
  }else{
    console.log('not authenticated');
    res.redirect('/');
  }
});

module.exports = router;