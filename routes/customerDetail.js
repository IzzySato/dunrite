const express = require('express');
const router = express.Router();

// GET loading customerDetailPage
router.get('/:id', (req, res) => {
  if(req.isAuthenticated()){
    const { id } = req.params;
    res.render('customerDetail', {script: 'customerDetail', id});
  }else{
    console.log('You need to login');
    res.redirect('/');
  }
});

//GET display the selected customer's detail
router.get('/data/:id', async (req, res) => {
  if(req.isAuthenticated){
    const { id } = req.params;
    const data = await req.Customer.find({_id: id});
    res.json(data);
  }else{
    console.log('not authenticated');
    res.redirect('/');
  }
});

module.exports = router;