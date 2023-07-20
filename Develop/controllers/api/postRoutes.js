
const router = require('express').Router();
const { Post } = require('../../models');

router.delete('/:id', async (req, res) => {
    try {
      const postId = req.params.id;
  
      // Find the post by ID
      const post = await Post.findByPk(postId);
  
      if (!post) {
        return res.status(404).json({ error: 'Could not find the post.' });
      }
      await post.destroy();
  
      res.status(200).json({ message: 'Post deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });


router.put('/', async (req, res) => {
  try {
    const { post_id, title, content } = req.body;
    

    // Find the post by ID
    const post = await Post.findByPk(post_id);

    if (!post) {
      return res.status(404).json({ error: 'Could not find the post.' });
    }

    // Update the post data
    post.title = title;
    post.content = content;
    await post.save();

    res.status(200).json({ message: 'Post updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/', async (req, res) => {
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

module.exports = router;