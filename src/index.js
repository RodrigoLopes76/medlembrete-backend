require('dotenv').config();
const cors = require('cors');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para JSON e CORS
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Permite qualquer origem temporariamente para testar
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Banco de dados em memória (simples para o protótipo)
const usuarios = [];

// --- ROTAS DE AUTENTICAÇÃO ---
app.post('/auth/cadastro', (req, res) => {
    const { nome, email, senha } = req.body;
    if (usuarios.find(u => u.email === email)) {
        return res.status(400).json({ erro: "Usuário já existe." });
    }
    usuarios.push({ nome, email, senha });
    res.status(201).json({ mensagem: "Cadastro realizado!" });
});

app.post('/auth/login', (req, res) => {
    const { email, senha } = req.body;
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    if (!usuario) return res.status(401).json({ erro: "Email ou senha inválidos." });
    res.json({ mensagem: "Login efetuado!", token: "fake-jwt" });
});

// --- ROTA DE MEDICAMENTOS ---
app.get('/api/medicamentos', async (req, res) => {
    res.json({ mensagem: "Conexão com ANVISA configurada" });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
