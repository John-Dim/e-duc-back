import User from '../models/user';
import Group from '../models/group';
import Post from '../models/post';

export const me = (req, res, next) => {
	res.json(req.user)
}

export const getUser = (req, res, next) => {
	User.findById(req.params.id)
		.populate('followingGroups')
		.lean()
		.exec(
			(err, user) => { 
			  if (err) return res.status(500).send(err);

			  Group.find({creator: user._id})
			  	.lean()
			  	.exec((err, groups) => {
				  if (err) return res.status(500).send(err);
				  	user.groups = groups;

			  	Post.find({creator: user._id, profilePost: true})
			  		.lean()
			  		.exec((err,posts) => {
						  if (err) return res.status(500).send(err);

			  			user.posts = posts
				  		res.json({user})
			  		})
			  })
			}
	);
}

export const getUsers = (req, res, next) => {
	User.find({})
		.populate('followingGroups')
		.exec(
			(err, user) => { 
			  if (err) return res.status(500).send(err);

				res.json(user)

			}
	);
}

export const updateUser = (req, res, next) => {
	// This would likely be inside of a PUT request, since we're updating an existing document, hence the req.params.todoId.
	// Find the existing resource by ID
	User.findByIdAndUpdate(
	    // the id of the item to find
	    req.user._id,
	    
	    // the change to be made. Mongoose will smartly combine your existing 
	    // document with this change, which allows for partial updates too
	    req.body,
	    
	    // an option that asks mongoose to return the updated version 
	    // of the document instead of the pre-updated one.
	    {new: true},
	    
	    // the callback function
	    (err, user) => {
	    // Handle any possible database errors
	        if (err) return res.status(500).send(err);
	        return res.send(user);
	    }
	)
}

export const getUserGroups = (req, res, next ) => {
  User.findById(
    {_id: req.params.id },
  ).populate('followingGroups')
  .exec((err, user) => {
     if (err) return handleError(err);
     return res.send(user.followingGroups)
   })
}

export const followGroup = (req, res, next ) => {
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { "$push": { "followingGroups": req.params.id } },
    {new: true},
    (err, user) => {
       if (err) return handleError(err);
       return res.send(user)
    }
  );
}