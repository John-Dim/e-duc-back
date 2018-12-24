export const me = (req, res, next) => {
	console.log('---------d---------')
	res.json(req.user)
}