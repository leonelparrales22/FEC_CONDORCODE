// Módulo de firma digital (mock para MVP)
// En producción usar xmlsec1 o xml-crypto

/**
 * Firma digitalmente un XML (mock)
 * @param {string} xml - XML a firmar
 * @param {string} certPath - Ruta al certificado .p12
 * @param {string} certPass - Contraseña del certificado
 * @returns {string} XML firmado (mock)
 */
function firmarXMLMock(xml, certPath, certPass) {
  // Mock: agrega etiqueta <firmado/>
  return xml + "\n<!-- firmado digitalmente (mock) -->";
}

module.exports = { firmarXMLMock };
