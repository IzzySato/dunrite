const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', (req, res) => {
  console.log('new user req');
  const { body: { username, password }} = req;
  console.log(`New register for ${username} / ${password}`);
  try {
    req.User.register({ username }, password, (err, user) => {
      if(err){
        console.log(`Error ${err}`);
        res.redirect('/register');
      }else{
        req.passport.authenticate('local')(req, res, () => {
        res.json({url: '/customer'});
        });
      }
    });    
  } catch (error) {
    console.log(error);
  }

});

module.exports = router;