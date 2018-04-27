/**
 * TwitterController

 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var Twitter = require('machinepack-twitter');

module.exports = {

  handleLogin: function(req, res){    
    Twitter.getAccessToken(sails.helpers.setupAcessToken(req))
    .exec(function(err, acessTokenMetadata){
      if (err) return res.negotiate(err);
      req.session.twitterToken = acessTokenMetadata;
      res.redirect('/profile/'+req.session.user.nickname)
    });
  },

  getUserInfo: function(req, res){
    Twitter.getUserProfile(sails.helpers.setupLoginUrlCredentials())      
    .exec(function(err, twitterData){

      req.session.user.twitter = twitterData;

      Notes.find({
        owner: req.session.user.id
      }).exec(function(err,emojis){
        return res.view('pages/profile', { 
          user: twitterData,
          notes: notes
        });        
      })
    }); 
  }

};

