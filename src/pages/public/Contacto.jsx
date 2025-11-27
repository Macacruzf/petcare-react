// src/pages/public/Contacto.jsx
import { useState } from 'react'
import logo from '../../assets/images/logo.png'
import { useForm } from '../../hooks'

export default function Contacto() {
  const [validated, setValidated] = useState(false)
  const [sent, setSent] = useState(false)

  // 🎣 Hook personalizado useForm
  const { values, handleChange, handleSubmit, reset } = useForm(
    { nombre: '', correo: '', mensaje: '' },
    async () => {
      // Simular envío exitoso
      setSent(true)
      reset()
      setTimeout(() => setSent(false), 5000)
    }
  )

  const onSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget

    if (!form.checkValidity()) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    handleSubmit(e)
    setValidated(true)
  }

  return (
    <div className="container container-narrow py-4">
      {/* 🔹 Logo de la tienda */}
      <div className="text-center mb-4">
        <img
          src={logo}
          alt="PetCare Logo"
          className="img-fluid mb-2"
          style={{ maxWidth: '140px' }}
        />
        <h2 className="fw-bold text-success">Contáctanos</h2>
        <p className="text-muted">Estamos aquí para ayudarte con cualquier duda o solicitud 🐾</p>
      </div>

      {sent ? (
        <div className="alert alert-success text-center" role="alert">
          ✅ ¡Gracias por tu mensaje! Te responderemos pronto.
        </div>
      ) : (
        <form
          className={`card card-body shadow-sm border-0 needs-validation ${
            validated ? 'was-validated' : ''
          }`}
          noValidate
          onSubmit={onSubmit}
        >
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Nombre</label>
              <input
                name="nombre"
                type="text"
                className="form-control"
                value={values.nombre}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Por favor, ingresa tu nombre.</div>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Correo</label>
              <input
                name="correo"
                type="email"
                className="form-control"
                value={values.correo}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Ingresa un correo válido.</div>
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold">Mensaje</label>
              <textarea
                name="mensaje"
                className="form-control"
                rows="4"
                value={values.mensaje}
                onChange={handleChange}
                required
              ></textarea>
              <div className="invalid-feedback">Escribe un mensaje.</div>
            </div>
          </div>

          <button type="submit" className="btn btn-success mt-3 align-self-start px-4">
            Enviar mensaje
          </button>
        </form>
      )}
    </div>
  )
}
