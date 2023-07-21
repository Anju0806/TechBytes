
const router = require('express').Router();
const { Comment } = require('../../models');


router.post('/', async (req, res) => {
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


  module.exports = router;