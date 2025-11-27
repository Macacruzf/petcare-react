// src/pages/auth/Login.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usuarios } from '../../data/usuarios'
import logo from '../../assets/images/logo.png'
import { useForm } from '../../hooks'

export default function Login() {
  const [validated, setValidated] = useState(false)
  const navigate = useNavigate()

  // 🎣 Hook personalizado useForm
  const { values, errors, handleChange, handleSubmit, setError } = useForm(
    { correo: '', password: '' },
    async (formValues) => {
      // Buscar usuario en la lista simulada
      const user = usuarios.find(
        (u) =>
          u.email === formValues.correo.trim() &&
          u.password === formValues.password.trim()
      )

      if (user) {
        localStorage.setItem('usuario', JSON.stringify(user))
        navigate(user.rol === 'admin' ? '/admin' : '/')
      } else {
        throw { errors: { general: 'Correo o contraseña incorrectos.' } }
      }
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
    <div className="container py-5" style={{ maxWidth: 480 }}>
      <div className="text-center mb-4">
        <img
          src={logo}
          alt="PetCare Logo"
          className="img-fluid mb-3"
          style={{ maxWidth: '120px' }}
        />
        <h2 className="fw-bold text-success">Iniciar Sesión</h2>
        <p className="text-muted small">
          Ingresa tus credenciales para acceder a tu cuenta 🐾
        </p>
      </div>

      <form
        className={`card card-body shadow-sm needs-validation ${
          validated ? 'was-validated' : ''
        }`}
        noValidate
        onSubmit={onSubmit}
      >
        <div className="mb-3">
          <label className="form-label fw-semibold">Correo</label>
          <input
            type="email"
            name="correo"
            className="form-control"
            value={values.correo}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">Ingresa un correo válido.</div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={values.password}
            onChange={handleChange}
            required
            minLength="4"
          />
          <div className="invalid-feedback">
            La contraseña debe tener al menos 4 caracteres.
          </div>
        </div>

        {errors.general && (
          <div className="alert alert-danger small py-2 text-center">
            {errors.general}
          </div>
        )}

        <button type="submit" className="btn btn-success w-100">
          Ingresar
        </button>

        <p className="text-center mt-3 small">
          ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
        </p>
      </form>
    </div>
  )
}
