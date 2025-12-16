// src/pages/admin/AdminContactos.jsx
import { useState, useEffect } from 'react'

export default function AdminContactos() {
  const [mensajes, setMensajes] = useState([])

  useEffect(() => {
    cargarMensajes()
  }, [])

  const cargarMensajes = () => {
    const mensajesGuardados = JSON.parse(localStorage.getItem('mensajesContacto') || '[]')
    setMensajes(mensajesGuardados)
  }

  const marcarComoLeido = (id) => {
    const mensajesActualizados = mensajes.map(msg =>
      msg.id === id ? { ...msg, leido: true } : msg
    )
    setMensajes(mensajesActualizados)
    localStorage.setItem('mensajesContacto', JSON.stringify(mensajesActualizados))
  }

  const eliminarMensaje = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este mensaje?')) {
      const mensajesFiltrados = mensajes.filter(msg => msg.id !== id)
      setMensajes(mensajesFiltrados)
      localStorage.setItem('mensajesContacto', JSON.stringify(mensajesFiltrados))
    }
  }

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-success fw-bold">
          <i className="fa-solid fa-envelope me-2"></i>
          Mensajes de Contacto
        </h2>
        <span className="badge bg-success fs-6">
          {mensajes.filter(m => !m.leido).length} sin leer
        </span>
      </div>

      {mensajes.length === 0 ? (
        <div className="alert alert-info text-center">
          <i className="fa-solid fa-inbox fs-1 d-block mb-2"></i>
          No hay mensajes recibidos
        </div>
      ) : (
        <div className="row g-3">
          {mensajes.map((mensaje) => (
            <div key={mensaje.id} className="col-12">
              <div className={`card shadow-sm ${!mensaje.leido ? 'border-success border-2' : ''}`}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="mb-1">
                        {mensaje.nombre}
                        {!mensaje.leido && (
                          <span className="badge bg-success ms-2">Nuevo</span>
                        )}
                      </h5>
                      <p className="text-muted mb-0">
                        <i className="fa-solid fa-envelope me-2"></i>
                        {mensaje.correo}
                      </p>
                      <p className="text-muted small mb-0">
                        <i className="fa-solid fa-clock me-2"></i>
                        {formatearFecha(mensaje.fecha)}
                      </p>
                    </div>
                    <div className="btn-group">
                      {!mensaje.leido && (
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => marcarComoLeido(mensaje.id)}
                          title="Marcar como leído"
                        >
                          <i className="fa-solid fa-check me-1"></i>
                          Leído
                        </button>
                      )}
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => eliminarMensaje(mensaje.id)}
                        title="Eliminar"
                      >
                        <i className="fa-solid fa-trash me-1"></i>
                        Eliminar
                      </button>
                    </div>
                  </div>
                  <div className="card bg-light p-3">
                    <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                      {mensaje.mensaje}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
