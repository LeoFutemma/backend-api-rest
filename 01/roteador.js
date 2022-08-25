const express = require('express');
const alunos = require('./controladores/alunos');
const validarSenha = require('./intermediarios');

const rotas = express();

rotas.use(validarSenha);

rotas.get('/alunos', validarSenha, alunos.listarAlunos);
rotas.get('/alunos/:id', validarSenha, alunos.buscarAluno);
rotas.post('/alunos', validarSenha, alunos.cadastrarAluno);
rotas.delete('/alunos/:id', validarSenha, alunos.deletarAluno);

module.exports = rotas;