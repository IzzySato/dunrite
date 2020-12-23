const express = require('express');
const router = express.Router();

//GET load add a new customer form
router.get('/', (req, res) => {
  if(req.isAuthenticated()){
    res.render('addEditCustomer', {script: 'addEditCustomer', subTitle: 'Create a new Customer', data: {}});
  }else{
    res.redirect('/');
  }
});

//GET load edit customer form
router.get('/:id', async (req, res) => {
  if(req.isAuthenticated()){
    const {id} = req.params;
    const data = await req.Customer.findOne({_id: id});
    res.render('addEditCustomer', {script: 'addEditCustomer', subTitle: 'Edit Customer', data});
  }else{
    res.redirect('/');
  }
});

//POST add a new customer to the customer database
router.post('/add', async (req, res) => {
  const { body: {
    id,
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

  const customer = {
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
    comments
  };

  try {
    if(id === 'new'){
      const newCustomer = new req.Customer(customer);
      newCustomer.save();
    }else{
      await req.Customer.updateOne(
        {_id: id},
        { customerFirstName,
          customerLastName,
          phone,
          email,
          street,
          city,
          postcode,
          country,
          date,
          work,
          comments
        }
        )}
        res.json({url: '/customerList'});
  }catch(err){
    console.log(err);
  };
});

module.exports = router;