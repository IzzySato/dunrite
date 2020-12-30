const express = require('express');
const router = express.Router();

//GET load the product congifg page
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('productConfig', {
      script: 'productConfig'
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
      script: 'productConfig'
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

//POST add a new Hottub brand to the product collection
router.post('/addBrand', (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const {
        body: {
          brandName
        }
      } = req;
      const newProduct = new req.Product({
        hottub: {
          brandName
        }
      });
      newProduct.save();
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

//POST add a new Hottub Model to the product collection
router.post('/addModel', async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const {
        body: {
          brandName,
          model
        }
      } = req;
      console.log(`${brandName} ${model}`);
      await req.Product.findOne({
        'hottub.brandName': brandName
      }, (err, foundProduct) => {
        if (err) console.log(err);
        else {
          foundProduct.hottub.model.push(model);
          foundProduct.save();
          res.json({
            url: 'productConfig'
          });
        }
      });
      res.render('productConfig', {
        script: 'productConfig'
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