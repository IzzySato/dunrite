const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', (req, res) => {
  const { body: { userFirstName, userLastName, username, password }} = req;
  console.log(`New register for ${userFirstName} / ${userLastName} / ${username} / ${password}`);
  try {
    req.User.register({ userFirstName,
                        userLastName,
                        username, 
                        email: username
                      }, password, (err, user) => {
      if(err){
        console.log(`Error ${err}`);
        res.redirect('/register');
      }else{
        req.passport.authenticate('local')(req, res, () => {
        res.json({url: '/customerList'});
        });
      }
    });    
  } catch (error) {
    console.log(error);
  }

});

module.exports = router;