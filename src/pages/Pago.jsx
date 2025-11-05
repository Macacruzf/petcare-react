// src/pages/Pago.jsx
import { useCart } from '../providers/CartContext.jsx'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import logo from '../assets/placeholder/logo.png'

export default function Pago() {
  const { items, formattedTotal, clearCart } = useCart()
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    tarjeta: '',
  })
  const [validated, setValidated] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget

    if (!form.checkValidity()) {
      e.stopPropagation()
    } else {
      clearCart()
      navigate('/gracias')
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

            <button type="submit" className="btn btn-success w-100">
              Confirmar pago ({formattedTotal})
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
