// Preload script para exponer API segura a renderer
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('fecAPI', {
  procesarFactura: (datosFactura) => ipcRenderer.invoke('factura:procesar', datosFactura),
  listarComprobantes: () => ipcRenderer.invoke('comprobantes:listar'),
  descargarComprobante: (id, tipo) => ipcRenderer.invoke('comprobante:descargar', { id, tipo }),
  exportarCSV: () => ipcRenderer.invoke('comprobantes:exportarCSV'),
  exportarCSVFechas: ({ fechaInicio, fechaFin }) => ipcRenderer.invoke('comprobantes:exportarCSVFechas', { fechaInicio, fechaFin }),
});
