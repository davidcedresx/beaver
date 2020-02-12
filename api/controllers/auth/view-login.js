module.exports = {

	exits: {
		success: {
			viewTemplatePath: 'pages/auth/login'
		},

		redirect: {
			description: 'The requesting user is already logged in.',
			responseType: 'redirect'
		}
	},

	fn: async function() {

		if(this.req.me) {
			throw { redirect: '/home' };
		}

		return {};
	}
}