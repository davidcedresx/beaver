module.exports = { 
    attributes: {
        state: { type: 'string' },
        template: { model: 'template' },
        owner: { model: 'user' },
        domain: { type: 'string', unique: true, required: true },
        data: { collection: 'data', via: 'website' }
    }
}
