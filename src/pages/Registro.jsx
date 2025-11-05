import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Registro() {
  const [formData, setFormData] = useState({ nombre: '', correo: '', password: '' })
  const [validated, setValidated] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget

    if (!form.checkValidity()) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    // 🔹 Simulación de registro exitoso (rol cliente)
    const nuevoUsuario = {
      nombre: formData.nombre.trim(),
      email: formData.correo.trim(),
      password: formData.password.trim(),
      rol: 'cliente'
    }

    localStorage.setItem('usuario', JSON.stringify(nuevoUsuario))
    setSuccess(true)

    // Redirigir al login después de 2 segundos
    setTimeout(() => navigate('/login'), 2000)
  }

  return (
    <div className="container py-5" style={{ maxWidth: 480 }}>
      {/* Encabezado con logo */}
      <div className="text-center mb-4">
        <img
          src="/src/assets/placeholder/logo.png"
          alt="PetCare Logo"
          className="img-fluid mb-2"
          style={{ maxWidth: '120px' }}
        />
        <h2 className="fw-bold text-success">Crear cuenta</h2>
      </div>

      {/* Formulario */}
      <form
        className={`card card-body shadow-sm needs-validation ${validated ? 'was-validated' : ''}`}
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">Por favor, ingresa tu nombre.</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input
            type="email"
            name="correo"
            className="form-control"
            value={formData.correo}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">Ingresa un correo válido.</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="4"
          />
          <div className="invalid-feedback">
            La contraseña debe tener al menos 4 caracteres.
          </div>
        </div>

        {success && (
          <div className="alert alert-success small py-2 text-center">
            ¡Registro exitoso! Redirigiendo al inicio de sesión...
          </div>
        )}

        <button type="submit" className="btn btn-success w-100">
          Crear cuenta
        </button>

        <p className="text-center mt-3 small">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </div>
  )
}
