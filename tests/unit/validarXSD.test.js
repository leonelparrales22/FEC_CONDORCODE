// Test unitario para validación XSD (mock)
const { validarXMLContraXSD } = require("../../src/sri/validarXSD");

describe("Validación XSD", () => {
  it("retorna true para XML válido (mock)", () => {
    const xml = "<factura></factura>";
    expect(validarXMLContraXSD(xml)).toBe(true);
  });
});
