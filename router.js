import { signup, signin }  from './controllers/authentication';
import { me, getUser, getUsers, updateUser, followGroup, getUserGroups } from './controllers/users'
import {  createGroup, 
					getGroup, 
					updateGroup, 
					getGroups } from './controllers/groups';
import { createUserPost, getUserPosts } from './controllers/posts';

import passportService from './services/passport';
import passport from 'passport';

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const router = (app) => {
	app.post('/signin', requireSignin, signin);
	app.post('/signup', signup);

	app.get('/me', requireAuth, me);
	app.get('/users', requireAuth, getUsers);
	app.get('/users/:id', requireAuth, getUser);
	app.put('/users/:id', requireAuth, updateUser);
	app.post('/users/posts', requireAuth, createUserPost);
	app.get('/users/:id/posts', requireAuth, getUserPosts);

	app.get('/users/:id/groups', requireAuth, getUserGroups);
	app.put('/users/follow_group/:id', requireAuth, followGroup);

	app.post('/groups', requireAuth, createGroup);
	app.get('/groups/:id', requireAuth, getGroup);
	app.put('/groups/:id', requireAuth, updateGroup);
	app.get('/groups', requireAuth, getGroups);

}

export default router;