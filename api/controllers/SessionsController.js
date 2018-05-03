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
    return res.view('pages/tasks/home'); 
  },

  login: function(req, res){
    req.session.oauth_secrets = {};
    oauth.getOAuthRequestToken(function(error, token, tokenSecret, results){
      req.session.oauth_secrets[token] = tokenSecret;
      response.redirect(`${sails.config.trelloAuthorizeURL}?oauth_token=${token}&name=${sails.config.trelloAppName}`);
    });
  },

  callback: function(req, res){
    const query = url.parse(req.url, true).query;
    const token = query.oauth_token;
    const tokenSecret = req.session.oauth_secrets[token];
    const verifier = query.oauth_verifier;
    oauth.getOAuthAccessToken(token, tokenSecret, verifier, function(error, accessToken, accessTokenSecret, results){
      // In a real app, the accessToken and accessTokenSecret should be stored
      oauth.getProtectedResource("https://api.trello.com/1/members/me", "GET", accessToken, accessTokenSecret, function(error, data, response){
        // Now we can respond with data to show that we have access to your Trello account via OAuth
        res.send(data)
      });
    });
  }

};

