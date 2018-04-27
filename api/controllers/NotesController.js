/**
 * EmojiController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  createNote: function(req, res){

    if (req.session.user) {
      Notes.create(
        {
          text: req.body.text,
          owner: req.session.user.id
        }
      )
      .fetch()
      .exec(function(err, data){
        if (err) throw err;
        sails.sockets.blast('notes', sails.helpers.createdEventPayload(data))
        res.redirect('/profile/'+req.session.user.nickname)
      })
    } else {
      return res.json({error: 'you need to authenticate'})
    }

  }

};

