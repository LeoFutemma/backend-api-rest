const express = require('express');
const livros = require('./controladores/livros');

const rotas = express();

rotas.get('/livros', livros.consultarColeção);
rotas.get('/livros/:id', livros.consultarLivro);
rotas.post('/livros', livros.adicionarLivro);
rotas.put('/livros/:id', livros.substituirLivro);
rotas.patch('/livros/:id', livros.alterarLivro);
rotas.delete('/livros/:id', livros.excluirLivro);

module.exports = rotas;