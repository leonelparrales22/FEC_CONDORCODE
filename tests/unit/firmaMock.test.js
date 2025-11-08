// Test unitario para firma digital (mock)
const { firmarXMLMock } = require('../../src/sri/firmaMock');

describe('Firma digital mock', () => {
  it('agrega etiqueta de firmado al XML', () => {
    const xml = '<factura></factura>';
    const firmado = firmarXMLMock(xml, 'cert.p12', '1234');
    expect(firmado).toContain('firmado digitalmente');
  });
});
