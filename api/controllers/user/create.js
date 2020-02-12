module.exports = {

  inputs: {

    name: {
      type: 'string',
      required: true
    },

    email: {
      type: 'string',
      required: true
    },

    password: {
      type: 'string',
      required: true
    },

    isAdmin: {
      type: 'string',
      required: false,
    }

  },
    
    exits: {
  
      userCreated: {
        description: 'New user account was created successfully.',
        responseType: 'redirect'
      },

      userExists: {
        responseType: 'badRequest',
        description: 'User already exists'
      }
    
    },
  
  
    fn: async function (inputs) {
      
      var params = {
        name: inputs.name,
        email: inputs.email.toLowerCase(),
        password: await sails.helpers.passwords.hashPassword(inputs.password),
        isAdmin: inputs.isAdmin === 'on' ? true : false,
        creator: this.req.me.id
      };

      await User.create(params).intercept('E_UNIQUE', 'userExists');

      throw { userCreated: '/home' };
      
    }  
  
  };
  