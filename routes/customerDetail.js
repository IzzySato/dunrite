const express = require('express');
const router = express.Router();

// GET loading customerDetailPage
router.get('/:id', async (req, res) => {
  if(req.isAuthenticated()){
    const { id } = req.params;
    const data = await req.Customer.findOne({_id: id});
    res.render('customerDetail', {script: 'customerDetail', data});
  }else{
    console.log('You need to login');
    res.redirect('/');
  }
});

//GET display the selected customer's detail
router.get('/data/:id', async (req, res) => {
  if(req.isAuthenticated){
    const { id } = req.params;
    const data = await req.Customer.findOne({_id: id});
    res.json(data);
  }else{
    console.log('not authenticated');
    res.redirect('/');
  }
});

module.exports = router;