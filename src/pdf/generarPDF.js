// Módulo para generar PDF de factura usando Puppeteer
const puppeteer = require('puppeteer');

/**
 * Genera un PDF de la factura
 * @param {Object} factura - Datos de la factura
 * @returns {Promise<Buffer>} PDF en buffer
 */
async function generarPDF(factura) {
  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial; }
          .qr { margin-top: 10px; }
        </style>
      </head>
      <body>
        <h2>Factura Electrónica SRI</h2>
        <div>RUC: ${factura.ruc}</div>
        <div>Razón Social: ${factura.razonSocial}</div>
        <div>Fecha: ${factura.fecha}</div>
        <div>Total: ${factura.total}</div>
        <div>Clave de Acceso: ${factura.claveAcceso}</div>
        <div class="qr"><img src="https://api.qrserver.com/v1/create-qr-code/?data=${factura.claveAcceso}&size=100x100" /></div>
      </body>
    </html>
  `;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  const pdf = await page.pdf({ format: 'A4' });
  await browser.close();
  return pdf;
}

module.exports = { generarPDF };
