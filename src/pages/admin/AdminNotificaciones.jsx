import { useNavigate } from 'react-router-dom'
import { useNotificaciones } from '../../hooks/useNotificaciones'

export default function AdminNotificaciones() {
  const navigate = useNavigate()
  const { 
    notificaciones, 
    loading, 
    marcarComoLeida, 
    marcarTodasComoLeidas,
    contadorNoLeidas 
  } = useNotificaciones()

  const handleClickNotificacion = (notificacion) => {
    // Redirigir según el tipo (sin marcar como leída automáticamente)
    if (notificacion.tipo === 'pedido') {
      navigate('/admin/pedidos')
    } else if (notificacion.tipo === 'contacto') {
      navigate('/admin/contactos')
    } else if (notificacion.tipo === 'stock') {
      navigate('/admin/productos')
    }
  }

  const handleMarcarLeida = (e, notificacion) => {
    e.stopPropagation() // Evitar que se dispare el click del contenedor
    marcarComoLeida(notificacion)
  }

  const getIcono = (tipo) => {
    switch (tipo) {
      case 'pedido':
        return 'fa-shopping-cart text-primary'
      case 'contacto':
        return 'fa-envelope text-info'
      case 'stock':
        return 'fa-exclamation-triangle text-warning'
      default:
        return 'fa-bell'
    }
  }

  const formatearFecha = (fecha) => {
    const ahora = new Date()
    const diff = ahora - new Date(fecha)
    const minutos = Math.floor(diff / 60000)
    const horas = Math.floor(diff / 3600000)
    const dias = Math.floor(diff / 86400000)

    if (minutos < 1) return 'Ahora mismo'
    if (minutos < 60) return `Hace ${minutos} min`
    if (horas < 24) return `Hace ${horas} hora${horas > 1 ? 's' : ''}`
    if (dias < 7) return `Hace ${dias} día${dias > 1 ? 's' : ''}`
    
    return new Date(fecha).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className="container py-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold">
          <i className="fa-solid fa-bell me-2"></i>
          Notificaciones
          {contadorNoLeidas > 0 && (
            <span className="badge bg-danger ms-2">{contadorNoLeidas}</span>
          )}
        </h3>
        {contadorNoLeidas > 0 && (
          <button 
            className="btn btn-sm btn-outline-secondary"
            onClick={marcarTodasComoLeidas}
          >
            Marcar todas como leídas
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="text-muted mt-2">Cargando notificaciones...</p>
        </div>
      ) : notificaciones.length === 0 ? (
        <div className="alert alert-info">
          <i className="fa-solid fa-info-circle me-2"></i>
          No hay notificaciones nuevas
        </div>
      ) : (
        <div className="list-group">
          {notificaciones.map(notificacion => (
            <div
              key={notificacion.id}
              className={`list-group-item list-group-item-action ${
                !notificacion.leida ? 'bg-light border-primary' : ''
              }`}
              onClick={() => handleClickNotificacion(notificacion)}
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex w-100 justify-content-between align-items-start">
                <div className="d-flex align-items-start flex-grow-1">
                  <i className={`fa-solid ${getIcono(notificacion.tipo)} fa-lg me-3 mt-1`}></i>
                  <div className="flex-grow-1">
                    <h6 className="mb-1 fw-bold">
                      {notificacion.titulo}
                      {!notificacion.leida && (
                        <span className="badge bg-primary ms-2">Nueva</span>
                      )}
                    </h6>
                    <p className="mb-1">{notificacion.mensaje}</p>
                    <small className="text-muted">
                      <i className="fa-solid fa-clock me-1"></i>
                      {formatearFecha(notificacion.fecha)}
                    </small>
                  </div>
                </div>
                {!notificacion.leida && (
                  <button
                    className="btn btn-sm btn-success ms-2"
                    onClick={(e) => handleMarcarLeida(e, notificacion)}
                  >
                    <i className="fa-solid fa-check me-1"></i>
                    Marcar como leída
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
