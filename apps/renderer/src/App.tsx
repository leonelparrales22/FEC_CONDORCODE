  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  async function exportarCSVFechas() {
    if (window.fecAPI && window.fecAPI.exportarCSVFechas) {
      const csv = await window.fecAPI.exportarCSVFechas({ fechaInicio, fechaFin });
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'comprobantes_rango.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }
  const [filtro, setFiltro] = useState('');
  async function exportarCSV() {
    if (window.fecAPI && window.fecAPI.exportarCSV) {
      const csv = await window.fecAPI.exportarCSV();
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'comprobantes.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }

import React, { useState, useEffect } from 'react';
  const [comprobantes, setComprobantes] = useState<any[]>([]);
  useEffect(() => {
    if (window.fecAPI && window.fecAPI.procesarFactura) {
      window.fecAPI.listarComprobantes = () => window.fecAPIInvoke('comprobantes:listar');
      window.fecAPI.descargarComprobante = (id: number, tipo: string) => window.fecAPIInvoke('comprobante:descargar', { id, tipo });
    }
    cargarComprobantes();
  }, []);

  async function cargarComprobantes() {
    if (window.fecAPI && window.fecAPI.listarComprobantes) {
      const lista = await window.fecAPI.listarComprobantes();
      setComprobantes(lista);
    }
  }

  async function descargarArchivo(id: number, tipo: string) {
    if (window.fecAPI && window.fecAPI.descargarComprobante) {
      const res = await window.fecAPI.descargarComprobante(id, tipo);
      if (res.buffer) {
        // Descargar archivo en el navegador
        const blob = new Blob([res.buffer], { type: tipo === 'pdf' ? 'application/pdf' : 'text/xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = tipo === 'pdf' ? `comprobante_${id}.pdf` : `comprobante_${id}.xml`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    }
  }
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Historial de comprobantes</h2>
        <div className="mb-2 flex gap-2 items-center flex-wrap">
          <input type="text" placeholder="Filtrar por RUC o Razón Social" className="border p-1 text-xs" value={filtro} onChange={e => setFiltro(e.target.value)} />
          <button className="bg-gray-700 text-white px-2 py-1 rounded text-xs" onClick={exportarCSV}>Exportar CSV</button>
          <input type="date" className="border p-1 text-xs" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} />
          <input type="date" className="border p-1 text-xs" value={fechaFin} onChange={e => setFechaFin(e.target.value)} />
          <button className="bg-blue-700 text-white px-2 py-1 rounded text-xs" onClick={exportarCSVFechas}>Exportar CSV por fechas</button>
        </div>
        <table className="w-full text-xs border">
          <thead>
            <tr className="bg-gray-200">
              <th>ID</th>
              <th>Clave Acceso</th>
              <th>RUC</th>
              <th>Razón Social</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Descargas</th>
            </tr>
          </thead>
          <tbody>
            {comprobantes.filter(c =>
              c.ruc.includes(filtro) || c.razonSocial.toLowerCase().includes(filtro.toLowerCase())
            ).map(c => (
              <tr key={c.id} className="border-b">
                <td>{c.id}</td>
                <td className="break-all">{c.claveAcceso}</td>
                <td>{c.ruc}</td>
                <td>{c.razonSocial}</td>
                <td>{c.fecha}</td>
                <td>{c.total}</td>
                <td>{c.estado}</td>
                <td>
                  <button className="text-blue-600 underline mr-2" onClick={() => descargarArchivo(c.id, 'pdf')}>PDF</button>
                  <button className="text-green-600 underline" onClick={() => descargarArchivo(c.id, 'xml')}>XML</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


// Acceso seguro a la API de Electron (preload)
declare global {
  interface Window {
    fecAPI: {
      procesarFactura: (datosFactura: any) => Promise<any>;
    };
  }
}

export default function App() {
  const [factura, setFactura] = useState({
    ruc: '',
    razonSocial: '',
    fecha: '',
    total: '',
    email: '',
  });
  const [xml, setXml] = useState('');
  const [estado, setEstado] = useState('');
  const [claveAcceso, setClaveAcceso] = useState('');
  const [firmado, setFirmado] = useState('');
  const [pdfGenerado, setPdfGenerado] = useState(false);
  const [emailResult, setEmailResult] = useState<any>(null);

  async function procesarFactura() {
    setEstado('Procesando...');
      if (!window.fecAPI || !window.fecAPI.procesarFactura) {
        setEstado('API de facturación no disponible');
        return;
      }
      const res = await window.fecAPI.procesarFactura(factura);
  setXml(res.xml);
  setFirmado(res.firmado);
  setClaveAcceso(res.claveAcceso);
  setPdfGenerado(res.pdf);
  setEmailResult(res.emailResult);
  setEstado(`${res.estado}: ${res.mensaje}`);
  }

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Factura Electrónica SRI (MVP)</h1>
      <form className="space-y-2">
        <input type="text" placeholder="RUC" className="w-full border p-2" value={factura.ruc} onChange={e => setFactura({ ...factura, ruc: e.target.value })} />
        <input type="text" placeholder="Razón Social" className="w-full border p-2" value={factura.razonSocial} onChange={e => setFactura({ ...factura, razonSocial: e.target.value })} />
        <input type="date" className="w-full border p-2" value={factura.fecha} onChange={e => setFactura({ ...factura, fecha: e.target.value })} />
        <input type="number" placeholder="Total" className="w-full border p-2" value={factura.total} onChange={e => setFactura({ ...factura, total: e.target.value })} />
        <input type="email" placeholder="Email destinatario (opcional)" className="w-full border p-2" value={factura.email} onChange={e => setFactura({ ...factura, email: e.target.value })} />
      </form>
      <div className="mt-4">
        <div className="font-semibold">PDF generado:</div>
        <div>{pdfGenerado ? 'Sí' : 'No'}</div>
      </div>
      <div className="mt-4">
        <div className="font-semibold">Email enviado:</div>
        <div>{emailResult ? (emailResult.error ? `Error: ${emailResult.error}` : 'Enviado') : 'No solicitado'}</div>
      </div>
      <div className="flex gap-2 mt-4">
        <button type="button" className="bg-blue-500 text-white px-3 py-1 rounded" onClick={procesarFactura}>Procesar Factura</button>
      </div>
      <div className="mt-4">
        <div className="font-semibold">Estado:</div>
        <div>{estado}</div>
      </div>
      <div className="mt-4">
        <div className="font-semibold">Clave de Acceso:</div>
        <div className="break-all text-xs">{claveAcceso}</div>
      </div>
      <div className="mt-4">
        <div className="font-semibold">XML generado:</div>
        <pre className="bg-gray-100 p-2 text-xs overflow-x-auto">{xml}</pre>
      </div>
      <div className="mt-4">
        <div className="font-semibold">XML firmado:</div>
        <pre className="bg-gray-100 p-2 text-xs overflow-x-auto">{firmado}</pre>
      </div>
    </div>
  );
}
