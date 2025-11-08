// Exportar comprobantes por rango de fechas a CSV
ipcMain.handle("comprobantes:exportarCSVFechas", async (event, { fechaInicio, fechaFin }) => {
  const lista = listarComprobantes().filter((c) => {
    const fecha = new Date(c.fecha);
    return (!fechaInicio || fecha >= new Date(fechaInicio)) && (!fechaFin || fecha <= new Date(fechaFin));
  });
  const fields = ["id", "claveAcceso", "ruc", "razonSocial", "fecha", "total", "estado", "creadoEn"];
  const csv = parse(lista, { fields });
  return csv;
});
const { listarComprobantes } = require("../../src/db/db");
const { ipcMain } = require("electron");
const { parse } = require("json2csv");

// Exportar comprobantes a CSV
ipcMain.handle("comprobantes:exportarCSV", async () => {
  const lista = listarComprobantes();
  const fields = ["id", "claveAcceso", "ruc", "razonSocial", "fecha", "total", "estado", "creadoEn"];
  const csv = parse(lista, { fields });
  return csv;
});
const { listarComprobantes } = require("../../src/db/db");
const { ipcMain } = require("electron");

// Listar comprobantes
ipcMain.handle("comprobantes:listar", async () => {
  return listarComprobantes();
});

// Descargar PDF/XML
ipcMain.handle("comprobante:descargar", async (event, { id, tipo }) => {
  const comprobantes = listarComprobantes();
  const comp = comprobantes.find((c) => c.id === id);
  if (!comp) return { error: "No encontrado" };
  if (tipo === "pdf") return { buffer: comp.pdf };
  if (tipo === "xml") return { buffer: Buffer.from(comp.xml) };
  return { error: "Tipo inválido" };
});
// API entre Electron main y renderer para facturación
const { generarClaveAcceso } = require("../../src/sri/claveAcceso");
const { generarXMLFactura } = require("../../src/sri/xmlFactura");
const { validarXMLContraXSD } = require("../../src/sri/validarXSD");
const { firmarXMLMock } = require("../../src/sri/firmaMock");
const { enviarComprobanteSRI } = require("../../src/sri/enviarSRI");
const { generarPDF } = require("../../src/pdf/generarPDF");
const { guardarComprobante } = require("../../src/db/db");
const { enviarEmail } = require("../../src/email/enviarEmail");
const { ipcMain } = require("electron");

// Maneja el flujo completo desde la UI
ipcMain.handle("factura:procesar", async (event, datosFactura) => {
  // 1. Generar clave de acceso
  const claveAcceso = generarClaveAcceso({
    fecha: datosFactura.fecha,
    tipoComprobante: "01",
    ruc: datosFactura.ruc,
    ambiente: "1",
    serie: "001001",
    secuencial: "000000123",
    codigoNumerico: "12345678",
    tipoEmision: "1",
  });
  // 2. Generar XML
  const xml = generarXMLFactura({ ...datosFactura, claveAcceso });
  // 3. Validar XSD
  const valido = validarXMLContraXSD(xml);
  if (!valido) return { estado: "ERROR", mensaje: "XML inválido" };
  // 4. Firmar XML
  const firmado = firmarXMLMock(xml, "", "");
  // 5. Enviar a SRI (mock)
  const res = await enviarComprobanteSRI(firmado, "http://localhost:4000/recepcion");
  // 6. Generar PDF
  const pdf = await generarPDF({ ...datosFactura, claveAcceso });
  // 7. Guardar en DB
  guardarComprobante({
    claveAcceso,
    ruc: datosFactura.ruc,
    razonSocial: datosFactura.razonSocial,
    fecha: datosFactura.fecha,
    total: datosFactura.total,
    estado: res.estado,
    xml,
    pdf,
  });
  // 8. Enviar email (mock SMTP, configurable)
  let emailResult = null;
  if (datosFactura.email) {
    try {
      emailResult = await enviarEmail(
        {
          host: process.env.SMTP_HOST || "",
          port: process.env.SMTP_PORT || 587,
          user: process.env.SMTP_USER || "",
          pass: process.env.SMTP_PASS || "",
        },
        datosFactura.email,
        "Factura Electrónica",
        `<b>Factura adjunta</b><br/>Clave de acceso: ${claveAcceso}`,
        pdf,
        xml
      );
    } catch (err) {
      emailResult = { error: err.message };
    }
  }
  return { estado: res.estado, mensaje: res.mensaje, claveAcceso, xml, firmado, pdf: !!pdf, emailResult };
});
