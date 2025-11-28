// src/pages/shop/MisPedidos.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { obtenerMisPedidos } from '../../services/pedidosService';
import { Link } from 'react-router-dom';

export default function MisPedidos() {
  const { usuario } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarPedidos = async () => {
      try {
        setLoading(true);
        const data = await obtenerMisPedidos();
        setPedidos(data);
      } catch (err) {
        setError('Error al cargar pedidos: ' + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (usuario) {
      cargarPedidos();
    }
  }, [usuario]);

  // Función para formatear fecha
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Función para obtener badge de estado
  const obtenerBadgeEstado = (estado) => {
    const badges = {
      PENDIENTE: 'bg-warning text-dark',
      CONFIRMADO: 'bg-info',
      ENVIADO: 'bg-primary',
      ENTREGADO: 'bg-success',
      CANCELADO: 'bg-danger',
      POR_ENTREGAR: 'bg-primary'
    };
    return badges[estado] || 'bg-secondary';
  };

  // Formatear precio en pesos chilenos
  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(precio);
  };

  if (!usuario) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning">
          <i className="fa-solid fa-circle-exclamation me-2"></i>
          Debes <Link to="/login" className="alert-link">iniciar sesión</Link> para ver tu historial de pedidos.
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="text-muted mt-3">Cargando tus pedidos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          <i className="fa-solid fa-triangle-exclamation me-2"></i>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-success">
          <i className="fa-solid fa-box me-2"></i>
          Mis Pedidos
        </h2>
        <span className="badge bg-success fs-6">
          {pedidos.length} pedido{pedidos.length !== 1 ? 's' : ''}
        </span>
      </div>

      {pedidos.length === 0 ? (
        <div className="text-center py-5">
          <i className="fa-solid fa-box-open fa-4x text-muted mb-3"></i>
          <h4 className="text-muted">No tienes pedidos aún</h4>
          <p className="text-muted">¡Empieza a comprar y tus pedidos aparecerán aquí!</p>
          <Link to="/productos" className="btn btn-success mt-3">
            <i className="fa-solid fa-shopping-bag me-2"></i>
            Ver Productos
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="col-12">
              <div className="card shadow-sm h-100">
                <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
                  <div>
                    <i className="fa-solid fa-receipt me-2"></i>
                    <strong>Pedido #{pedido.id}</strong>
                  </div>
                  <span className={`badge ${obtenerBadgeEstado(pedido.estado)}`}>
                    {pedido.estado}
                  </span>
                </div>

                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <p className="mb-1">
                        <i className="fa-solid fa-calendar me-2 text-success"></i>
                        <strong>Fecha:</strong> {formatearFecha(pedido.fechaCreacion)}
                      </p>
                      <p className="mb-1">
                        <i className="fa-solid fa-user me-2 text-success"></i>
                        <strong>Cliente:</strong> {pedido.nombreUsuario}
                      </p>
                    </div>
                    <div className="col-md-6 text-md-end">
                      <p className="mb-1">
                        <i className="fa-solid fa-envelope me-2 text-success"></i>
                        <strong>Email:</strong> {pedido.emailUsuario}
                      </p>
                      <p className="mb-1">
                        <i className="fa-solid fa-box me-2 text-success"></i>
                        <strong>Productos:</strong> {(pedido.detalles || pedido.items)?.length || 0}
                      </p>
                    </div>
                  </div>

                  {/* Detalles de productos */}
                  {((pedido.detalles || pedido.items)?.length > 0) && (
                    <div className="table-responsive">
                      <table className="table table-sm table-hover">
                        <thead className="table-light">
                          <tr>
                            <th>Producto</th>
                            <th className="text-center">Cantidad</th>
                            <th className="text-end">Precio Unit.</th>
                            <th className="text-end">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(pedido.detalles || pedido.items || []).map((item, index) => (
                            <tr key={index}>
                              <td>{item.nombreProducto || `Producto #${item.productoId}`}</td>
                              <td className="text-center">{item.cantidad}</td>
                              <td className="text-end">{formatearPrecio(item.precioUnitario || item.precio)}</td>
                              <td className="text-end fw-bold">{formatearPrecio(item.subtotal || (item.cantidad * (item.precioUnitario || item.precio)))}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Total */}
                  <div className="d-flex justify-content-end mt-3 pt-3 border-top">
                    <h5 className="mb-0">
                      <span className="text-muted me-2">Total:</span>
                      <span className="text-success fw-bold">{formatearPrecio(pedido.total)}</span>
                    </h5>
                  </div>
                </div>

                <div className="card-footer bg-light text-muted small">
                  <i className="fa-solid fa-info-circle me-1"></i>
                  {pedido.estado === 'ENTREGADO' && 'Tu pedido ha sido entregado exitosamente'}
                  {pedido.estado === 'ENVIADO' && 'Tu pedido está en camino'}
                  {pedido.estado === 'POR_ENTREGAR' && 'Tu pedido está en camino'}
                  {pedido.estado === 'CONFIRMADO' && 'Tu pedido está siendo preparado'}
                  {pedido.estado === 'PENDIENTE' && 'Tu pedido está pendiente de confirmación'}
                  {pedido.estado === 'CANCELADO' && 'Este pedido fue cancelado'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
