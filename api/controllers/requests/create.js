module.exports = async function createWebsite(req, res) {

    var domain = req.body.domain;

    var website = await Website.findOne({
        domain
    });

    var data = await PendingData.create({
      'website': website.id,
      'company_name': req.body['company-name'],
      'logo_image_url': req.body['logo-image-url'],
      'header_title': req.body['header-title'],
      'header_description': req.body['header-description'],
      'footer_text': req.body['footer-text'],
      'relevant_information_column_1_title': req.body['relevant-information-column-1-title'],
      'relevant_information_column_1_text': req.body['relevant-information-column-1-text'],
      'relevant_information_column_2_title': req.body['relevant-information-column-2-title'],
      'relevant_information_column_2_text': req.body['relevant-information-column-2-text'],
      'relevant_description_column_1_title': req.body['relevant-description-column-1-title'],
      'relevant_description_column_1_text': req.body['relevant-description-column-1-text'],
      'relevant_description_column_2_title': req.body['relevant-description-column-2-title'],
      'relevant_description_column_2_text': req.body['relevant-description-column-2-text'],
      'services_title': req.body['services-title'],
      'services_text': req.body['services-text'],
      'home_cards': JSON.parse(req.body['home-cards']),
      'inputs': JSON.parse(req.body['inputs'])
    });
    
    await Website.updateOne({ id: website.id }).set({ request: true });

    return res.redirect('/home');
}
