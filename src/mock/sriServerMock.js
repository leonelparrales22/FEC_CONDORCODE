// Mock SRI server para pruebas de integración
// Simula Recepción y Autorización de comprobantes
const express = require('express');
const app = express();
app.use(express.text({ type: '*/*' }));

app.post('/recepcion', (req, res) => {
  // Simula recepción exitosa
  res.json({ estado: 'RECIBIDO', mensaje: 'Comprobante recibido correctamente (mock)' });
});

app.post('/autorizacion', (req, res) => {
  // Simula autorización exitosa
  res.json({ estado: 'AUTORIZADO', mensaje: 'Comprobante autorizado (mock)' });
});

const PORT = process.env.MOCK_SRI_PORT || 4000;
app.listen(PORT, () => {
  console.log(`Mock SRI server escuchando en puerto ${PORT}`);
});
