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
      consumerKey: sails.config.twitterConsumerKey,  
      consumerSecret: sails.config.twitterConsumerSecret,

    }).exec(function(err, acessTokenMetadata){
      if (err) return res.negotiate(err);
      console.log('ACCESS_TOKEN_METADATA', acessTokenMetadata);
      Twitter.getUserProfile({
        screenName: acessTokenMetadata.screenName,        
        consumerKey: sails.config.twitterConsumerKey,  
        consumerSecret: sails.config.twitterConsumerSecret,         
        accessToken: acessTokenMetadata.accessToken,        
        accessSecret: acessTokenMetadata.accessSecret,        
  
      })      
      .exec(function(err, twitterData){
        console.log('ERR', err);
        console.log('TWITTER_DATA', twitterData)
        req.session.me = twitterData;

        Emoji.find({
          owner: twitterData.screenName
        }).exec(function(err,emojis){
          console.log('EMOJIS',emojis);
          return res.view('pages/profile', { 
            user: twitterData,
            emojis: emojis,
          });        
        })
      }); 
    });
  }

};

