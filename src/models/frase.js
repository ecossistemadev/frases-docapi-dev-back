const mongoose = require('mongoose');

const esquema = new mongoose.Schema(
  {
    frase: {
      type: String,
      required: 'é obrigatório!',
    },
    nomeAutor: {
      type: String,
      default: 'Anônimo',
    }
  },
  {
    timestamps: true
  }
);

const EsquemaFrase = mongoose.models.Frase || mongoose.model('Frase', esquema);
module.exports = EsquemaFrase;
