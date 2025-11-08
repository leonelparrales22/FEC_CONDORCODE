// Test básico de generación de PDF
const { generarPDF } = require('./generarPDF');

describe('Generación de PDF', () => {
  it('genera un PDF en buffer', async () => {
    const factura = {
      ruc: '1790012345001',
      razonSocial: 'Empresa Ejemplo',
      fecha: '2025-11-08',
      total: '100.00',
      claveAcceso: '123',
    };
    const pdf = await generarPDF(factura);
    expect(pdf).toBeInstanceOf(Buffer);
    expect(pdf.length).toBeGreaterThan(0);
  });
});
