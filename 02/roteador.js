const express = require('express');
const convidados = require('./controladores/convidados');

const rotas = express();

rotas.get('/convidados', convidados.listarConvidados);
rotas.post('/convidados', convidados.adicionarConvidado);
rotas.delete('/convidados/:nome', convidados.excluirConvidado);

module.exports = rotas;