require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  // Mantenha apenas uma definição de origin
  origin: ["https://medlembrete-frontend-7wuey5cdo-rodrigolopes76s-projects.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Adicione OPTIONS aqui
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)){
    fs.mkdirSync(dataDir);
}

// Simulação de banco de dados em memória (para o seu protótipo)
const usuarios = []; 

// ROTA DE CADASTRO
app.post('/auth/cadastro', (req, res) => {
    const { nome, email, senha } = req.body;
    
    // Verifica se usuário já existe
    const existe = usuarios.find(u => u.email === email);
    if (existe) return res.status(400).json({ erro: "Usuário já cadastrado." });

    const novoUsuario = { nome, email, senha };
    usuarios.push(novoUsuario);
    
    console.log("Usuário cadastrado:", nome);
    res.status(201).json({ mensagem: "Cadastro realizado com sucesso!" });
});

// ROTA DE LOGIN
app.post('/auth/login', (req, res) => {
    const { email, senha } = req.body;
    
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    if (!usuario) return res.status(401).json({ erro: "Email ou senha incorretos." });

    res.json({ mensagem: "Login realizado!", token: "fake-jwt-token" });
});

// Rota de consulta de medicamentos
app.get('/api/medicamentos', async (req, res) => {
    const { nome } = req.query;
    console.log(`Buscando medicamento: ${nome}`);
    res.json({ mensagem: "Conexão com ANVISA configurada", termo: nome });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
