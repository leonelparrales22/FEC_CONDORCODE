# Manual de Usuario - FEC_CONDORCODE

## Descripción
Aplicación de facturación electrónica para Ecuador, compatible con el SRI. Permite emitir comprobantes electrónicos, firmarlos digitalmente, enviarlos al SRI en ambiente de pruebas y gestionar el historial de comprobantes.

---

## Requisitos previos
- Windows, macOS o Linux
- Node.js instalado
- Certificado digital de pruebas (.p12)
- Conexión a internet
- Tener instalado xmlsec1 si se usará firma real (no mock)

---

## Instalación y ejecución
1. **Clona el repositorio:**
   ```powershell
   git clone https://github.com/leonelparrales22/FEC_CONDORCODE.git
   cd FEC_CONDORCODE
   ```
2. **Instala dependencias:**
   ```powershell
   npm install
   cd apps/renderer
   npm install
   cd ../..
   ```
3. **Configura ambiente de pruebas:**
   - Edita `.env` o copia `.env.example` a `.env` y coloca:
     ```
     SRI_ENDPOINT_PRUEBAS=https://celcer.sri.gob.ec/comprobantes-electronicos-ws/RecepcionComprobantesOffline?wsdl
     SMTP_HOST=smtp.mailtrap.io
     SMTP_PORT=2525
     SMTP_USER=usuario
     SMTP_PASS=contraseña
     CERT_PATH=RUTA_A_TU_CERTIFICADO_DE_PRUEBAS.p12
     CERT_PASS=tu_contraseña
     DB_PATH=./fec_condorcode.db
     ```
   - Usa un certificado de pruebas proporcionado por el SRI.
4. **Ejecuta el mock SRI server (opcional para pruebas locales):**
   ```powershell
   node src/mock/sriServerMock.js
   ```
5. **Ejecuta la aplicación en modo desarrollo:**
   ```powershell
   npm run dev:main
   # En otra terminal
   cd apps/renderer
   npm start
   ```
   - La app se abrirá en una ventana de escritorio.

---

## Flujo de uso en modo test SRI
1. **Accede al formulario de factura:**
   - Ingresa los datos del cliente, producto/servicio, total y correo electrónico (opcional).
2. **Procesa la factura:**
   - Haz clic en "Procesar Factura". La app:
     - Genera la clave de acceso SRI
     - Genera el XML
     - Valida el XML (mock)
     - Firma el XML (mock)
     - Envía el comprobante al endpoint de pruebas del SRI
     - Genera el PDF y lo guarda
     - Envía el email con PDF/XML si se ingresó correo
     - Guarda el comprobante en el historial
3. **Consulta historial:**
   - Ve al listado de comprobantes, filtra por RUC, razón social o fechas.
   - Descarga PDF/XML o exporta el historial a CSV.
   - Exporta comprobantes por rango de fechas.

---

## Notas importantes
- El ambiente de pruebas del SRI no autoriza comprobantes reales, solo valida estructura y firma.
- No uses certificados ni datos reales en ambiente de pruebas.
- Para pasar a producción, debes estar habilitado por el SRI y usar un certificado digital válido.
- No compartas tu clave privada ni contraseñas.

---

## Preguntas frecuentes
- **¿Cómo obtengo un certificado de pruebas?**
  Solicítalo al SRI o usa los ejemplos provistos en la documentación oficial.
- **¿Cómo cambio a ambiente de producción?**
  Edita `.env` y coloca el endpoint de producción del SRI y tu certificado digital válido.
- **¿Dónde se almacenan los comprobantes?**
  En la base de datos local SQLite (`fec_condorcode.db`).
- **¿Cómo reporto un error?**
  Revisa los logs y contacta al soporte técnico indicado en el repositorio.

---

## Contacto y soporte
- Revisa el README y la documentación técnica para más detalles.
- Para soporte, abre un issue en el repositorio GitHub.
