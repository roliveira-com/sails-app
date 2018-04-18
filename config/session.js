/**
 * Session Configuration
 * (sails.config.session)
 *
 * Use the settings below to configure session integration in your app.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For all available options, see:
 * https://sailsjs.com/config/session
 */

module.exports.session = {

  /***************************************************************************
  *                                                                          *
  * Session secret is automatically generated when your new app is created   *
  * Replace at your own risk in production-- you will invalidate the cookies *
  * of your users, forcing them to log in again.                             *
  *                                                                          *
  ***************************************************************************/
  secret: '9924f2554612ac3e54859d5c4bdc9b9b',


  /***************************************************************************
  *                                                                          *
  * Customize when built-in session support will be skipped.                 *
  *                                                                          *
  * (Useful for performance tuning; particularly to avoid wasting cycles on  *
  * session management when responding to simple requests for static assets, *
  * like images or stylesheets.)                                             *
  *                                                                          *
  * https://sailsjs.com/config/session                                       *
  *                                                                          *
  ***************************************************************************/
  // isSessionDisabled: function (req){
  //   return !!req.path.match(req._sails.LOOKS_LIKE_ASSET_RX);
  // },

  /***************************************************************************
  *                                                                          *
  * Redis Adapter                                                            *
  *                                                                          *
  ***************************************************************************/  
  adapter: '@sailshq/connect-redis',
  url: 'redis://h:p0641194285eaca585a9f275afff2812f6457ec8616c3d100ac1f5f4cfa2079d9@ec2-34-226-156-118.compute-1.amazonaws.com:28349'
 
  // adapter: 'redis',
  // host: 'ec2-34-226-156-118.compute-1.amazonaws.com',
  // port: 28349,
  // user: 'h',
  // pass: 'p0641194285eaca585a9f275afff2812f6457ec8616c3d100ac1f5f4cfa2079d9'

};
