let { idLivro, livros } = require('../dados/database');

function consultarColeção(req, res) {
  return res.json(livros);
}


function consultarLivro(req, res) {
  const { id } = req.params;

  if (Number.isNaN(Number(id)) || Number(id) < 0) {
    return res.status(400).json({
      "mensagem": "O valor do parâmetro ID da URL não é um número válido."
    });
  }

  const livroEncontrado = livros.find((livro) => {
    return livro.id === Number(id);
  });

  if (!livroEncontrado) {
    return res.status(404).json({ "mensagem": "Não existe livro para o ID informado." });
  }

  return res.json(livroEncontrado);
}


function adicionarLivro(req, res) {
  const { titulo, autor, ano, numPaginas } = req.body;

  if (!titulo || titulo !== String(titulo) || !String(titulo).trim() || !autor || autor !== String(autor) || !String(autor).trim() || !ano || ano !== Number(ano) || !numPaginas || numPaginas !== Number(numPaginas) || numPaginas < 1) {
    return res.status(400).json({ "mensagem!": "É obrigatório informar com informações válidas o titulo, autor, ano e número de páginas do livro a cadastrar" });
  }

  const novoLivro = { id: idLivro++, titulo, autor, ano, numPaginas };
  livros.push(novoLivro);
  return res.status(201).json(novoLivro);
}


function substituirLivro(req, res) {
  const { id } = req.params;
  const { titulo, autor, ano, numPaginas } = req.body;

  if (Number.isNaN(Number(id)) || Number(id) < 0) {
    return res.status(400).json({
      "mensagem": "O valor do parâmetro ID da URL não é um número válido."
    });
  }

  if (!titulo || titulo !== String(titulo) || !String(titulo).trim() || !autor || autor !== String(autor) || !String(autor).trim() || !ano || ano !== Number(ano) || !numPaginas || numPaginas !== Number(numPaginas) || numPaginas < 1) {
    return res.status(400).json({ "mensagem!": "É obrigatório informar com informações válidas o titulo, autor, ano e número de páginas do livro a cadastrar" });
  }

  const livroEncontrado = livros.find((livro) => {
    return livro.id === Number(id);
  });

  if (!livroEncontrado) {
    return res.status(404).json({ "mensagem": "Não existe livro para o ID informado." });
  }

  livroEncontrado.titulo = titulo;
  livroEncontrado.autor = autor;
  livroEncontrado.ano = ano;
  livroEncontrado.numPaginas = numPaginas;

  return res.json({ "mensagem": "Livro substituído." });
}


function alterarLivro(req, res) {
  const { id } = req.params;
  const { titulo, autor, ano, numPaginas } = req.body;

  if (Number.isNaN(Number(id)) || Number(id) < 0) {
    return res.status(400).json({
      "mensagem": "O valor do parâmetro ID da URL não é um número válido."
    });
  }

  if (!titulo && !autor && !ano && !numPaginas) {
    return res.status(400).json({ "mensagem!": "Informe ao menos um campo (título, autor, ano ou número de páginas) para ser alterado." });
  }

  const livroEncontrado = livros.find((livro) => {
    return livro.id === Number(id);
  });

  if (!livroEncontrado) {
    return res.status(404).json({ "mensagem": "Não existe livro a ser alterado para o ID informado." });
  }

  if (titulo) {
    if (titulo !== String(titulo).trim() || titulo !== String(titulo)) {
      return res.status(400).json({ "mensagem!": "Informe um título válido!" });
    }
    livroEncontrado.titulo = titulo;
  }

  if (autor) {
    if (autor !== String(autor).trim() || autor !== String(autor)) {
      return res.status(400).json({ "mensagem!": "Informe um autor válido!" });
    }
    livroEncontrado.autor = autor;
  }

  if (ano) {
    if (ano !== Number(ano)) {
      return res.status(400).json({ "mensagem!": "Informe um ano válido!" });
    }
    livroEncontrado.ano = ano;
  }

  if (numPaginas) {
    if (numPaginas !== Number(numPaginas) || numPaginas < 1) {
      return res.status(400).json({ "mensagem!": "Informe a quantidade de páginas em números!" });
    }
    livroEncontrado.numPaginas = numPaginas;
  }

  return res.json({ "mensagem": "Livro alterado." });
}


function excluirLivro(req, res) {
  const { id } = req.params;

  if (Number.isNaN(Number(id)) || Number(id) < 0) {
    return res.status(400).json({ "mensagem!": "O ID precisa ser um número válido" });
  }

  const livroEncontrado = livros.find((elemento) => {
    return elemento.id === Number(id);
  });

  if (!livroEncontrado) {
    return res.status(404).json({ "mensagem": "Não existe livro a ser removido para o ID informado." });
  }

  livros = livros.filter((aluno) => {
    return aluno.id !== Number(id);
  });

  return res.json({ "mensagem": "Livro removido." });
}

module.exports = { consultarColeção, consultarLivro, adicionarLivro, substituirLivro, alterarLivro, excluirLivro }