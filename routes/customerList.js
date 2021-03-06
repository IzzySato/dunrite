const express = require('express');
const router = express.Router();

const navLinks = [
  {
    name: 'Logout',
    link: '/logout'
  },
  {
    name: 'Add New Customer',
    link: '/addEditCustomer'
  },
  {
    name: 'Product Configuration',
    link: '/productConfig'
  },
];

//GET load the customerList page
router.get('/', (req, res) => {
  if(req.isAuthenticated()){
    res.render('customerList', {navLinks, scripts: ['loadCustomer', 'util']});
  }else{
    console.log('not authenticated');
    res.redirect('/');
  }
});

//GET display all customers
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

//GET delete the selected customer by ID
router.get('/data/delete/:id', async (req, res) => {
  if(req.isAuthenticated){
    const { id } = req.params;
    //console.log(`Delete request received for - ${id}`);
    const data = await req.Customer.deleteOne({_id: id});
    res.render('customerList', {navLinks, scripts: ['loadCustomer', 'util']});
  }else{
    console.log('not authenticated');
    res.redirect('/');
  }
});

module.exports = router;