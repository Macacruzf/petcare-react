// src/pages/shop/Pago.jsx
import { useCart } from '../../contexts/CartContext.jsx'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import logo from '../../assets/images/logo.png'
import { crearPedidoActual } from '../../services/pedidosService'

export default function Pago() {
  const { items, formattedTotal, clearCart } = useCart()
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    tarjeta: '',
  })
  const [validated, setValidated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget

    if (!form.checkValidity()) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    // Verificar que el usuario esté autenticado
    const userId = localStorage.getItem('userId')
    if (!userId) {
      setError('Debes iniciar sesión para completar la compra')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Sincronizar carrito de localStorage con el backend antes de crear el pedido
      const { agregarItemCarritoActual, vaciarCarritoActual } = await import('../../services/carritoService')
      
      // Vaciar el carrito del backend
      try {
        await vaciarCarritoActual()
      } catch (err) {
        console.warn('Advertencia: No se pudo vaciar el carrito remoto (posiblemente no existía). Continuando...', err)
      }
      
      // Agregar cada item del localStorage al backend
      for (const item of items) {
        await agregarItemCarritoActual(item.id, item.qty)
      }

      // Crear pedido desde el carrito del usuario en la base de datos
      await crearPedidoActual(formData)
      
      // Limpiar carrito local y navegar
      clearCart()
      navigate('/gracias')
    } catch (err) {
      console.error('Error al procesar el pago:', err)
      setError(err.message || 'Error al procesar el pago. Intenta nuevamente.')
      setLoading(false)
    }

    setValidated(true)
  }

  if (items.length === 0) {
    return (
      <div className="container text-center py-5">
        <h4 className="text-muted">Tu carrito está vacío 🛒</h4>
      </div>
    )
  }

  return (
    <div className="container py-4">
      {/*  Logo PetCare */}
      <div className="text-center mb-4">
        <img
          src={logo}
          alt="PetCare Logo"
          className="img-fluid"
          style={{ maxWidth: '120px' }}
        />
      </div>

      <h2 className="fw-bold mb-4 text-center text-success">Pago Seguro</h2>

      <div className="row g-4">
        {/*  Formulario de pago */}
        <div className="col-md-7">
          <form
            noValidate
            onSubmit={handleSubmit}
            className={`card card-body shadow-sm needs-validation ${
              validated ? 'was-validated' : ''
            }`}
          >
            <h5 className="mb-3 text-success">Datos de Envío y Pago</h5>

            <div className="mb-3">
              <label className="form-label">Nombre completo</label>
              <input
                name="nombre"
                className="form-control"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">
                Por favor, ingresa tu nombre.
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Dirección</label>
              <input
                name="direccion"
                className="form-control"
                value={formData.direccion}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">
                Por favor, ingresa tu dirección.
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Número de tarjeta</label>
              <input
                name="tarjeta"
                className="form-control"
                placeholder="**** **** **** 1234"
                value={formData.tarjeta}
                onChange={handleChange}
                required
                pattern="^[0-9\s]{13,19}$"
              />
              <div className="invalid-feedback">
                Ingresa un número de tarjeta válido.
              </div>
            </div>

            {error && (
              <div className="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-success w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Procesando pago...
                </>
              ) : (
                `Confirmar pago (${formattedTotal})`
              )}
            </button>
          </form>
        </div>

        {/*  Resumen del pedido */}
        <div className="col-md-5">
          <div className="card card-body shadow-sm">
            <h5 className="mb-3 text-success">Resumen del Pedido</h5>
            <ul className="list-group list-group-flush">
              {items.map((i) => (
                <li
                  key={i.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={i.imagen}
                      alt={i.nombre}
                      className="rounded me-3"
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                      }}
                    />
                    <span>
                      {i.nombre} x{i.qty}
                    </span>
                  </div>
                  <span>
                    {new Intl.NumberFormat('es-CL', {
                      style: 'currency',
                      currency: 'CLP',
                    }).format(i.qty * i.precio)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="pt-3 text-end">
              <strong>Total: {formattedTotal}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
