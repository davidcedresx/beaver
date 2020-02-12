module.exports = {

	exits: {
		redirect: {
			responseType: 'redirect'
		}
	},

	fn: async function() {

		if (this.req.me.isAdmin) {
			throw { redirect: '/dashboard' }
		}

		throw { redirect: `/users/${this.req.me.id}` }
	}
}