const express = require('express');
const tratarErrosEsperados = require('../functions/tratarErrosEsperados');
const conectarBancoDados = require('../middlewares/conectarBD');
const EsquemaFrase = require('../models/frase');
const router = express.Router();


router.post('/criar', conectarBancoDados, async function (req, res) {
  try {
    // #swagger.tags = ['Frase']
    let { frase, nomeAutor } = req.body;
    const respostaBD = await EsquemaFrase.create({ frase, nomeAutor });

    res.status(200).json({
      status: "OK",
      statusMensagem: "Frase criada com sucesso.",
      resposta: respostaBD
    })

  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});


router.put('/editar/:id', conectarBancoDados, async function (req, res) {
  try {
    // #swagger.tags = ['Frase']
    let idFrase = req.params.id;
    let { frase, nomeAutor } = req.body;

    const checkFrases = await EsquemaFrase.findOne({ _id: idFrase });
    if (!checkFrases) {
      throw new Error("Frase não encontrada ou pertence a outro usuário");
    }

    const tarefaAtualizada = await EsquemaFrase.updateOne({ _id: idFrase }, { frase, nomeAutor });
    if (tarefaAtualizada?.modifiedCount > 0) {
      const dadosFrase = await EsquemaFrase.findOne({ _id: idFrase })
      res.status(200).json({
        status: "OK",
        statusMensagem: "Frase atualizada com sucesso.",
        resposta: dadosFrase
      })
    }
  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});


router.get('/obter', conectarBancoDados, async function (req, res) {
  try {
    // #swagger.tags = ['Frase']
    // #swagger.description = "Endpoint para obter todas frases."

    const respostaBD = await EsquemaFrase.find();

    res.status(200).json({
      status: "OK",
      statusMensagem: "Frases listadas na resposta com sucesso.",
      resposta: respostaBD
    })

  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});


router.get('/obter/:id', conectarBancoDados, async function (req, res) {
  try {
    // #swagger.tags = ['Frase']
    // #swagger.description = "Endpoint para obter todas frases do usuario logado."
    let { id } = req.params;

    const respostaBD = await EsquemaFrase.find({ _id: id });

    res.status(200).json({
      status: "OK",
      statusMensagem: "Frase listada na resposta com sucesso.",
      resposta: respostaBD
    })

  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});

router.delete('/deletar/:id', conectarBancoDados, async function (req, res) {
  try {
    // #swagger.tags = ['Frase']
    const idFrases = req.params.id;

    const checkFrases = await EsquemaFrase.findOne({ _id: idFrases });
    if (!checkFrases) {
      throw new Error("Frase não encontrada");
    }

    const respostaBD = await EsquemaFrase.deleteOne({ _id: idFrases });
    res.status(200).json({
      status: "OK",
      statusMensagem: "Frase deletada com sucesso.",
      resposta: respostaBD
    })

  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});

module.exports = router;
