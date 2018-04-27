module.exports = {

  friendlyName: 'Configura objeto de credenciais com tokens de acesso oAuth',

  description: 'Configura o objeto de credenciais com tokens de acesso oAuth',

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
      oauthToken: inputs.req.param('oauth_token'),     
      oauthVerifier: inputs.req.param('oauth_verifier'),
      consumerKey: sails.config.twitterConsumerKey,  
      consumerSecret: sails.config.twitterConsumerSecret, 
    };
    return exits.success(result);
  }

};