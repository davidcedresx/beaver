module.exports = {
    attributes: {
        name: { type: 'string' },
        websites: { collection: 'website', via: 'template' }    
    }
}
