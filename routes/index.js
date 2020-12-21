const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Dunrite' });
});

router.post('/', (req, res) => {
  console.log('login: ');
  const user = new req.User({
    username: req.body.username,
    password: req.body.password
  });
  try{
    req.login(user, (err) => {
      if(err) console.log(err);
      else{
        req.passport.authenticate('local')(req, res, () => {
          console.log('index post');
          res.json({url: '/customer'});
        });
      }
    });
  }catch(error){
    console.log(error);
  }
});

module.exports = router;
