// src/pages/Login.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [formData, setFormData] = useState({ correo: '', password: '' })
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState('')
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

    // 🔹 Simulación de inicio de sesión
    if (formData.correo === 'admin@petcare.cl' && formData.password === '1234') {
      localStorage.setItem('isLoggedIn', 'true')
      navigate('/admin')
    } else {
      setError('Correo o contraseña incorrectos.')
    }

    setValidated(true)
  }

  return (
    <div className="container py-5" style={{ maxWidth: 480 }}>
      <div className="text-center mb-4">
        <img
          src="/placeholder/logo.png"
          alt="PetCare Logo"
          className="img-fluid mb-2"
          style={{ maxWidth: '120px' }}
        />
        <h2 className="fw-bold">Iniciar Sesión</h2>
      </div>

      <form
        className={`card card-body shadow-sm needs-validation ${validated ? 'was-validated' : ''}`}
        noValidate
        onSubmit={handleSubmit}
      >
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
          <div className="invalid-feedback">La contraseña debe tener al menos 4 caracteres.</div>
        </div>

        {error && <div className="alert alert-danger small py-2">{error}</div>}

        <button type="submit" className="btn btn-primary w-100">Ingresar</button>

        <p className="text-center mt-3 small">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
        </p>
      </form>
    </div>
  )
}
