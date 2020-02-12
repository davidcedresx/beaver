module.exports = {

	exits: {
		success: {
			viewTemplatePath: 'pages/user/show'
		},

		unauthorized: {
			responseType: 'unauthorized'
		}
	},

	fn: async function(param) {

		var id = this.req.param('id');

		if (this.req.me.id != id && !this.req.me.isAdmin)
		{
			throw 'unauthorized';
		}

		var user = await User.findOne({ id: this.req.param('id')}).populate('websites');

		return { user };
	}
}