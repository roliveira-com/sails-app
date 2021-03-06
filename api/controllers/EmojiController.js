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
  },

  createEmoji: function(req, res){

    if (req.session.user) {
      Emoji.create(
        {
          text: req.body.text,
          owner: req.session.user.id
        }
      )
      .exec(function(err){
        if (err) throw err;
        res.redirect('/profile/'+req.session.user.nickname)
      })
    } else {
      return res.json({error: 'you need to authenticate'})
    }

  }

};

