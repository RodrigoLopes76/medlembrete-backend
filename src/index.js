require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "*",
  origin: ["https://medlembrete-frontend-7wuey5cdo-rodrigolopes76s-projects.vercel.app", "http://localhost:5173"], // Adicione aqui a URL da sua Vercel
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
  credentials: true
}));
app.use(express.json());

// Rota de consulta de medicamentos (Middleware de integração ANVISA)
app.get('/api/medicamentos', async (req, res) => {
    const { nome } = req.query;
    
    // Aqui você implementaria a lógica de busca
    // Exemplo: fetch(`https://api.anvisa.gov.br/.../${nome}`)
    console.log(`Buscando medicamento: ${nome}`);
    
    res.json({ mensagem: "Conexão com ANVISA configurada", termo: nome });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
