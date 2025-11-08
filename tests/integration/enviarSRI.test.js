// Test de integración para envío a mock SRI
const { enviarComprobanteSRI } = require('../../src/sri/enviarSRI');
const { firmarXMLMock } = require('../../src/sri/firmaMock');
const { generarXMLFactura } = require('../../src/sri/xmlFactura');

const endpoint = 'http://localhost:4000/recepcion';

describe('Envío de comprobante al SRI (mock)', () => {
  it('recibe estado RECIBIDO del mock SRI', async () => {
    const factura = {
      claveAcceso: '12345678901234567890123456789012345678901234567890',
      ruc: '1790012345001',
      razonSocial: 'Empresa Ejemplo S.A.',
      fecha: '08/09/2023',
      total: '100.00',
    };
    const xml = generarXMLFactura(factura);
    const firmado = firmarXMLMock(xml, '', '');
    const res = await enviarComprobanteSRI(firmado, endpoint);
    expect(res.estado).toBe('RECIBIDO');
  });
});
