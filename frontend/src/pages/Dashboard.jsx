"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function Dashboard() {
  const [resumen, setResumen] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/resumen") // Backend Java
      .then((res) => {
        if (!res.ok) throw new Error(`Error en la API: ${res.status}`);
        return res.json();
      })
      .then((data) => setResumen(data))
      .catch((err) => {
        console.error("Error cargando dashboard:", err);
        setError("No se pudo cargar el dashboard");
      });
  }, []);

  const COLORS = ["#22c55e", "#facc15", "#3b82f6", "#f87171", "#a855f7"];

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!resumen) return <p className="text-center mt-10">Cargando dashboard...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-green-900 mb-6">Dashboard - Mesa de Partes</h1>

      {/* Contadores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <p className="text-gray-500">Documentos Ingresados</p>
          <p className="text-3xl font-bold text-green-700">{resumen.ingresados}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <p className="text-gray-500">Documentos Salidos</p>
          <p className="text-3xl font-bold text-yellow-500">{resumen.salidos}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <p className="text-gray-500">Documentos Asignados</p>
          <p className="text-3xl font-bold text-blue-500">{resumen.asignados}</p>
        </div>
      </div>

      {/* Pie chart: Distribución por tipo de documento */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Distribución por Tipo de Documento</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={resumen.porTipo}
              dataKey="cantidad"
              nameKey="tipo"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#22c55e"
              label
            >
              {resumen.porTipo.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar chart: Documentos por mes */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Documentos por Mes</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={resumen.porTipo.map((item) => ({
              mes: item.tipo,
              ingresados: item.cantidad,
              salidos: 0,
            }))}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ingresados" fill="#22c55e" />
            <Bar dataKey="salidos" fill="#facc15" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
