import User from '../models/user';

export const me = (req, res, next) => {
	res.json(req.user)
}

export const getUser = (req, res, next) => {
	User.findById(req.params.id, function (err, user) { 

    if (err) return res.status(500).send(err);

		res.json({user})

	});
}

export const updateUser = (req,res, next) => {
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