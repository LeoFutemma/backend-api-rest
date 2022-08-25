let { alunos, id } = require('../dados/database');

function listarAlunos(req, res) {
  return res.json(alunos);
}

function buscarAluno(req, res) {
  const { id } = req.params;

  if (Number.isNaN(Number(id)) || Number(id) < 0) {
    return res.status(400).json({ "Alerta!": "O ID precisa ser um número válido" });
  }

  const alunoEncontrado = alunos.find((elemento) => {
    return elemento.id === Number(id);
  });

  if (!alunoEncontrado) {
    return res.status(404).json({ "Alerta!": "Aluno não encontrado" });
  }

  return res.json(alunoEncontrado);
}

function cadastrarAluno(req, res) {
  const { nome, sobrenome, idade, curso } = req.body;

  if (!nome || nome !== String(nome) || !String(nome).trim() || !sobrenome || sobrenome !== String(sobrenome) || !String(sobrenome).trim() || !idade || !curso || curso !== String(curso) || !String(curso).trim()) {
    return res.status(400).json({ "Alerta!": "É obrigatório informar com informações válidas o nome, sobrenome, idade e curso do Aluno a cadastrar" });
  }

  if (idade !== Number(idade) || idade < 18) {
    return res.status(400).json({ "Alerta!": "A idade não foi informada corretamente ou o aluno não possui a idade mínima necessária!" });
  }

  const aluno = { id: id++, nome, sobrenome, idade, curso };

  alunos.push(aluno);
  return res.status(201).json();
}

function deletarAluno(req, res) {
  const { id } = req.params;

  if (Number.isNaN(Number(id)) || Number(id) < 0) {
    return res.status(400).json({ "Alerta!": "O ID precisa ser um número válido" });
  }

  const alunoEncontrado = alunos.find((elemento) => {
    return elemento.id === Number(id);
  });

  if (!alunoEncontrado) {
    return res.status(404).json({ "Alerta!": "Aluno não encontrado" });
  }

  alunos = alunos.filter((aluno) => {
    return aluno.id !== Number(id);
  });

  return res.json(alunoEncontrado);
}


module.exports = { listarAlunos, buscarAluno, cadastrarAluno, deletarAluno }; 