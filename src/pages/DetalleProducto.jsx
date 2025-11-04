// src/pages/DetalleProducto.jsx
import { useParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts.js'
import { useCart } from '../providers/CartContext.jsx'
import { useState } from 'react'

export default function DetalleProducto() {
  const { id } = useParams()
  const { products, loading } = useProducts()
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3 text-muted">Cargando producto...</p>
      </div>
    )
  }

  const product = products.find(p => String(p.id) === String(id))
  if (!product) {
    return (
      <div className="container text-center py-5">
        <h4 className="text-danger">Producto no encontrado</h4>
        <p className="text-muted">El producto que buscas no existe o fue removido.</p>
      </div>
    )
  }

  const formatPrice = (value) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value)

  return (
    <div className="container py-5">
      <div className="card border-0 shadow-sm p-4 product-detail">
        <div className="row g-4 align-items-center">
          
          {/* Imagen del producto */}
          <div className="col-md-5 text-center">
            <img
              src={product.image || '/placeholder.png'}
              alt={product.name}
              className="img-fluid rounded"
              style={{
                maxHeight: '380px',
                objectFit: 'contain',
                backgroundColor: '#fff',
                padding: '10px'
              }}
            />
          </div>

          {/* Información del producto */}
          <div className="col-md-7">
            <h2 className="fw-bold mb-3 text-success">{product.name}</h2>
            <p className="text-muted mb-4">{product.description}</p>

            <h4 className="fw-bold mb-4 text-success">{formatPrice(product.price)}</h4>

            {/* Selector de cantidad y botón */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="d-flex align-items-center">
                <label htmlFor="qty" className="me-2 fw-semibold">Cantidad:</label>
                <input
                  id="qty"
                  type="number"
                  min="1"
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                  className="form-control"
                  style={{ width: '80px', textAlign: 'center' }}
                />
              </div>

              <button
                className="btn btn-success btn-sm px-4 py-2"
                onClick={() => addItem(product, qty)}
              >
                <i className="bi bi-cart-plus me-1"></i> Agregar
              </button>
            </div>

            {/* Detalle adicional */}
            {product.details && (
              <div className="mt-4">
                <h6 className="fw-bold">Detalles adicionales</h6>
                <p>{product.details}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
