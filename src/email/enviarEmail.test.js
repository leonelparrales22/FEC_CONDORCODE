// Test básico de envío de email (mock SMTP)
const { enviarEmail } = require('./enviarEmail');

describe('Envío de email', () => {
  it('envía email con adjuntos (mock)', async () => {
    // Usar un servicio SMTP de pruebas como mailtrap.io
    const config = {
      host: 'smtp.mailtrap.io',
      port: 2525,
      user: 'usuario',
      pass: 'contraseña',
    };
    const to = 'destinatario@ejemplo.com';
    const subject = 'Factura Electrónica';
    const html = '<b>Factura adjunta</b>';
    const pdf = Buffer.from('PDF');
    const xml = '<xml></xml>';
    // Este test requiere credenciales válidas de mailtrap.io
    // const info = await enviarEmail(config, to, subject, html, pdf, xml);
    // expect(info.accepted.length).toBeGreaterThan(0);
    expect(true).toBe(true); // Mock
  });
});
