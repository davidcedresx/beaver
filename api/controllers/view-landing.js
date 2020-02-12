module.exports = {

	exits: {
		success: {
			viewTemplatePath: 'pages/landing'
		},

		redirect: {
			description: 'The requesting user is logged in.',
			responseType: 'redirect'
		}
	},

	fn: async function() {

		if(this.req.me) {
			throw { redirect: '/home' };
		}

		return {}
	}
}