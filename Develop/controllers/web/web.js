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
  const post_data_plain = post_data.map((post) => {
    const plainPost = post.get({ plain: true });
    plainPost.createdAt = post.createdAt; // Add the createdAt property
   // console.log('createdAt:', plainPost); 
    return plainPost;
  });

  res.render('index', { post_data_plain, loggedIn: req.session.logged_in });
} catch (error) {
  console.error(error);
  res.render('error');
}
});

// /clicking on dashbord--present all my post 
router.get('/dashboard', async (req, res) => {
  try {
     
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
      res.render('viewdashboard', { post_data_plain, logged_in: req.session.logged_in});
       } }catch (error) {

      res.status(500).json({ error: 'Server error' });
  }
});

router.get('/addapost', async (req, res) => {
  try {
    if (!req.session.logged_in) {
        res.render('login');
    }
    else{
    res.render('addpost');
     } 
    
    }catch (error) {
    res.status(500).json({ error: 'Server error' });
}
});

router.post('/savepost', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      return res.render('login');
    } else {
      const { title, content } = req.body; 
      const user_id = req.session.user_id;

      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content cannot be empty.' });
      }

      await Post.create({ title, content, user_id });

      res.status(200).json();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});
router.post('/savecomment', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      return res.render('login');
    } else {
      const { post_id, content } = req.body; 
      const user_id = req.session.user_id;

      if (!post_id || !content) {
        return res.status(400).json({ error: 'Content cannot be empty.' });
      }
      await Comment.create({ content, user_id, post_id});

      res.status(200).json();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/addcomment', async (req, res) => {
  if (!req.session.logged_in) {
    return res.render('login');
  }
  const user_id = req.session.user_id;
  const postId = req.query.postid;
  try {
    // Perform a check if the user has already written a comment for the post
    const existingComment = await Comment.findOne({
      where: {
        user_id: user_id,
        post_id: postId
      }
    });
    if (existingComment) {
      return res.redirect(`/post/${postId}`); 
    }
    
    // User has not written a comment, render the "addcomment" template
    const post_data = await Post.findByPk(postId, {
      include: [
        {
          model: User,
          include: [{ model: Comment, include: [User] }]
        }
      ]
    });
    if (!post_data) {
      return res.status(404).json({ error: 'Could not find the post.' });
    } 
    const post_plain = post_data.get({ plain: true });
    const comment_data = post_plain.user.comments;
    res.render('addcomment',{ post_plain, comment_data, logged_in: req.session.logged_in });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});



// post/id --- show a post
router.get('/post/:id', async (req, res) => {
  try {
    const postid=req.params.id;
    const post_data = await Post.findByPk(postid, {
      include: [
        {
          model: User,
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (!post_data) {
      return res.status(404).json({ error: 'Could not find the post.' });
    }

    const post_plain = post_data.get({ plain: true });
    //const comment_data = post_plain.user.comments;
    const comment_data = post_plain.comments;
    res.render('onepost', { post_plain, comment_data, logged_in: req.session.logged_in });
  } catch (error) {
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