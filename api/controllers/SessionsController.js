/**
 * SessionsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const OAuth = require('oauth').OAuth;
const url   = require('url');

const oauth = new OAuth(
  sails.config.trelloRequestURL, 
  sails.config.trelloAccessURL, 
  sails.config.trelloKey, 
  sails.config.trelloOAuthSecret, 
  "1.0A", 
  sails.config.trelloLoginCallback, 
  "HMAC-SHA1"
);

module.exports = {

  home: function (req, res) {
    res.view('pages/tasks/home'); 
  },

  login: function(req, res){
    req.session.oauth_secrets = {};
    oauth.getOAuthRequestToken(function(error, token, tokenSecret, results){
      req.session.oauth_secrets[token] = tokenSecret;
      res.redirect(`${sails.config.trelloAuthorizeURL}?scope=read,write,account&oauth_token=${token}&name=${sails.config.trelloAppName}`);
    });
  },

  callback: function(req, res){
    const query = url.parse(req.url, true).query;
    const token = query.oauth_token;
    const tokenSecret = req.session.oauth_secrets[token];
    const verifier = query.oauth_verifier;
    oauth.getOAuthAccessToken(token, tokenSecret, verifier, function(error, accessToken, accessTokenSecret, results){
      if (error) sails.log('ERRO no getOAuthToken', error);
      oauth.getProtectedResource("https://api.trello.com/1/members/me", "GET", accessToken, accessTokenSecret, function(error, data, response){
        if(error) sails.log('ERRO no getProtectedResource', error);
        const userData = JSON.parse(data);
        Workers.create({
          trello_id: userData.id,
          avatar_url: userData.avatarUrl || 'not specified',
          full_name: userData.fullName,
          initials: userData.initials,
          user_url: userData.url,
          username: userData.username,
          email: userData.email  || 'not specified',
          id_boards: userData.idBoards,
          id_organizations: userData.idOrganizations
        })
        .fetch()
        .exec(function(err, user){
          if(err) sails.log('ERRO ao gravar usuário', err);
          req.session.user = user
          Sessions.create({
            oauth: {
              accessToken: accessToken,
              accessTokenSecret: accessTokenSecret
            },
            owner: user.id
          })
          .fetch()
          .exec(function(err, session){
            Workers.update(
              {
                id: req.session.user.id,
              },
              {
                sessions : session.id
              }
            )
            .fetch()
            .exec(function(err, updatedUser){
              if(err) sails.log('ERRO ao gravar sessão no usuário', err);
              req.session.user = updatedUser[0]
              res.redirect('/tasks');
            })
          })
        })
      });
    });
  }

};

