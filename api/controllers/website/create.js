module.exports = async function createWebsite(req, res) {

    // check if user exists and it's administrated by me
    var users = await User.find({ email: req.body.email.toLowerCase(), creator: req.me.id });

    if (users.length === 0 || users[0].creator !== req.me.id)
    {
      return res.redirect('/dashboard');
    }

    var user = users[0]

    var website = await Website.create({
      owner: user.id,
      domain: req.body.domain
    }).fetch();

    var data = await Data.create({
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


    return res.redirect('/home');
}
