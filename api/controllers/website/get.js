module.exports = {

    inputs: {
  
      domain: {
        type: 'string',
        required: true
      }

  
    },
      
      exits: {
    
        pageFound: {
          responseType: 'redirect'
        },
  
        pageNotFound: {
          responseType: 'redirect',
        }
      
      },
    
    
      fn: async function (inputs) {
        
        const website = await Website.findOne({ domain: inputs.domain });
  
        if (website) {
            throw { pageFound: `/websites/${website.id}` };
        }
  
        throw { pageNotFound: '/dashboard' };
        
      }  
    
    };
    