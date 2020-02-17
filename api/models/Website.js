module.exports = { 
    attributes: {
        state: { type: 'string', defaultsTo: 'online' },
        owner: { model: 'user' },
        domain: { type: 'string', unique: true, required: true },
        data: { collection: 'data', via: 'website' }
    }
}
