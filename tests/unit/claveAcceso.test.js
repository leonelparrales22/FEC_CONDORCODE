// Test unitario para generación de clave de acceso SRI
const { generarClaveAcceso, modulo11 } = require('../../src/sri/claveAcceso');

describe('Clave de acceso SRI', () => {
  it('genera clave válida con ejemplo oficial', () => {
    // Ejemplo oficial SRI
    const params = {
      fecha: '08092023',
      tipoComprobante: '01',
      ruc: '1790012345001',
      ambiente: '1',
      serie: '001001',
      secuencial: '000000123',
      codigoNumerico: '12345678',
      tipoEmision: '1',
    };
    const clave = generarClaveAcceso(params);
    expect(clave).toHaveLength(49);
    expect(clave.endsWith(modulo11(clave.slice(0, -1)))).toBe(true);
  });

  it('calcula dígito verificador módulo 11', () => {
    expect(modulo11('1234567890123456789012345678901234567890123456789')).toMatch(/[0-9]/);
  });
});
