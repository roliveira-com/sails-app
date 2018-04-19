/**
 * EmojiController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  associateUser: function(req, res){
    Emoji.update(
      {
        id: req.param('id')
      },
      {
        owner: req.param('owner')
      }
    )
    .exec(function(err){
      if (err) res.negotiate(err);
      return res.ok();
    })
  }

};

