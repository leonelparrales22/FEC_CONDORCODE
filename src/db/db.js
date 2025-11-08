// Módulo de base de datos local con SQLite
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = process.env.DB_PATH || path.join(__dirname, '../../fec_condorcode.db');
const db = new Database(dbPath);

// Migración inicial: comprobantes
const createTable = `CREATE TABLE IF NOT EXISTS comprobantes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  claveAcceso TEXT,
  ruc TEXT,
  razonSocial TEXT,
  fecha TEXT,
  total TEXT,
  estado TEXT,
  xml TEXT,
  pdf BLOB,
  creadoEn DATETIME DEFAULT CURRENT_TIMESTAMP
);`;
db.exec(createTable);

function guardarComprobante({ claveAcceso, ruc, razonSocial, fecha, total, estado, xml, pdf }) {
  const stmt = db.prepare('INSERT INTO comprobantes (claveAcceso, ruc, razonSocial, fecha, total, estado, xml, pdf) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  stmt.run(claveAcceso, ruc, razonSocial, fecha, total, estado, xml, pdf);
}

function listarComprobantes() {
  return db.prepare('SELECT * FROM comprobantes ORDER BY creadoEn DESC').all();
}

module.exports = { guardarComprobante, listarComprobantes };
