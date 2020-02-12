module.exports = {

	exits: {
		success: {
			viewTemplatePath: 'pages/dashboard'
		}
	},

	fn: async function() {

		var data = {
			requests: [],
			users: await User.find({ creator: this.req.me.id }),
			websites: []
		};

		return data;
	}
}