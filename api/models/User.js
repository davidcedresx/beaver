module.exports = {
    attributes: {
        email: { type: 'string', unique: true, required: true },
        password: { type: 'string', protect: true },
        name: { type: 'string', required: true },
        isAdmin: { type: 'boolean', defaultsTo: false },
        creator: { model: 'user', defaultsTo: undefined },
        users: { collection: 'user', via: 'creator' },
        websites: { collection: 'website', via: 'owner' }
    }
}
