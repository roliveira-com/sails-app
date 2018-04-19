/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  whoami: function(req, res){
    return res.json({
      me : req.session.me
    });
  },
  
  // findAll: function(req, res){

  //   User.find(
  //     {}
  //   )
  //   .exec(function(err, user){
  //     if(err) return res.negotiate(err);
  //     User.subscribe(req, user.id);
  //     return res.json(user);
  //   })

  // },

  findByNickName: function(req, res){
    
    var twitterLoginUrl;
    
    var Twitter = require('machinepack-twitter');   
    Twitter.getLoginUrl({   
      consumerKey: sails.config.twitterConsumerKey,  
      consumerSecret: sails.config.twitterConsumerSecret,   
      callbackUrl: sails.config.twitterCallbackUrl, 
    }).exec(function(err, twitterLoginUrl){

      if(twitterLoginUrl){
        User.findOne({
          nickname: req.param('nickname')
        }).exec(function(err, user){
          if(err) return res.negotiate(err);
          
          if(!user) return res.notFound();
            Emoji.find({
              owner: user.id
            }).exec(function(err,emojis){
              // User.subscribe(req, user.id);
              // return res.json(user);
              req.session.user = user
              return res.view('pages/profile', { 
                user: user,
                emojis: emojis,
                twitterLoginUrl: twitterLoginUrl,
              });        
            })
        }) 

      }else{
        return res.view('404');
      }
    });    
  }

};

