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

// Rota de consulta de medicamentos
app.get('/api/medicamentos', async (req, res) => {
    const { nome } = req.query;
    console.log(`Buscando medicamento: ${nome}`);
    res.json({ mensagem: "Conexão com ANVISA configurada", termo: nome });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
