function validarSenha(req, res, next) {
  const { senha } = req.query;

  if (!senha || senha !== 'cubos123') {
    return res.status(401).json({ "Alerta!": "Senha não informada ou inválida" });
  }

  next();
}

module.exports = validarSenha;