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
          return res.view('pages/profile', { 
            user: user,
            emojis: emojis,
            twitterLoginUrl: twitterLoginUrl,
          });        
        })
    }) 
    
    // var Twitter = require('machinepack-twitter');   
    // Twitter.getLoginUrl({   
    //   consumerKey: 'eJDAS8s4s7dCrkxrbiBWKDkKa',  
    //   consumerSecret: 'BT9Ul8uxWy4qMijhhqI8Mr5lZCKEBAAgtahNbgIYYyQUpwJI6R',   
    //   callbackUrl: 'http://localhost:1337/twitter', 
    // }).exec(function(err, twitterLoginUrl){
    //   console.log(err);
    //   if (!err) return res.json({err: err});

    //   User.findOne({
    //     nickname: req.param('nickname')
    //   }).exec(function(err, user){
    //     if(err) return res.negotiate(err);
        
    //     if(!user) return res.notFound();
    //       Emoji.find({
    //         owner: user.id
    //       }).exec(function(err,emojis){
    //         // User.subscribe(req, user.id);
    //         // return res.json(user);
    //         return res.view('pages/profile', { 
    //           user: user,
    //           emojis: emojis,
    //           twitterLoginUrl: twitterLoginUrl,
    //         });        
    //       })
    //   }) 
    // });    
  }

};

