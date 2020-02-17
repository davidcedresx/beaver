module.exports = {

	inputs: {
		domain: {
			type: 'string',
			required: true
		}
	},

	exits: {
		redirect: {
			responseType: 'redirect'
		},
		
		pageNotFound: {
			responseType: 'redirect'
		}
	},

	fn: async function(inputs) {

		// todo: validation, a website can only be updated by its corresponding administrator

		try {

			var website = await Website.findOne({ domain: inputs.domain });
			var _ = await Website.updateOne({ domain: inputs.domain }).set({ state: website.state == 'online' ? 'offline' : 'online' });

			throw { redirect: '/dashboard' };
		} catch {
			throw { pageNotFound: '/dashboard' };
		}
	}
}