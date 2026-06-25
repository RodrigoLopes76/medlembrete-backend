// src/routes/authRoutes.js
// Rotas para cadastro e login de usuários (quem vai cadastrar medicamentos)

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/database');
const { SECRET } = require('../middleware/auth');

const router = express.Router();

// POST /auth/cadastro
router.post('/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios' });
  }

  const usuarioExistente = db.get('usuarios').find({ email }).value();
  if (usuarioExistente) {
    return res.status(400).json({ erro: 'Email já cadastrado' });
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  const novoUsuario = {
    id: Date.now().toString(),
    nome,
    email,
    senha: senhaHash,
    criadoEm: new Date().toISOString(),
  };

  db.get('usuarios').push(novoUsuario).write();

  return res.status(201).json({ mensagem: 'Usuário criado com sucesso' });
});

// POST /auth/login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
  }

  const usuario = db.get('usuarios').find({ email }).value();
  if (!usuario) {
    return res.status(401).json({ erro: 'Email ou senha incorretos' });
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) {
    return res.status(401).json({ erro: 'Email ou senha incorretos' });
  }

  const token = jwt.sign({ id: usuario.id }, SECRET, { expiresIn: '7d' });

  return res.json({
    token,
    usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
  });
});

module.exports = router;
