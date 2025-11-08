# FEC_CONDORCODE

Software de Facturación Electrónica SRI Ecuador

## Estructura
- Electron (Node.js backend)
- React + TypeScript + Tailwind (frontend)
- SQLite/SQLCipher
- Firma digital XML
- Integración SOAP SRI
- Generación PDF
- Envío SMTP
- Mock SRI server

## Setup rápido
1. Instala dependencias nativas: xmlsec1, OpenSSL
2. Instala dependencias Node.js: `npm install`
3. Configura variables en `.env`
4. Ejecuta en modo desarrollo: `npm run dev`

## Producción
- Empaquetado multiplataforma con electron-builder
- Checklist en `checklist-produccion.md`

## Notas legales
- Requiere habilitación SRI y certificado digital válido
- No incluir claves privadas ni contraseñas reales en el repo

---

## MVP mínimo
- Formulario React para factura
- Generación XML mock
- Validación XSD mock
- Firma mock
- Envío a mock SRI
- Historial básico
- Pantalla de configuración
- Tests unitarios y E2E
- CI con GitHub Actions

---

## Estructura de carpetas
```
apps/main        # Electron main process
apps/renderer    # React frontend
src/sri          # Módulos SRI
src/db           # DB local
src/pdf          # PDF
src/email        # SMTP
src/mock         # Mock SRI
src/utils        # Utilidades
public           # Assets
scripts          # Migraciones, setup
.github/workflows# CI
```
