module.exports = { 
    attributes: {
        state: { type: 'string', defaultsTo: 'online' },
        owner: { model: 'user' },
        domain: { type: 'string', unique: true, required: true },
        data: { collection: 'data', via: 'website' },
        request: { type: 'boolean', defaultsTo: false },
        pending_data: { collection: 'pendingData', via: 'website' }
    }
}
