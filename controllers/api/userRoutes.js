const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {

  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.redirect('/')
    });
  } catch (err) {
    res.render('signup', {
      error: "Something went wrong"
    });
  }
})

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      /* res.redirect('/');  */
      res.json({message:'User is logged out'});
    });
  } else {
    res.status(404).json({err:'no user logged in'});
  }
});


router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.render('login', {
        error: "Incorrect email or password, please try again"
      });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.render('login', {
        error: "Incorrect email or password, please try again"
      });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.redirect('/');
      
    });

  } catch (err) {
    res.status(400).json(err);
  }

})

module.exports = router;
