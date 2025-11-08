// Test unitario para generación de XML de factura
const { generarXMLFactura } = require('../../src/sri/xmlFactura');

describe('Generación de XML de factura', () => {
  it('genera XML válido con datos mínimos', () => {
    const factura = {
      claveAcceso: '12345678901234567890123456789012345678901234567890',
      ruc: '1790012345001',
      razonSocial: 'Empresa Ejemplo S.A.',
      fecha: '08/09/2023',
      total: '100.00',
    };
    const xml = generarXMLFactura(factura);
    expect(xml).toContain('<factura');
    expect(xml).toContain('<claveAcceso>');
    expect(xml).toContain(factura.ruc);
    expect(xml).toContain(factura.total);
  });
});
