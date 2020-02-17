module.exports = async function getWebsite(req, res) {

    sails.log.warn(req.params);

    var website = await Website.findOne({
        domain: req.params.domain
    }).populate('data');

    if (!website) {
        return res.redirect('/404')
    }

    path = req.params.path ? req.params.path : 'index'

    return res.view(`pages/business/${path}`, { website, skip_layout: true });
}
