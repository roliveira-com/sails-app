module.exports = {

  friendlyName: 'Configura objeto de credenciais do Twitter',

  description: 'Configura o objeto de credenciais para recuperar dados de profile do Twitter',

  sync: true,

  inputs: {

    req: {
      type: 'ref',
      description: 'The current incoming request (req).',
      required: true
    }
  
  },

  fn: function (inputs, exits) {
    var result = {
      screenName: inputs.req.session.twitterToken.screenName,        
      consumerKey: sails.config.twitterConsumerKey,  
      consumerSecret: sails.config.twitterConsumerSecret,         
      accessToken: inputs.req.session.twitterToken.accessToken,        
      accessSecret: inputs.req.session.twitterToken.accessSecret,   
    };
    return exits.success(result);
  }

};