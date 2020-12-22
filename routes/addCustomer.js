const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if(req.isAuthenticated()){
    res.render('addCustomer', {script: 'addCustomer'});
  }else{
    res.redirect('/');
  }
});

router.post('/', (req, res) => {
  const { body: {
    customerFirstName,
    customerLastName,
    phone,
    email,
    street,
    city,
    postcode,
    country,
    date,
    work,
    comments }
  } = req;

  const newCustomer = {customerFirstName,
    customerLastName,
    phone,
    email,
    street,
    city,
    postcode,
    country,
    date,
    work,
    comments};

  try {
    const customer = new req.Customer(newCustomer);
    customer.save();
    res.json({url: '/customerList'});
  }catch(err){
    console.log(err);
  };
});

module.exports = router;