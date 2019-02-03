import Post from '../models/post';
import User from '../models/user';

export const createUserPost = (req, res, next) => {
  const { body } = req.body;

  const post = Post({ body, creator: req.user._id, profilePost: true});

  post.save(function(error) {
    if (error) { return next(error); }

    res.json(post);
  })
}

export const getUserPosts = (req, res, next) => {
  const creatorId = req.params.id;

  Post.find({creator: creatorId}, function (err, posts) { 

    if (err) return res.status(500).send(err);
    res.json(posts);
  });
}