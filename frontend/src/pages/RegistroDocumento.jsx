'use client';
import React, { useEffect, useState } from "react";
import '../assets/css/form.css';


export default function RegistroDocumento() {
  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [areas, setAreas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [archivoCargo, setArchivoCargo] = useState(null);

  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [numeroDoc, setNumeroDoc] = useState("");
  const [numeroHT, setNumeroHT] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [areaDestino, setAreaDestino] = useState("");
  const [usuarioAsignado, setUsuarioAsignado] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/tipos_documento").then((res) => res.json()),
      fetch("/api/areas").then((res) => res.json()),
      fetch("/api/users").then((res) => res.json()),
    ]).then(([tipos, areas, usuarios]) => {
      setTiposDocumento(Array.isArray(tipos) ? tipos : []);
      setAreas(Array.isArray(areas) ? areas : []);
      setUsuarios(
        Array.isArray(usuarios)
          ? usuarios.map((u) => ({ ID_usuario: u.ID_usuario, nombre: u.nombre }))
          : []
      );
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      titulo,
      tipo,
      numeroDoc,
      numeroHT,
      descripcion,
      areaDestino,
      usuarioAsignado,
      archivoCargo,
    });
    alert("Formulario listo para enviar al backend");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-green-900">
        Registrar Nuevo Documento
      </h2>
      <p className="mb-6 text-gray-700">
        Complete el formulario para registrar un nuevo documento en el sistema.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-xl shadow-lg"
      >
        <div>
          <label className="block font-semibold mb-1">Asunto / Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ej: Solicitud de información sobre patrullaje"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Tipo de Documento</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="">Seleccione un tipo</option>
            {tiposDocumento.map((t) => (
              <option key={t.ID_tipo_documento} value={t.ID_tipo_documento}>
                {t.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">
              N° Documento Externo (Opcional)
            </label>
            <input
              type="text"
              value={numeroDoc}
              onChange={(e) => setNumeroDoc(e.target.value)}
              placeholder="Ej: OFICIO-0123-2024"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">
              N° Hoja de Trámite (HT)
            </label>
            <input
              type="text"
              value={numeroHT}
              onChange={(e) => setNumeroHT(e.target.value)}
              placeholder="Ej: 2024-001234"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Descripción / Sumilla
          </label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Breve resumen del contenido del documento"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Adjuntar Cargo</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.png"
            onChange={(e) =>
              setArchivoCargo(e.target.files ? e.target.files[0] : null)
            }
            className="block w-full text-sm text-gray-700
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-semibold
                       file:bg-green-700 file:text-white
                       hover:file:bg-green-800 transition"
          />
          {archivoCargo && (
            <p className="text-sm mt-2 text-gray-600">📄 {archivoCargo.name}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Área de Destino</label>
            <select
              value={areaDestino}
              onChange={(e) => setAreaDestino(e.target.value)}
            >
              <option value="">Seleccione un área</option>
              {areas.map((a) => (
                <option key={a.ID_area} value={a.ID_area}>
                  {a.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Asignar a</label>
            <select
              value={usuarioAsignado}
              onChange={(e) => setUsuarioAsignado(e.target.value)}
            >
              <option value="">Seleccione un usuario</option>
              {usuarios.map((u) => (
                <option key={u.ID_usuario} value={u.ID_usuario}>
                  {u.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-2 rounded-xl shadow transition"
          >
            Registrar Documento
          </button>
        </div>
      </form>
    </div>
  );
}
