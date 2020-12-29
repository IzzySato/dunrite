const express = require('express');
const router = express.Router();

//GET load add a new customer form
router.get('/', async (req, res) => {
  if (req.isAuthenticated()) {
    const product = await req.Product.find();
    res.render('addEditCustomer', {
      script: 'addEditCustomer',
      subTitle: 'Create a new Customer',
      data: {},
      product
    });
  } else {
    res.redirect('/');
  }
});

//GET load edit customer form
router.get('/:id', async (req, res) => {
  if (req.isAuthenticated()) {
    const {
      id
    } = req.params;
    const data = await req.Customer.findOne({
      _id: id
    });
    const product = await req.Product.find();
    res.render('addEditCustomer', {
      script: 'addEditCustomer',
      subTitle: 'Edit Customer',
      data,
      product
    });
  } else {
    res.redirect('/');
  }
});

//POST add a new customer to the customer database
router.post('/add', async (req, res) => {
  const {
    body: {
      id,
      customerFirstName,
      customerLastName,
      phone,
      email,
      street,
      city,
      postcode,
      country,
      hottubModel,
      history,
      comments
    }
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
    hottubModel,
    history,
    comments
  };

  try {
    if (id === 'new') {
      const newCustomer = new req.Customer(customer);
      newCustomer.save();
    } else {
      await req.Customer.updateOne({
        _id: id
      }, {
        customerFirstName,
        customerLastName,
        phone,
        email,
        street,
        city,
        postcode,
        country,
        hottubModel,
        history,
        comments
      });
    }
    res.json({
      url: '/customerList'
    });
  } catch (err) {
    console.log(err);
  };
});

module.exports = router;