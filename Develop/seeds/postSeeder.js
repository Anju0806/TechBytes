
const { Post } = require('../models');

const postData = [
  {
    title: 'First Post',
    post: 'This is the first post.',
    user_id: 1,
  },
  {
    title: 'Second Post',
    post: 'This is the second post.',
    user_id: 1,
  },
  {
    title: 'Third Post',
    post: 'This is the third post.',
    user_id: 2,
  },
];

const seedPost = async () => {
  for (let i = 0; i < postData.length; i++) {
    const post = postData[i];
    await Post.create(post);
  }
};

module.exports = seedPost;
