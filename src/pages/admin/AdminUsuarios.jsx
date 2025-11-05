// src/pages/admin/AdminUsuarios.jsx
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { usuarios as dataInicial } from '../../data/usuarios.js'

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([])
  const navigate = useNavigate()

  // 🔹 Cargar usuarios desde localStorage o archivo base
  useEffect(() => {
    const guardados = localStorage.getItem('usuarios')
    if (guardados) {
      setUsuarios(JSON.parse(guardados))
    } else {
      setUsuarios(dataInicial)
      localStorage.setItem('usuarios', JSON.stringify(dataInicial))
    }
  }, [])

  // 🔹 Eliminar usuario
  const eliminarUsuario = (id) => {
    if (confirm('¿Deseas eliminar este usuario?')) {
      const nuevos = usuarios.filter((u) => u.id !== id)
      setUsuarios(nuevos)
      localStorage.setItem('usuarios', JSON.stringify(nuevos))
    }
  }

  return (
    <div className="container py-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold">Usuarios</h3>
        <Link to="nuevo" className="btn btn-primary">
          <i className="fa-solid fa-user-plus me-1"></i> Nuevo usuario
        </Link>
      </div>

      {usuarios.length === 0 ? (
        <p className="text-muted">No hay usuarios registrados.</p>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle table-striped">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.nombre}</td>
                  <td>{u.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        u.rol === 'admin' ? 'bg-danger' : 'bg-success'
                      }`}
                    >
                      {u.rol}
                    </span>
                  </td>
                  <td className="text-end">
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => eliminarUsuario(u.id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => navigate(String(u.id))}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
