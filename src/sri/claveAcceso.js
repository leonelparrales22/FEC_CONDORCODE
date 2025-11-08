// Módulo para generar la clave de acceso SRI Ecuador
// Algoritmo oficial con dígito verificador módulo 11
// Documentado en español

/**
 * Genera la clave de acceso SRI
 * @param {Object} params - Parámetros requeridos
 * @param {string} params.fecha - Fecha en formato ddmmyyyy
 * @param {string} params.tipoComprobante - Código tipo comprobante (01, 04, etc)
 * @param {string} params.ruc - RUC emisor
 * @param {string} params.ambiente - 1=pruebas, 2=producción
 * @param {string} params.serie - Código establecimiento+punto emisión
 * @param {string} params.secuencial - Secuencial
 * @param {string} params.codigoNumerico - Código numérico aleatorio
 * @param {string} params.tipoEmision - 1=normal, 2=contingencia
 * @returns {string} clave de acceso
 */
function generarClaveAcceso({ fecha, tipoComprobante, ruc, ambiente, serie, secuencial, codigoNumerico, tipoEmision }) {
  const base = `${fecha}${tipoComprobante}${ruc}${ambiente}${serie}${secuencial}${codigoNumerico}${tipoEmision}`;
  const digito = modulo11(base);
  return base + digito;
}

// Algoritmo módulo 11 para dígito verificador
function modulo11(texto) {
  let total = 0;
  let peso = 2;
  for (let i = texto.length - 1; i >= 0; i--) {
    total += parseInt(texto[i], 10) * peso;
    peso = peso === 7 ? 2 : peso + 1;
  }
  const mod = 11 - (total % 11);
  if (mod === 11) return '0';
  if (mod === 10) return '1';
  return String(mod);
}

module.exports = { generarClaveAcceso, modulo11 };
