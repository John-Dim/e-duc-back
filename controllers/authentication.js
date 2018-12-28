import User from'../models/user';
import jwt from 'jwt-simple';
import config from '../config';

const tokenForUser = (userId) => {
	const timestamp = new Date().getTime();
	return jwt.encode({sub: userId, iat: timestamp}, config. secret);
}

export const signup = (req, res, next) => {
	const { name, 
					surname, 
					speciality, 
					field, 
					institution, email, 
					password } = req.body;

	if (!email || !password) {
		return res.status(422).send({error: 'You must provide email and password'})
	}

	User.findOne({email}, (error, existingUser) => {
		if (error) { return next(error); }

		if (existingUser) {
			return res.status(422).send({error: 'Email in user'})
		}

		const user = User(
			{ name, 
				surname, 
				speciality, 
				field, 
				institution, 
				email, 
				password
			});
		user.save(function(error) {
			if (error) { return next(error); }

			res.json({token: tokenForUser(user.id)})
		})
	})
}

export const signin = (req, res, next) => {
	// User has already had their email and password auth'd
	// from local strategy
	// We just need to give them a token
	// req.user populated from done function at localStrategy
	res.send({token: tokenForUser(req.user.id)})
}