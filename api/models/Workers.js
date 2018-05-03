/**
 * Workers.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    trello_id: {
      type: 'string'
    },

    sessions: {
      collection: 'Sessions',
      via: 'owner'
    },

    avatar_url: {
      type: 'string'
    },

    full_name: {
      type: 'string'
    },

    initials: {
      type: 'ref'
    },

    user_url: {
      type: 'string'
    },

    username: {
      type: 'string'
    },

    email: {
      type: 'string'
    },

    id_boards: {
      type: 'ref'
    },

    id_organizations: {
      type: 'ref'
    }

  },

};

