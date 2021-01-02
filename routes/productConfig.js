const express = require('express');
const router = express.Router();

//GET load the product congifg page
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('productConfig', {
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
          id,
          brandName
        }
      } = req;

      if(id === 'new'){
        const newProduct = new req.Product({
          hottub: {
            brandName
          }
        });
        await newProduct.save();
      }else{
        try{
          console.log('Edit brandName ' + brandName);
          await req.Product.updateOne({'hottub.brandName': brandName}, {
            brandName
          });
        }catch(err) {
          console.log(err);
        }
      }
      // res.json({
      //   url: 'productConfig'
      // });

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
          name,
          brandName,
          model
        }
      } = req;
      await req.Product.findOne({
        'hottub.brandName': brandName
      }, async (err, foundProduct) => {
        if (err) console.log(err);
        else {
          if(name === 'new'){
            foundProduct.hottub.model.push(model);
            await foundProduct.save();
          }else{
            const oldModelName = foundProduct.hottub.model.find(m => m === name);
            console.log('model is ' + model + ' oldName is ' + oldModelName);
            oldModelName = model;
            await foundProduct.save();
          }
          res.json({
            url: 'productConfig'
          });
        }
      });
      res.render('productConfig', {
        scripts: ['productConfig', 'util']
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