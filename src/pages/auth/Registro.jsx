import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registrarUsuario } from '../../services/usuarioService'
import ojo from '../../assets/images/ojo.png'

export default function Registro() {
  const [formData, setFormData] = useState({ 
    nombre: '', 
    apellido: '',
    email: '', 
    password: '',
    confirmarPassword: '',
    direccion: '',
    telefono: ''
  })
  const [validated, setValidated] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [mostrarConfirmarPassword, setMostrarConfirmarPassword] = useState(false)
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

    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmarPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Registrar usuario en el microservicio
      await registrarUsuario({
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        username: formData.nombre.trim(), // Usar el email como username
        email: formData.email.trim(),
        password: formData.password.trim(),
        direccion: formData.direccion.trim(),
        telefono: formData.telefono.trim(),
        rol: 'CLIENTE'
      })

      setSuccess(true)
      
      // Redirigir al login después de 2 segundos
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      console.error('Error en registro:', err)
      setError(err.message || 'Error al registrar usuario. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5" style={{ maxWidth: 480 }}>
      {/* Encabezado con logo */}
      <div className="text-center mb-4">
        <img
          src="/src/assets/images/logo.png"
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
          <label className="form-label">Apellido</label>
          <input
            type="text"
            name="apellido"
            className="form-control"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">Por favor, ingresa tu apellido.</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">Ingresa un correo válido.</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="tel"
            name="telefono"
            className="form-control"
            value={formData.telefono}
            onChange={handleChange}
            required
            pattern="[0-9]{9,15}"
          />
          <div className="invalid-feedback">Ingresa un teléfono válido (9-15 dígitos).</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            name="direccion"
            className="form-control"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">Por favor, ingresa tu dirección.</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <div className="input-group">
            <input
              type={mostrarPassword ? "text" : "password"}
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => setMostrarPassword(!mostrarPassword)}
            >
              <img src={ojo} alt="Ver contraseña" style={{ width: '20px', height: '20px', opacity: mostrarPassword ? 0.5 : 1 }} />
            </button>
          </div>
          <div className="invalid-feedback">
            La contraseña debe tener al menos 6 caracteres.
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Confirmar Contraseña</label>
          <div className="input-group">
            <input
              type={mostrarConfirmarPassword ? "text" : "password"}
              name="confirmarPassword"
              className="form-control"
              value={formData.confirmarPassword}
              onChange={handleChange}
              required
              minLength="6"
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => setMostrarConfirmarPassword(!mostrarConfirmarPassword)}
            >
              <img src={ojo} alt="Ver contraseña" style={{ width: '20px', height: '20px', opacity: mostrarConfirmarPassword ? 0.5 : 1 }} />
            </button>
          </div>
          <div className="invalid-feedback">
            Confirma tu contraseña.
          </div>
        </div>

        {error && (
          <div className="alert alert-danger small py-2 text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success small py-2 text-center">
            ¡Registro exitoso! Redirigiendo al inicio de sesión...
          </div>
        )}

        <button type="submit" className="btn btn-success w-100" disabled={loading}>
          {loading ? 'Registrando...' : 'Crear cuenta'}
        </button>

        <p className="text-center mt-3 small">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </div>
  )
}
