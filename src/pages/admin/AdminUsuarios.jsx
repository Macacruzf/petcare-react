// src/pages/admin/AdminUsuarios.jsx
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { obtenerTodosUsuarios } from '../../services/usuarioService'

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // 🔹 Cargar usuarios desde el microservicio
  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        setLoading(true)
        const data = await obtenerTodosUsuarios()
        setUsuarios(data)
      } catch (err) {
        setError('Error al cargar usuarios: ' + err.message)
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    cargarUsuarios()
  }, [])

  // 🔹 Eliminar usuario
  const eliminarUsuario = (id) => {
    if (confirm('¿Deseas eliminar este usuario?')) {
      // TODO: Implementar eliminación con microservicio
      alert('Funcionalidad de eliminación pendiente de implementar')
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

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="text-muted mt-2">Cargando usuarios...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : usuarios.length === 0 ? (
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
                  <td>{u.nombre} {u.apellido}</td>
                  <td>{u.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        u.rol === 'ADMIN' ? 'bg-danger' : 'bg-success'
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
