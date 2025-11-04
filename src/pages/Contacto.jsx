// src/pages/Contacto.jsx
import { useState } from 'react'

export default function Contacto() {
  const [formData, setFormData] = useState({ nombre: '', correo: '', mensaje: '' })
  const [validated, setValidated] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) {
      e.stopPropagation()
    } else {
      setSent(true)
      setFormData({ nombre: '', correo: '', mensaje: '' })
    }
    setValidated(true)
  }

  return (
    <div className="container container-narrow py-4">
      {/* 🔹 Logo de la tienda */}
      <div className="text-center mb-4">
        <img
          src="/placeholder/logo.png"
          alt="PetCare Logo"
          className="img-fluid"
          style={{ maxWidth: '140px' }}
        />
        <h2 className="mt-3">Contáctanos</h2>
      </div>

      {sent ? (
        <div className="alert alert-success text-center" role="alert">
          ¡Gracias por tu mensaje! Te responderemos pronto.
        </div>
      ) : (
        <form
          className={`card card-body shadow-sm needs-validation ${validated ? 'was-validated' : ''}`}
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Nombre</label>
              <input
                name="nombre"
                type="text"
                className="form-control"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Por favor, ingresa tu nombre.</div>
            </div>

            <div className="col-md-6">
              <label className="form-label">Correo</label>
              <input
                name="correo"
                type="email"
                className="form-control"
                value={formData.correo}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Ingresa un correo válido.</div>
            </div>

            <div className="col-12">
              <label className="form-label">Mensaje</label>
              <textarea
                name="mensaje"
                className="form-control"
                rows="4"
                value={formData.mensaje}
                onChange={handleChange}
                required
              ></textarea>
              <div className="invalid-feedback">Escribe un mensaje.</div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-3 align-self-start">
            Enviar
          </button>
        </form>
      )}
    </div>
  )
}
