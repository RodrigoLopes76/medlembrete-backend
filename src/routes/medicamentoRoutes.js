// src/routes/medicamentoRoutes.js
// Rotas para cadastrar, listar, editar e remover medicamentos

const express = require('express');
const db = require('../db/database');
const { autenticar } = require('../middleware/auth');

const router = express.Router();

// Todas as rotas abaixo exigem login (usuário autenticado)
router.use(autenticar);

// GET /medicamentos - lista todos os medicamentos do usuário logado
router.get('/', (req, res) => {
  const medicamentos = db
    .get('medicamentos')
    .filter({ usuarioId: req.usuarioId })
    .value();

  return res.json(medicamentos);
});

// POST /medicamentos - cadastra um novo medicamento
router.post('/', (req, res) => {
  const { nome, dosagem, horarios, observacoes } = req.body;

  // horarios deve ser um array de strings, ex: ["08:00", "14:00", "20:00"]
  if (!nome || !horarios || !Array.isArray(horarios) || horarios.length === 0) {
    return res.status(400).json({
      erro: 'Nome e ao menos um horário (formato HH:MM) são obrigatórios',
    });
  }

  const novoMedicamento = {
    id: Date.now().toString(),
    usuarioId: req.usuarioId,
    nome,
    dosagem: dosagem || '',
    horarios, // ex: ["08:00", "20:00"]
    observacoes: observacoes || '',
    ativo: true,
    criadoEm: new Date().toISOString(),
  };

  db.get('medicamentos').push(novoMedicamento).write();

  return res.status(201).json(novoMedicamento);
});

// PUT /medicamentos/:id - edita um medicamento existente
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const medicamento = db
    .get('medicamentos')
    .find({ id, usuarioId: req.usuarioId })
    .value();

  if (!medicamento) {
    return res.status(404).json({ erro: 'Medicamento não encontrado' });
  }

  const { nome, dosagem, horarios, observacoes, ativo } = req.body;

  db.get('medicamentos')
    .find({ id })
    .assign({
      nome: nome ?? medicamento.nome,
      dosagem: dosagem ?? medicamento.dosagem,
      horarios: horarios ?? medicamento.horarios,
      observacoes: observacoes ?? medicamento.observacoes,
      ativo: ativo ?? medicamento.ativo,
    })
    .write();

  return res.json(db.get('medicamentos').find({ id }).value());
});

// DELETE /medicamentos/:id - remove um medicamento
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const medicamento = db
    .get('medicamentos')
    .find({ id, usuarioId: req.usuarioId })
    .value();

  if (!medicamento) {
    return res.status(404).json({ erro: 'Medicamento não encontrado' });
  }

  db.get('medicamentos').remove({ id }).write();

  return res.json({ mensagem: 'Medicamento removido com sucesso' });
});

module.exports = router;
