/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /************************************************ ***************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'pages/homepage'
  },

  'GET /tasks': {
    view: 'pages/tasks/home'
  },

  'GET /user/me': 'UserController.whoami',

  '/profile/:nickname' : 'UserController.findByNickName',

  '/emoji/:id/associateuser': 'EmojiController.associateUser',

  '/twitter': 'TwitterController.handleLogin',

  '/logout': 'UserController.userLogout',

  'POST /create/emoji': 'EmojiController.createEmoji',

  'POST /create/note': 'NotesController.createNote'

  // '/emoji/:id/associateuser':{
  //   controller: 'EmojiController',
  //   action: 'associateUser'
  // },

  // '/emojis': {
  //   controller: 'EmojiController',
  //   action: 'findAll'
  // },

  // '/user': {
  //   controller: 'UserController',
  //   action: 'findAll'
  // },

  // 'GET /meu-perfil/:id' : {
  //   controller: 'UserController',
  //   action: 'findOne'
  // },

  // '/:nickname' : {
  //   controller: 'UserController',
  //   action: 'findByNickName'
  // },

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

};
