import { useState, useEffect } from 'react'
import { obtenerTodosPedidos, cambiarEstadoPedido, calcularTotalPedido } from '../../services/pedidosService'
import './AdminPedidos.css'

const AdminPedidos = () => {
  const [pedidos, setPedidos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filtroEstado, setFiltroEstado] = useState('TODOS')
  const [updatingPedidoId, setUpdatingPedidoId] = useState(null)

  useEffect(() => {
    cargarPedidos()
  }, [])

  const cargarPedidos = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await obtenerTodosPedidos()
      setPedidos(data)
    } catch (err) {
      console.error('Error al cargar pedidos:', err)
      setError('No se pudieron cargar los pedidos. Verifica que el microservicio de Pedidos esté activo.')
    } finally {
      setLoading(false)
    }
  }

  const handleCambiarEstado = async (pedidoId, nuevoEstado) => {
    try {
      setUpdatingPedidoId(pedidoId)
      await cambiarEstadoPedido(pedidoId, nuevoEstado)
      // Actualizar el pedido en el estado local
      setPedidos(prevPedidos =>
        prevPedidos.map(pedido =>
          pedido.id === pedidoId ? { ...pedido, estado: nuevoEstado } : pedido
        )
      )
      alert(`Estado del pedido #${pedidoId} actualizado a ${nuevoEstado}`)
    } catch (err) {
      console.error('Error al cambiar estado:', err)
      alert('Error al cambiar el estado del pedido')
    } finally {
      setUpdatingPedidoId(null)
    }
  }

  const formatearFecha = (fecha) => {
    if (!fecha) return 'N/A'
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatearPrecio = (precio) => {
    return `$${precio.toLocaleString('es-CL')}`
  }

  const obtenerBadgeEstado = (estado) => {
    const badges = {
      PENDIENTE: 'badge-warning',
      CONFIRMADO: 'badge-info',
      ENVIADO: 'badge-primary',
      POR_ENTREGAR: 'badge-primary',
      ENTREGADO: 'badge-success',
      CANCELADO: 'badge-danger'
    }
    return badges[estado] || 'badge-secondary'
  }

  const pedidosFiltrados = filtroEstado === 'TODOS'
    ? pedidos
    : pedidos.filter(pedido => pedido.estado === filtroEstado)

  if (loading) {
    return (
      <div className="admin-pedidos-container">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando pedidos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="admin-pedidos-container">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error</h4>
          <p>{error}</p>
          <button className="btn btn-danger" onClick={cargarPedidos}>
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-pedidos-container">
      <div className="admin-pedidos-header">
        <h2>Gestión de Pedidos</h2>
        <button className="btn btn-primary" onClick={cargarPedidos}>
          <i className="bi bi-arrow-clockwise"></i> Actualizar
        </button>
      </div>

      {/* Filtros */}
      <div className="filtros-container mb-4">
        <label className="me-2">Filtrar por estado:</label>
        <div className="btn-group" role="group">
          <button
            className={`btn ${filtroEstado === 'TODOS' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFiltroEstado('TODOS')}
          >
            Todos ({pedidos.length})
          </button>
          <button
            className={`btn ${filtroEstado === 'PENDIENTE' ? 'btn-warning' : 'btn-outline-warning'}`}
            onClick={() => setFiltroEstado('PENDIENTE')}
          >
            Pendientes ({pedidos.filter(p => p.estado === 'PENDIENTE').length})
          </button>
          <button
            className={`btn ${filtroEstado === 'POR_ENTREGAR' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFiltroEstado('POR_ENTREGAR')}
          >
            Por Entregar ({pedidos.filter(p => p.estado === 'POR_ENTREGAR').length})
          </button>
          <button
            className={`btn ${filtroEstado === 'ENTREGADO' ? 'btn-success' : 'btn-outline-success'}`}
            onClick={() => setFiltroEstado('ENTREGADO')}
          >
            Entregados ({pedidos.filter(p => p.estado === 'ENTREGADO').length})
          </button>
          <button
            className={`btn ${filtroEstado === 'CANCELADO' ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={() => setFiltroEstado('CANCELADO')}
          >
            Cancelados ({pedidos.filter(p => p.estado === 'CANCELADO').length})
          </button>
        </div>
      </div>

      {/* Lista de Pedidos */}
      {pedidosFiltrados.length === 0 ? (
        <div className="alert alert-info">
          No hay pedidos {filtroEstado !== 'TODOS' ? `con estado ${filtroEstado}` : ''}.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Email</th>
                <th>Fecha</th>
                <th>Items</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidosFiltrados.map((pedido) => {
                const total = calcularTotalPedido(pedido)
                const items = pedido.detalles || pedido.items || []
                return (
                  <tr key={pedido.id}>
                    <td>#{pedido.id}</td>
                    <td>{pedido.nombreUsuario || `Usuario #${pedido.usuarioId}`}</td>
                    <td>{pedido.emailUsuario || 'N/A'}</td>
                    <td>{formatearFecha(pedido.fechaCreacion)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-link"
                        data-bs-toggle="modal"
                        data-bs-target={`#detallePedido${pedido.id}`}
                      >
                        {items.length} productos
                      </button>
                    </td>
                    <td className="fw-bold">{formatearPrecio(total)}</td>
                    <td>
                      <span className={`badge ${obtenerBadgeEstado(pedido.estado)}`}>
                        {pedido.estado}
                      </span>
                    </td>
                    <td>
                      <select
                        className="form-select form-select-sm"
                        value={pedido.estado}
                        onChange={(e) => handleCambiarEstado(pedido.id, e.target.value)}
                        disabled={updatingPedidoId === pedido.id}
                      >
                        <option value="PENDIENTE">PENDIENTE</option>
                        <option value="POR_ENTREGAR">POR ENTREGAR</option>
                        <option value="ENTREGADO">ENTREGADO</option>
                        <option value="CANCELADO">CANCELADO</option>
                      </select>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modales de Detalle */}
      {pedidosFiltrados.map((pedido) => (
        <div
          key={pedido.id}
          className="modal fade"
          id={`detallePedido${pedido.id}`}
          tabIndex="-1"
          aria-labelledby={`detallePedidoLabel${pedido.id}`}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`detallePedidoLabel${pedido.id}`}>
                  Detalle del Pedido #{pedido.id}
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Cliente:</strong> {pedido.nombreUsuario || `Usuario #${pedido.usuarioId}`}
                  </div>
                  <div className="col-md-6">
                    <strong>Email:</strong> {pedido.emailUsuario || 'N/A'}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Fecha:</strong> {formatearFecha(pedido.fechaCreacion)}
                  </div>
                  <div className="col-md-6">
                    <strong>Estado:</strong>{' '}
                    <span className={`badge ${obtenerBadgeEstado(pedido.estado)}`}>
                      {pedido.estado}
                    </span>
                  </div>
                </div>
                <hr />
                <h6>Productos:</h6>
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio Unitario</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(pedido.detalles || pedido.items || []).map((item, index) => (
                      <tr key={index}>
                        <td>{item.nombreProducto || `Producto #${item.productoId}`}</td>
                        <td>{item.cantidad}</td>
                        <td>{formatearPrecio(item.precioUnitario || item.precio || 0)}</td>
                        <td>{formatearPrecio((item.precioUnitario || item.precio || 0) * item.cantidad)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                      <td><strong>{formatearPrecio(calcularTotalPedido(pedido))}</strong></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AdminPedidos
