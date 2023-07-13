
const { Comment } = require('../models');

const commentData = [
  {
    content: "First Comment",
    user_id: "2",
    post_id: "1",
  },
  {
    content: "Second Comment",
    user_id: "3",
    post_id: "2",
  },
  {
    content: "Third Comment",
    user_id: "1",
    post_id: "3",
  },
];

const seedComment = async () => {
  for (let i = 0; i < commentData.length; i++) {
    const comment = commentData[i];
    await Comment.create(comment);
  }
};

module.exports = seedComment;
