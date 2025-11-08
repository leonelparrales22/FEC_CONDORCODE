// Módulo para enviar comprobante al SRI (mock para MVP)
// En producción usar node-soap o HTTP/XML
const axios = require("axios");

/**
 * Envía el comprobante al SRI (mock)
 * @param {string} xmlFirmado - XML firmado
 * @param {string} endpoint - URL del servicio SRI
 * @returns {Promise<Object>} respuesta del SRI
 */
async function enviarComprobanteSRI(xmlFirmado, endpoint) {
  // Mock: envía al mock SRI server
  try {
    const res = await axios.post(endpoint, xmlFirmado, {
      headers: { "Content-Type": "text/xml" },
    });
    return res.data;
  } catch (err) {
    return { estado: "ERROR", mensaje: err.message };
  }
}

module.exports = { enviarComprobanteSRI };
