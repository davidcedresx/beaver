
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

  '/websites/new': { action: 'website/new' },

  'post /websites/create': { action: 'website/create' },

  '/websites/:id': { action: 'website/show' },

  '/websites/edit': { action: 'website/edit'},
  
  'post /websites/changeStatus': { action: 'website/change-status' },
  
  'post /websites/get': { action: 'website/get' },

  '/requests': { action: 'website/requests' },

  '/requests/create': { action: 'requests/create' },
  
  '/dns/:domain/:path?': { action: 'dns/get-website' }

};
