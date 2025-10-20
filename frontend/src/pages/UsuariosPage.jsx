'use client';

import React, { useState, useEffect } from 'react';
import Select from 'react-select';

// 🔹 Modal genérico
function Modal({ children, onClose }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.35)',
          zIndex: 999,
          cursor: 'pointer',
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fffefc',
          borderRadius: 12,
          padding: 30,
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          width: '90%',
          maxWidth: 520,
          zIndex: 1000,
          cursor: 'default',
        }}
      >
        {children}
      </div>
    </>
  );
}

export default function UsuariosPage() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ roles: [], password: '' });

  useEffect(() => {
    async function fetchData() {
      try {
        const resUsers = await fetch('/api/users');
        const usersData = await resUsers.json();
        setUsers(usersData.map(user => ({ ...user, roles: user.roles ?? [] })));

        const resRoles = await fetch('/api/roles');
        const rolesData = await resRoles.json();
        setRoles(rolesData);
      } catch (error) {
        console.error('Error cargando datos:', error);
      }
    }
    fetchData();
  }, []);

  const startEditing = (user) => {
    setEditingUser(user);
    setEditForm({ ...user, password: '' });
  };

  const saveChanges = async (id) => {
    try {
      await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      setEditingUser(null);

      const resUsers = await fetch('/api/users');
      const usersData = await resUsers.json();
      setUsers(usersData.map(user => ({ ...user, roles: user.roles ?? [] })));
    } catch (error) {
      console.error('Error guardando cambios:', error);
    }
  };

  const roleOptions = roles.map(role => ({ value: role.nombre, label: role.nombre }));

  return (
    <div style={{ maxWidth: 800, margin: '50px auto', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: '#2c3e50', backgroundColor: '#fdfaf5', borderRadius: 16, padding: 30, boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 40, color: '#27ae60', fontSize: 28, fontWeight: '700' }}>
        Gestión de Usuarios
      </h1>

      {users.length === 0 && (
        <p style={{ textAlign: 'center', color: '#999', fontSize: 16 }}>Cargando usuarios...</p>
      )}

      {users.map(user => (
        <div
          key={user.id}
          style={{
            padding: '18px 22px',
            marginBottom: 15,
            borderRadius: 10,
            backgroundColor: '#fff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.12)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }}
        >
          <div>
            <b style={{ color: '#34495e', fontSize: 16 }}>{user.nombre} {user.apellido}</b>
            <span style={{ color: '#7f8c8d', marginLeft: 6 }}>{(user.roles ?? []).join(', ') || 'Sin roles'}</span>
          </div>
          <button
            onClick={() => startEditing(user)}
            style={{
              backgroundColor: '#f1c40f', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 6, cursor: 'pointer', fontWeight: 600, transition: 'background-color 0.3s, transform 0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f39c12'; e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#f1c40f'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            Editar
          </button>
        </div>
      ))}

      {editingUser && (
        <Modal onClose={() => setEditingUser(null)}>
          <h2 style={{ marginTop: 0, marginBottom: 20, color: '#27ae60', fontSize: 22, fontWeight: 700, textAlign: 'center' }}>Editar Usuario</h2>

          <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Nombre</label>
          <input type="text" value={editForm.nombre || ''} onChange={e => setEditForm({ ...editForm, nombre: e.target.value })} style={{ width: '100%', padding: 10, marginBottom: 12, borderRadius: 6, border: '1px solid #ccc', fontSize: 15 }} />

          <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Apellido</label>
          <input type="text" value={editForm.apellido || ''} onChange={e => setEditForm({ ...editForm, apellido: e.target.value })} style={{ width: '100%', padding: 10, marginBottom: 12, borderRadius: 6, border: '1px solid #ccc', fontSize: 15 }} />

          <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Usuario</label>
          <input type="text" value={editForm.username || ''} onChange={e => setEditForm({ ...editForm, username: e.target.value })} style={{ width: '100%', padding: 10, marginBottom: 12, borderRadius: 6, border: '1px solid #ccc', fontSize: 15 }} />

          <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Roles</label>
          <Select
            isMulti
            options={roleOptions}
            value={roleOptions.filter(opt => (editForm.roles || []).includes(opt.value))}
            onChange={selected => setEditForm({ ...editForm, roles: selected.map(opt => opt.value) })}
            placeholder="Selecciona roles..."
            styles={{
              control: base => ({ ...base, borderRadius: 6, fontSize: 15 }),
              multiValue: base => ({ ...base, backgroundColor: '#27ae60' }),
              multiValueLabel: base => ({ ...base, color: 'white' }),
              multiValueRemove: base => ({ ...base, color: 'white', ':hover': { backgroundColor: '#1e8449', color: 'white' } }),
            }}
          />

          <label style={{ display: 'block', marginTop: 12, marginBottom: 6, fontWeight: 600 }}>
            <input type="checkbox" checked={editForm.activo || false} onChange={e => setEditForm({ ...editForm, activo: e.target.checked })} style={{ marginRight: 8 }} />
            Usuario Activo
          </label>

          <div style={{ marginTop: 25, display: 'flex', gap: 12 }}>
            <button onClick={() => saveChanges(editingUser.id)} style={{ flex: 1, backgroundColor: '#27ae60', color: 'white', padding: '12px 0', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 16 }}>Guardar</button>
            <button onClick={() => setEditingUser(null)} style={{ flex: 1, backgroundColor: '#f1c40f', color: '#fff', padding: '12px 0', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 16 }}>Cancelar</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
