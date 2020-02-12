
module.exports.routes = {

  '/': { action: 'view-landing' },

  /* redirects to /dashboard or user/:id */
  '/home': { action: 'view-home' },

  '/dashboard': { action: 'view-dashboard'},

  '/login': { action: 'auth/view-login' },

  'post /login': { action: 'auth/login' },

  '/logout': { action: 'auth/logout'},

  '/users/new': { action: 'user/new' },

  '/users/create': { action: 'user/create' },

  '/users/:id': { action: 'user/show' },

  '/websites/new': { action: 'website/new' }

};
