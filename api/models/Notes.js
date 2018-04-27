/**
 * Notes.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    text: {
      type: 'string'
    },
    owner: {
      // type: 'json',
      model: 'User'
    },

  },

};

