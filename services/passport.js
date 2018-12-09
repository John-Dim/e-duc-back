import passport from 'passport';
import User from '../models/user';
import config from '../config';
import passportjwt from 'passport-jwt';
import LocalStrategy from 'passport-local';

const JwtStrategy = passportjwt.Strategy;
const ExtractJwt = passportjwt.ExtractJwt;


// Create local strategy for login
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
	// Verify this email and password, call done with the user
	// if it is the correct email and password
	// otherwise, call done with false

	User.findOne({email}, (err, user) => {
		if (err) { return done(err); }
		if (!user) { return done(null, false); }

		// shame ... shame ... SHAME!!!!
		if (user.password !== password) {
			return done(null, false)
		} else {
			return done(null, user)
		}

	})


})

const jwtOptions = {
	// extract jwt from request header authorization key
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

// Create JWT strategy
// Is going to be run whenever a request
// comes with a jwt
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {

	User.findById(payload.sub, (err, user) => {
		if (err) { return done(err, false); }

		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	})
})

// Tell passport to use this stratege
passport.use(jwtLogin);
passport.use(localLogin);
