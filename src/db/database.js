// src/db/database.js
// Banco de dados simples em arquivo JSON.
// Ideal para aprender e testar. Depois trocamos por PostgreSQL.

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

const adapter = new FileSync(path.join(__dirname, '../../data/db.json'));
const db = low(adapter);

// Estrutura inicial do banco, caso o arquivo esteja vazio
db.defaults({
  usuarios: [],
  medicamentos: [],
  tokensPush: [], // tokens de notificação dos apps mobile cadastrados
}).write();

module.exports = db;
