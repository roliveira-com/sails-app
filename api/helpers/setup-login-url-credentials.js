module.exports = {

  friendlyName: 'Configura objeto de credenciais do Twitter',

  description: 'Configura o objeto de credenciais para obter url de login',

  sync: true,

  fn: function (inputs, exits) {
    var result = {
      consumerKey: sails.config.twitterConsumerKey,  
      consumerSecret: sails.config.twitterConsumerSecret,   
      callbackUrl: sails.config.twitterCallbackUrl, 
    };
    return exits.success(result);
  }

};