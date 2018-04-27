module.exports = {

  friendlyName: 'Payload so evento created',

  description: 'Configura o objeto de payload do evento created',

  sync: true,

  inputs: {

    dados: {
      type: 'ref',
      description: 'The current incoming request (req).',
      required: true
    }
  
  },

  fn: function (inputs, exits) {
    var result = {
      verb: 'created',
      id: inputs.dados.id,
      data: inputs.dados
    };
    return exits.success(result);
  }

};