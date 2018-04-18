/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  findOne: function(req, res){

    User.findOne(
      {
        id: req.param('id')
      }
    )
    .exec(function(err){
      if(err) return res.negotiate(err);
      // User.subscribe(req, user.id);
      return res.view('profile', { user: user });
    })

  }

};

