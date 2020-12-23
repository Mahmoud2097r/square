const { cloudinary } = require('../cloudinary');

const middleware = {
	asyncErrHandler    : (fn) => (req, res, next) => {
		Promise.resolve(fn(req, res, next)).catch((err) => {
			console.log(err.message);
			// req.flash('error', err.message);
			next();
		});
	},

	async isEmailExists (req, res, next) {
		let userExists = await User.findOne({
			email: req.body.email
		});
		const { user } = res.locals;
		if (userExists) {
			if (user) {
				if (userExists.email === user.email) {
					next();
				} else {
					// req.flash(
					// 	'error',
					// 	'A user with the given email is already registered'
					// );
					return res.redirect('back');
				}
			} else {
				// req.flash(
				// 	'error',
				// 	'A user with the given email is already registered'
				// );
				return res.redirect('back');
			}
		}
		next();
	},
	async isLoggedin (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			// req.flash(
			// 	'error',
			// 	'You need to be logged in first'
			// );
			req.session.redirectTo = req.originalUrl;
			res.redirect('/');
		}
	},
	async isValidPassword (req, res, next) {
		const { user } = await User.authenticate()(
			req.user.username,
			req.body.currentPassword
		);
		if (user) {
			// add user to res.locals
			res.locals.user = user;
			next();
		} else {
			// req.flash(
			// 	'error',
			// 	'Incorrect current password!'
			// );
			return res.redirect('/update-info');
		}
	},
	async changePassword (req, res, next) {
		const {
			newPassword,
			passwordConfirmation
		} = req.body;

		if (newPassword && !passwordConfirmation) {
			// req.flash(
			// 	'error',
			// 	'Missing password confirmation!'
			// );
			return res.redirect('/update-info');
		} else if (newPassword && passwordConfirmation) {
			const { user } = res.locals;
			if (newPassword === passwordConfirmation) {
				await user.setPassword(newPassword);
				next();
			} else {
				// req.flash(
				// 	'error',
				// 	'New passwords must match!'
				// );
				return res.redirect('/update-info');
			}
		} else {
			next();
		}
	},


};

module.exports = middleware;
