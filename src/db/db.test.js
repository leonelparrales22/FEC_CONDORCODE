// Test básico de DB comprobantes
const { guardarComprobante, listarComprobantes } = require('./db');

describe('DB comprobantes', () => {
  it('guarda y lista comprobantes', () => {
    const comprobante = {
      claveAcceso: '123',
      ruc: '1790012345001',
      razonSocial: 'Empresa Ejemplo',
      fecha: '2025-11-08',
      total: '100.00',
      estado: 'AUTORIZADO',
      xml: '<xml></xml>',
      pdf: Buffer.from('PDF'),
    };
    guardarComprobante(comprobante);
    const lista = listarComprobantes();
    expect(lista.length).toBeGreaterThan(0);
    expect(lista[0].claveAcceso).toBe('123');
  });
});
