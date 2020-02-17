module.exports = {

	exits: {
		success: {
			viewTemplatePath: 'pages/dashboard'
		}
	},

	fn: async function() {

		var users = await User.find({ creator: this.req.me.id });
		var websites = await Website.find({ owner: users.map(function (user) { return user.id }) });

		var data = {
			requests: [],
			users,
			websites
		};

		return data;
	}
}