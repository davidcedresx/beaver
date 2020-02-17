module.exports = {

	exits: {
		success: {
			viewTemplatePath: 'pages/website/requests'
		}
	},

	fn: async function() {

        // todo, this should be only work if this.me is admin

		var users = await User.find({ creator: this.req.me.id });
		var requests = await Website.find({ owner: users.map(function (user) { return user.id }), requests: false });
		// var requests = websites.filter(function(website) {
		// 	return website.request !== null
		// });

		return { requests };
	}
}