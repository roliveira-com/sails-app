/**
 * TwitterController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  handleLogin: function(req, res){

    var Twitter = require('machinepack-twitter');
    
    Twitter.getAccessToken({
      oauthToken: req.param('oauth_token'),     
      oauthVerifier: req.param('oauth_verifier'),
      consumerKey: 'xxx',  
      consumerSecret: 'xxx',
    }).exec(function(err, acessTokenMetadata){
      if (err) return res.negotiate(err);

      Twitter.getUserProfile({
        screenName: acessTokenMetadata.screenName,        
        consumerKey: 'xxx',  
        consumerSecret: 'xxx',        
        accessToken: acessTokenMetadata.accessToken,        
        accessSecret: acessTokenMetadata.accessSecret,        
  
      })
      .exec({  
        error: function (err) {
          res.negotiate(err)
        },
        success: function (result) {
          req.session.me = acessTokenMetadata.screenName;
          return res.ok();
        },      
      }); 
    });
  }

};

