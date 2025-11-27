// src/pages/shop/Checkout.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext.jsx'

export default function Checkout() {
  const { items, formattedTotal, clearCart } = useCart()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    metodoPago: 'transferencia'
  })

  const [error, setError] = useState('')

  // Manejar cambios de input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  //  Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validación simple
    if (!formData.nombre || !formData.direccion || !formData.telefono) {
      setError('Por favor completa todos los campos.')
      return
    }

    // Simular resultado aleatorio (éxito o error)
    const exito = Math.random() > 0.2 // 80% de éxito
    if (exito) {
      clearCart()
      navigate('/compra-exitosa')
    } else {
      navigate('/compra-error')
    }
  }

  //  Si no hay productos en el carrito
  if (items.length === 0) {
    return (
      <div className="container text-center py-5">
        <p className="mb-3">Tu carrito está vacío 🛒</p>
        <button className="btn btn-success" onClick={() => navigate('/productos')}>
          Volver a productos
        </button>
      </div>
    )
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-success fw-bold">Finalizar Compra</h2>

      <div className="row g-4">
        {/*  Formulario de envío */}
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="card shadow-sm p-4">
            <h5 className="mb-3 text-success">Datos de Envío</h5>

            {error && <p className="text-danger small">{error}</p>}

            <div className="mb-3">
              <label className="form-label">Nombre completo</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Dirección</label>
              <input
                type="text"
                className="form-control"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input
                type="text"
                className="form-control"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Método de pago</label>
              <select
                className="form-select"
                name="metodoPago"
                value={formData.metodoPago}
                onChange={handleChange}
              >
                <option value="transferencia">Transferencia Bancaria</option>
                <option value="debito">Tarjeta de Débito</option>
                <option value="credito">Tarjeta de Crédito</option>
              </select>
            </div>

            <button type="submit" className="btn btn-success w-100">
              Confirmar compra
            </button>
          </form>
        </div>

        {/*  Resumen del pedido */}
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h5 className="mb-3 text-success">Resumen de tu compra</h5>
            <ul className="list-group mb-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    {item.nombre} x{item.qty}
                  </span>
                  <span>
                    {new Intl.NumberFormat('es-CL', {
                      style: 'currency',
                      currency: 'CLP'
                    }).format(item.precio * item.qty)}
                  </span>
                </li>
              ))}
            </ul>
            <h5 className="text-end fw-bold">
              Total: {formattedTotal}
            </h5>
          </div>
        </div>
      </div>
    </div>
  )
}
