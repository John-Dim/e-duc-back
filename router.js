import { signup, signin }  from './controllers/authentication';
import { me, getUser, updateUser } from './controllers/users'
import { createPost, getUserPosts } from './controllers/posts';

import passportService from './services/passport';
import passport from 'passport';

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const router = (app) => {
	app.post('/signin', requireSignin, signin);
	app.post('/signup', signup);

	app.get('/me', requireAuth, me);
	app.get('/users/:id', requireAuth, getUser);
	app.put('/users/:id', requireAuth, updateUser);
	app.get('/users/:id/posts', requireAuth, getUserPosts);

	app.post('/posts', requireAuth, createPost);

}

export default router;