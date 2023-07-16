const authenticate = require('../../middleware/authenticate');
const { Post, Comment, User } = require('../../models');

const router = require('express').Router();



//  / -- list of projects
router.get('/', async(req, res) => {
try{
  const post_data=await Post.findAll({
    include: [
      {
        model: User, 
        include:[Comment]}
    ]
  })
  if (!post_data){
    return res.status(404).json({ error: 'Could not load any posts..' });
  }
  const post_data_plain=post_data.map((p) => p.get({ plain: true }));
  
  /* post_data_plain.forEach((post) => {
    console.log(post);
    console.log(post.user);
    console.log(post.user.comments);
    
  }); */
  res.render('index', { post_data_plain, loggedIn: req.session.logged_in});
  }catch (error) {
    console.error(error);
    res.render('error');
}

});

//clicking on dashbord--present all my post 
router.get('/dashbaord', async (req, res) => {
  try {
      //console.log(req.session);
      /* let user_id = req.session.user_id;
      console.log(user_id);
      
       if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }*/
      console.log(req.session);
      if (!req.session.logged_in) {
          res.render('login');
      }
      else{
      const post_data = await Post.findAll({
          where: { user_id: req.session.user_id },
          include: [
            {
              model: User, 
              include:[Comment]}
          ]

      });
      if (!post_data){
        return res.status(404).json({ error: 'Could not load any posts..' });
      }
      const post_data_plain=post_data.map((p) => p.get({ plain: true }));
      
      /* post_data_plain.forEach((post) => {
        console.log(post);
        console.log(post.user);
        console.log(post.user.comments);
        
      }); */
      res.render('viewdashboard', { post_data_plain, logged_in: req.session.logged_in});
       } }catch (error) {

      res.status(500).json({ error: 'Server error' });
  }
});


// post/id --- show a post
router.get('/post/:id', async (req, res) => {
  try {
    const post_data = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          include: [Comment]
        }
      ]
    });
    if (!post_data) {
      return res.status(404).json({ error: 'Could not find the post.' });
    }else{
    const post_plain= post_data.get({ plain: true });
    console.log(post_plain);
    res.render('onepost', { post_plain, logged_in: req.session.logged_in });
  } }
  catch (error) {
    console.error(error);
    res.render('error');
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

      res.redirect('/profile');
      
    });

  } catch (err) {
    res.status(400).json(err);
  }

})


// /login -- show login form & sign up
router.get('/login', (req, res) => {
  res.render('login', {
    logged_in: req.session.logged_in,

  });
})

router.get('/signup', (req, res) => {
  res.render('signup', {
    logged_in: req.session.logged_in,

  });
})

router.post('/signup', async (req, res) => {

  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.redirect('/profile')
    });
  } catch (err) {
    res.render('signup', {
      error: "Something went wrong"
    });
  }
})


// /profile (protected)-- current user projects & create new project
// & delete project
router.use(authenticate);
router.get('/profile', (req, res) => {

  // need the current user
  User.findByPk(req.session.user_id, {
    include: [
      {model: Project}
    ]
  }).then((userData) => {
    res.render('profile', {
      logged_in: req.session.logged_in,
      user: userData.get({plain: true}),
    })

  })

  // need the current user project

})


router.post('/profile/projects/:id/delete', (req, res) => {
  Project.destroy({
    where: {
      id: req.params.id,
    }
  })

  // TODO: continue
  
})




module.exports = router;