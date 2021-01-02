const express = require('express');
const router = express.Router();

// GET loading customerDetailPage
router.get('/:id', async (req, res) => {
  if(req.isAuthenticated()){
    const { id } = req.params;
    const data = await req.Customer.findOne({_id: id});
    res.render( 'customerDetail', 
    { 
      scripts: ['customerDetail', 'util'], 
      data
    });
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

//GET all work history
router.get('/workHistory/:id', async (req, res) => {
  if(req.isAuthenticated){
    const {id} = req.params;
    const data = await req.Work.find({customerId: id});
    res.json(data);
  }else{
    console.log('not authenticated');
    res.redirect('/');
  }
});

router.post('/addWork', async (req, res) => {
  if (req.isAuthenticated()) {
    try{
      const {
        body: {
          customerId,
          date,
          service
        }
      } = req;

      const newWork = new req.Work({customerId, date, service});
      newWork.save();
      res.json({
        url: `/customerDetail/${customerId}`
      });
    }catch(err){
      console.log(err);
    }
  }else{
    console.log('not authenticated');
    res.redirect('/');
  }
});

module.exports = router;