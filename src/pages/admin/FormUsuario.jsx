// src/pages/admin/FormUsuario.jsx
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function FormUsuario() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'cliente'
  })

  // 🔹 Cargar usuario si se está editando
  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem('usuarios')) || []
    if (isEdit) {
      const encontrado = guardados.find((u) => u.id === Number(id))
      if (encontrado) setUsuario(encontrado)
    }
  }, [id, isEdit])

  // 🔹 Actualizar campos
  const handleChange = (e) => {
    const { name, value } = e.target
    setUsuario({ ...usuario, [name]: value })
  }

  // 🔹 Guardar cambios
  const onSubmit = (e) => {
    e.preventDefault()
    const guardados = JSON.parse(localStorage.getItem('usuarios')) || []

    if (isEdit) {
      // Actualizar usuario existente
      const actualizados = guardados.map((u) =>
        u.id === Number(id) ? { ...usuario, id: Number(id) } : u
      )
      localStorage.setItem('usuarios', JSON.stringify(actualizados))
      alert(' Usuario actualizado correctamente')
    } else {
      // Crear nuevo usuario
      const nuevo = {
        ...usuario,
        id: guardados.length > 0 ? guardados[guardados.length - 1].id + 1 : 1
      }
      const nuevos = [...guardados, nuevo]
      localStorage.setItem('usuarios', JSON.stringify(nuevos))
      alert(' Usuario creado correctamente')
    }

    navigate('/admin/usuarios')
  }

  return (
    <div className="container py-3" style={{ maxWidth: 640 }}>
      <form onSubmit={onSubmit} className="card card-body shadow-sm">
        <h3 className="mb-3 fw-bold">
          {isEdit ? 'Editar usuario' : 'Nuevo usuario'}
        </h3>

        {/* Nombre */}
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            className="form-control"
            name="nombre"
            value={usuario.nombre}
            onChange={handleChange}
            required
          />
        </div>

        {/* Correo */}
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={usuario.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Contraseña */}
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={usuario.password}
            onChange={handleChange}
            required={!isEdit} // solo obligatoria si es nuevo
            placeholder={isEdit ? '••••••••' : ''}
          />
        </div>

        {/* Rol */}
        <div className="mb-3">
          <label className="form-label">Rol</label>
          <select
            className="form-select"
            name="rol"
            value={usuario.rol}
            onChange={handleChange}
          >
            <option value="cliente">Cliente</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </form>
    </div>
  )
}
