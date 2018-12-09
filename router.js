import { signup, signin }  from './controllers/authentication';
import passportService from './services/passport';
import passport from 'passport';

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
const router = (app) => {
	app.get('/', requireAuth, function(req, res) {
		res.send({ hi: 'there' });
	})


	app.post('/signin', requireSignin, signin)

	app.post('/signup', signup)
}

export default router;

// app.get('/users/:id', (req, res) => res.json({
// 	id: req.params.id,
// 	userName: 'Giannis',
// 	lastName: 'Dimitropoulos',
// 	email: 'jdimitrop@gmail.com',
// 	age: 25,
// 	details: 'Dio logia gia mena',
// 	status: 'Foititis Pliroforikis',
// 	university: 'University of Pireaus',
// 	scientificFields: 'Web Development',
// 	livingAt: 'Pireaus',
// 	posts: [
// 		{
// 			id: 1,
// 			body: 'Post 1',
// 			created_at: 'Kapote'
// 		},
// 		{
// 			id: 2,
// 			body: 'Post 2',
// 			created_at: 'Kapote'
// 		},
// 		{
// 			id: 3,
// 			body: 'Post 3',
// 			created_at: 'Kapote'
// 		},
// 	],
// 	articles: [
// 		{
// 			id: 1,
// 			title: 'Article 1'
// 		},
// 		{
// 			id: 2,
// 			title: 'Article 2'
// 		},
// 		{
// 			id: 3,
// 			title: 'Article 3'
// 		}
// 	]
// }))