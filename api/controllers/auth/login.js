module.exports = {


  inputs: {

    email: {
      type: 'string',
      required: true
    },

    password: {
      type: 'string',
      required: true
    },

  },

  
  exits: {

    success: {
      description: 'The requesting user agent has been successfully logged in.',
      extendedDescription:
        `Under the covers, this stores the id of the logged-in user in the session
        as the \`userId\` key.  The next time this user agent sends a request, assuming
        it includes a cookie (like a web browser), Sails will automatically make this
        user id available as req.session.userId in the corresponding action.  (Also note
        that, thanks to the included "custom" hook, when a relevant request is received
        from a logged-in user, that user's entire record from the database will be fetched
        and exposed as \`req.me\`.)`
    },

    badCombo: {
      description: `The provided email and password combination does not
        match any user in the database.`,
      responseType: 'unauthorized'
      // ^This uses the custom `unauthorized` response located in `api/responses/unauthorized.js`.
      // To customize the generic "unauthorized" response across this entire app, change that file
      // (see api/responses/unauthorized).
      //
      // To customize the response for _only this_ action, replace `responseType` with
      // something else.  For example, you might set `statusCode: 498` and change the
      // implementation below accordingly (see http://sailsjs.com/docs/concepts/controllers).
    },

    redirect: {
      responseType: 'redirect'
    }

  },


  fn: async function (inputs) {

    // Look up by the email address.
    // (note that we lowercase it to ensure the lookup is always case-insensitive,
    // regardless of which database we're using)
    var userRecord = await User.findOne({
      email: inputs.email.toLowerCase(),
    });

    // If there was no matching user, respond thru the "badCombo" exit.
    if(!userRecord) {
      throw 'badCombo';
    }

    // If the password doesn't match, then also exit thru "badCombo".
    await sails.helpers.passwords.checkPassword(inputs.password, userRecord.password)
    .intercept('incorrect', 'badCombo');

    // Modify the active session instance.
    // (This will be persisted when the response is sent.)
    this.req.session.userId = userRecord.id;

    throw { redirect: '/home' }
  }


};
