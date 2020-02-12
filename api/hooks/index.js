/**
 * @description :: The conventional "custom" hook.  Extends this app with custom server-start-time and request-time logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */

module.exports = function defineCustomHook(sails) {

  return {

    routes: {

      /**
       * Runs before every matching route.
       *
       * @param {Ref} req
       * @param {Ref} res
       * @param {Function} next
       */
      before: {
        '/*': {
          skipAssets: true,
          fn: async function(req, res, next){

            // No session? Proceed as usual.
            // (e.g. request for a static asset)
            if (!req.session) { return next(); }

            // Not logged in? Proceed as usual.
            if (!req.session.userId) { return next(); }

            // Otherwise, look up the logged-in user.
            var loggedInUser = await User.findOne({
              id: req.session.userId
            });

            // If the logged-in user has gone missing, log a warning,
            // wipe the user id from the requesting user agent's session,
            // and then send the "unauthorized" response.
            if (!loggedInUser) {
              sails.log.warn('Somehow, the user record for the logged-in user (`'+req.session.userId+'`) has gone missing....');
              delete req.session.userId;
              return res.unauthorized();
            }

            // Expose the user record as an extra property on the request object (`req.me`).
            // > Note that we make sure `req.me` doesn't already exist first.
            if (req.me !== undefined) {
              throw new Error('Cannot attach logged-in user as `req.me` because this property already exists!  (Is it being attached somewhere else?)');
            }
            req.me = loggedInUser;


            // If this is a GET request, then also expose an extra view local (`<%= me %>`).
            // > Note that we make sure a local named `me` doesn't already exist first.
            // > Also note that we strip off any properties that correspond with protected attributes.
            if (req.method === 'GET') {
              if (res.locals.me !== undefined) {
                throw new Error('Cannot attach logged-in user as the view local `me`, because this view local already exists!  (Is it being attached somewhere else?)');
              }

              // Exclude any fields corresponding with attributes that have `protect: true`.
              var sanitizedUser = _.extend({}, loggedInUser);
              for (let attrName in User.attributes) {
                if (User.attributes[attrName].protect) {
                  delete sanitizedUser[attrName];
                }
              }

              // If there is still a "password" in sanitized user data, then delete it just to be safe.
              // (But also log a warning so this isn't hopelessly confusing.)
              if (sanitizedUser.password) {
                sails.log.warn('The logged in user record has a `password` property, but it was still there after pruning off all properties that match `protect: true` attributes in the User model.  So, just to be safe, removing the `password` property anyway...');
                delete sanitizedUser.password;
              }

              res.locals.me = sanitizedUser;

            }

            // Prevent the browser from caching logged-in users' pages.
            // (including w/ the Chrome back button)
            // > • https://mixmax.com/blog/chrome-back-button-cache-no-store
            // > • https://madhatted.com/2013/6/16/you-do-not-understand-browser-history
            res.setHeader('Cache-Control', 'no-cache, no-store');

            return next();
          }
        }
      }
    }


  };

};
