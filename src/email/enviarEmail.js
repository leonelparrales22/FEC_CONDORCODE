// Módulo para enviar email con adjuntos (PDF/XML)
const nodemailer = require("nodemailer");

/**
 * Envía un correo con PDF y XML adjuntos
 * @param {Object} config - Configuración SMTP
 * @param {string} to - Destinatario
 * @param {string} subject - Asunto
 * @param {string} html - Cuerpo HTML
 * @param {Buffer} pdf - PDF en buffer
 * @param {string} xml - XML en string
 * @returns {Promise<Object>} resultado
 */
async function enviarEmail({ host, port, user, pass }, to, subject, html, pdf, xml) {
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
  const info = await transporter.sendMail({
    from: user,
    to,
    subject,
    html,
    attachments: [
      { filename: "factura.pdf", content: pdf },
      { filename: "factura.xml", content: xml },
    ],
  });
  return info;
}

module.exports = { enviarEmail };
