// Módulo para generar XML de factura SRI Ecuador
// Estructura simplificada para MVP
// Documentado en español

/**
 * Genera el XML de una factura electrónica
 * @param {Object} factura - Datos de la factura
 * @returns {string} XML en formato string
 */
function generarXMLFactura(factura) {
  // Estructura básica, debe ajustarse a XSD oficial en producción
  return `<?xml version="1.0" encoding="UTF-8"?>
<factura id="comprobante" version="1.1.0">
  <infoTributaria>
    <claveAcceso>${factura.claveAcceso}</claveAcceso>
    <ruc>${factura.ruc}</ruc>
    <razonSocial>${factura.razonSocial}</razonSocial>
    <fechaEmision>${factura.fecha}</fechaEmision>
  </infoTributaria>
  <infoFactura>
    <total>${factura.total}</total>
  </infoFactura>
</factura>`;
}

module.exports = { generarXMLFactura };
