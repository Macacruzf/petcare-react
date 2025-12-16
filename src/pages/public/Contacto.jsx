// src/pages/public/Contacto.jsx
import { useState } from 'react'
import logo from '../../assets/images/logo.png'
import { useForm } from '../../hooks'

export default function Contacto() {
  const [validated, setValidated] = useState(false)
  const [sent, setSent] = useState(false)

  // Hook personalizado useForm
  const { values, handleChange, handleSubmit, reset } = useForm(
    { nombre: '', correo: '', mensaje: '' },
    async () => {
      // Guardar mensaje en localStorage
      const mensajes = JSON.parse(localStorage.getItem('mensajesContacto') || '[]')
      const nuevoMensaje = {
        id: Date.now(),
        nombre: values.nombre,
        correo: values.correo,
        mensaje: values.mensaje,
        fecha: new Date().toISOString(),
        leido: false
      }
      mensajes.unshift(nuevoMensaje)
      localStorage.setItem('mensajesContacto', JSON.stringify(mensajes))
      
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
    setValidated(false)
  }

  return (
    <div className="container py-5">
      {/* Header con logo */}
      <div className="text-center mb-4">
        <img
          src={logo}
          alt="PetCare Logo"
          className="img-fluid mb-3"
          style={{ maxWidth: '120px' }}
        />
        <h2 className="fw-bold text-success mb-2">Contáctanos</h2>
        <p className="text-muted">Estamos aquí para ayudarte con cualquier duda o solicitud</p>
      </div>

      {/* Formulario */}
      <div className="row justify-content-center mb-4">
        <div className="col-12 col-lg-10 col-xl-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-success text-white py-3">
              <h5 className="mb-0">
                <i className="bi bi-envelope-fill me-2"></i>
                Formulario de Contacto
              </h5>
            </div>
            <div className="card-body p-4">
              {sent && (
                <div className="alert alert-success text-center mb-3" role="alert">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  ¡Gracias por tu mensaje! Te responderemos pronto.
                </div>
              )}

              <form
                className={`needs-validation ${validated ? 'was-validated' : ''}`}
                noValidate
                onSubmit={onSubmit}
              >
                <div className="row">
                  {/* Nombre */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold text-success">
                      <i className="bi bi-person-fill me-2"></i>
                      Nombre:
                    </label>
                    <input
                      name="nombre"
                      type="text"
                      className="form-control"
                      placeholder="Ingresa tu nombre completo"
                      value={values.nombre}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">Por favor, ingresa tu nombre.</div>
                  </div>

                  {/* Correo */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold text-success">
                      <i className="bi bi-envelope-fill me-2"></i>
                      Correo:
                    </label>
                    <input
                      name="correo"
                      type="email"
                      className="form-control"
                      placeholder="tu@email.com"
                      value={values.correo}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">Ingresa un correo válido.</div>
                  </div>

                  {/* Mensaje */}
                  <div className="col-12 mb-3">
                    <label className="form-label fw-semibold text-success">
                      <i className="bi bi-chat-left-text-fill me-2"></i>
                      Mensaje:
                    </label>
                    <textarea
                      name="mensaje"
                      className="form-control"
                      rows="6"
                      placeholder="Escribe tu mensaje aquí..."
                      value={values.mensaje}
                      onChange={handleChange}
                      required
                    ></textarea>
                    <div className="invalid-feedback">Escribe un mensaje.</div>
                  </div>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-success py-2">
                    <i className="bi bi-send-fill me-2"></i>
                    Enviar Mensaje
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
