let convidados = require('../dados/database');

function listarConvidados(req, res) {
  const { nome } = req.query;

  if (!nome) {
    return res.json(convidados);
  }

  const nomeFormatado = nome[0].toUpperCase() + nome.slice(1).toLowerCase();
  const convidadoEncontrado = convidados.find((convidado) => {
    return convidado === nomeFormatado;
  })

  if (!convidadoEncontrado) {
    return res.status(404).json({ "mensagem": "O convidado buscado não está presente na lista." });
  }

  return res.json({ "mensagem": "Convidado presente." });
}


function adicionarConvidado(req, res) {
  const { nome } = req.body;

  if (!nome || nome !== String(nome) || !String(nome).trim()) {
    return res.status(400).json({ "mensagem": "Informe um nome válido!" });
  }

  const nomeFormatado = nome[0].toUpperCase() + nome.slice(1).toLowerCase();
  const verificaConvidado = convidados.find((pessoa) => {
    return pessoa === nomeFormatado;
  })

  if (verificaConvidado) {
    return res.json({ "mensagem": "O nome do convidado a ser adicionado já existe na lista. Caso queria adicionar outro convidado de mesmo nome, favor fornecer o sobrenome também." });
  }

  convidados.push(nomeFormatado);
  return res.status(201).json({ "mensagem": "Convidado adicionado." });
}


function excluirConvidado(req, res) {
  const { nome } = req.params;

  if (!nome || nome !== String(nome) || !String(nome).trim()) {
    return res.status(400).json({ "mensagem": "Informe um nome válido!" });
  }

  const nomeFormatado = nome[0].toUpperCase() + nome.slice(1).toLowerCase();
  const verificaConvidado = convidados.find((pessoa) => {
    return pessoa === nomeFormatado;
  })

  if (!verificaConvidado) {
    return res.status(404).json({ "mensagem": "O nome do convidado a ser removido não existe na lista. Nenhum convidado foi removido." });
  }

  convidados = convidados.filter((convidado) => {
    return convidado !== verificaConvidado;
  });

  return res.json({ "mensagem": "Convidado removido." });
}

module.exports = { listarConvidados, adicionarConvidado, excluirConvidado };