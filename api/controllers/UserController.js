/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  whoami: function(req, res){
    return res.json({
      userSession : req.session.user
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
    
    if(req.session.user){

      Twitter.getUserProfile(sails.helpers.setupProfileCredentials(req))      
      .exec(function(err, twitterData){
        req.session.user.twitter = twitterData;
  
        Notes.find({ owner: req.session.user.id })
        .exec(function(err,notes){
          return res.view('pages/profile', { 
            notes: notes,
            user: req.session.user
          });        
        })

      }); 

    } else {

      Twitter.getLoginUrl(sails.helpers.setupLoginUrlCredentials())
      .exec(function(err, twitterLoginUrl){
  
        User.findOne({
          nickname: req.param('nickname')
        }).exec(function(err, user){
          if(err) return res.negotiate(err);
          
          if(!user) return res.notFound();
            Notes.find({
              owner: user.id
            }).exec(function(err,notes){
              req.session.user = user
              return res.view('pages/profile', { 
                user: user,
                notes: notes,
                twitterLoginUrl: twitterLoginUrl,
              });        
            })
        }) 

      }); 

    }
       
  },

  userLogout : function(req, res){
    req.session.user = undefined;
    req.session.twitterToken = undefined;
    return res.redirect('/');
  }

};

