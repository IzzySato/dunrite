const express = require('express');
const router = express.Router();

const navLinks = [
  {
    name: 'Logout',
    link: '/logout'
  },
  {
    name: 'Customer List',
    link: '/customerList'
  },
  {
    name: 'Add New Customer',
    link: '/addEditCustomer'
  }
];

//GET load the product congifg page
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('productConfig', {
      navLinks,
      scripts: ['productConfig', 'util']
    })
  } else {
    res.redirect('/')
  }
});

//GET hottub brand
router.get('/brand', async (req, res) => {
  if (req.isAuthenticated()) {
    const product = await req.Product.find();
    res.json(product);
  } else {
    res.redirect('/');
  }
});

//GET selected brand remove from database
router.get('/brandDelete/:id', async (req, res) => {
  if (req.isAuthenticated) {
    const {
      id
    } = req.params;
    const product = await req.Product.deleteOne({
      _id: id
    });
    // console.log(req.chalk.yellow(`deleteing id is ${id}`));
    res.render('productConfig', {
      navLinks,
      scripts: ['productConfig', 'util']
    });
  } else {
    console.log('not authenticated');
    res.redirect('/');
  }
});

//POST remove model from product collection
router.post('/removeModel', async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const {
        body: {
          brandName,
          model
        }
      } = req;
      const product = await req.Product.findOne({'hottub.brandName': brandName});
      product.hottub.model = product.hottub.model.filter(m => m !== model);
      product.save();
      res.json({
        url: 'productConfig'
      });
    } catch (err) {
      console.log(err);
    }
  }else{
    console.log('not authenticated');
    res.redirect('/');
  }
});

//POST add a new brand or edit the brandName
router.post('/addEditBrand', async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const {
        body: {
          status,
          brandName,
          newBrandName
        }
      } = req;

      if(status === 'new'){
        const newProduct = new req.Product({
          hottub: {
            brandName : newBrandName
          }
        });
        await newProduct.save();
      }else{
        try{
          await req.Product.updateOne({'hottub.brandName': brandName}, {
            'hottub.brandName': newBrandName
          });
        }catch(err) {
          console.log(err);
        }
      }
      res.json({
        url: 'productConfig'
      });

    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('not authenticated');
    res.redirect('/');
  }
});

//POST add a new Hottub Model or edit model
router.post('/addEditModel', async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const {
        body: {
          status,
          brandName,
          model,
          newModel
        }
      } = req;

      let newModelArray = [];
      await req.Product.findOne({
        'hottub.brandName': brandName
      }, async (err, foundProduct) => {
        if (err) console.log(err);
        else {
          if(status === 'new'){
            foundProduct.hottub.model.push(model);
            await foundProduct.save();
          }else{
            foundProduct.hottub.model.forEach(p => {
              if(p === model){
                console.log(p);
                console.log('new model is ' + newModel);
                newModelArray.push(newModel)
              }else{
                console.log(p);
                newModelArray.push(p);
              }
            });
            console.log(newModelArray);
            foundProduct.hottub.model = newModelArray;
            await foundProduct.save();
          }
          res.json({
            url: 'productConfig'
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('not authenticated');
    res.redirect('/');
  }
});

module.exports = router;