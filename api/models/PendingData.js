module.exports = {
    attributes: {
        website: { model: 'website', unique: true },
        'company_name': { type: 'string', required: true },
        'logo_image_url': { type: 'string', required: true },
        'header_title': { type: 'string', required: true },
        'header_description': { type: 'string', required: true },
        'footer_text': { type: 'string', required: true },
        'relevant_information_column_1_title': { type: 'string', required: true },
        'relevant_information_column_1_text': { type: 'string', required: true },
        'relevant_information_column_2_title': { type: 'string', required: true },
        'relevant_information_column_2_text': { type: 'string', required: true },
        'relevant_description_column_1_title': { type: 'string', required: true },
        'relevant_description_column_1_text': { type: 'string', required: true },
        'relevant_description_column_2_title': { type: 'string', required: true },
        'relevant_description_column_2_text': { type: 'string', required: true },
        'services_title': { type: 'string', required: true },
        'services_text': { type: 'string', required: true },
        'home_cards': { type: 'json', required: true },
        'inputs': { type: 'json', required: true }
    }
}
