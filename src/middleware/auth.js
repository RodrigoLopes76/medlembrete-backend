// src/middleware/auth.js
// Middleware que verifica se o usuário está logado (token JWT válido)

const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'troque_esta_chave_em_producao';

function autenticar(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1]; // formato: "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ erro: 'Token mal formatado' });
  }

  try {
    const dados = jwt.verify(token, SECRET);
    req.usuarioId = dados.id; // disponibiliza o id do usuário logado nas próximas funções
    next();
  } catch (erro) {
    return res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
}

module.exports = { autenticar, SECRET };
