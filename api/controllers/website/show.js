module.exports = {

	exits: {
		success: {
			viewTemplatePath: 'pages/website/show'
		},

		unauthorized: {
			responseType: 'unauthorized'
		},

		websiteDoesNotExist: {
			responseType: 'badRequest'
		}
	},

	fn: async function(param) {

		var website = await Website.findOne({ id: this.req.param('id') }).populate('data');

		if (!website) {
			throw 'websiteDoesNotExist';
		}

		// it can only be seen by the corresponding admin or the owner
		if (website.owner !== this.req.me.id && !this.req.me.isAdmin)
		{
			throw 'unauthorized';
		}

		return { website };
	}
}