'use client';

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-6xl font-bold text-green-700 mb-4">404</h1>
      <p className="text-gray-600 text-lg mb-6">Página no encontrada</p>
      <button
        onClick={() => navigate('/dashboard')}
        className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition"
      >
        Volver al inicio
      </button>
    </div>
  );
}
