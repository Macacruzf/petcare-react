// src/pages/admin/FormProducto.jsx
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function FormProducto() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    categoria: '',
    oferta: false,
    imagen: ''
  })

  // 🔹 Cargar datos si es edición
  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem('productos')) || []
    if (isEdit) {
      const encontrado = guardados.find((p) => p.id === Number(id))
      if (encontrado) setProducto(encontrado)
    }
  }, [id, isEdit])

  // 🔹 Manejar cambios en los campos
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setProducto({
      ...producto,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  // 🔹 Guardar producto (crear o editar)
  const onSubmit = (e) => {
    e.preventDefault()
    const guardados = JSON.parse(localStorage.getItem('productos')) || []

    if (isEdit) {
      // Actualizar producto existente
      const actualizados = guardados.map((p) =>
        p.id === Number(id) ? { ...producto, id: Number(id) } : p
      )
      localStorage.setItem('productos', JSON.stringify(actualizados))
      alert('✅ Producto actualizado correctamente')
    } else {
      // Crear nuevo producto
      const nuevo = {
        ...producto,
        id: guardados.length > 0 ? guardados[guardados.length - 1].id + 1 : 1
      }
      const nuevos = [...guardados, nuevo]
      localStorage.setItem('productos', JSON.stringify(nuevos))
      alert('✅ Producto creado correctamente')
    }

    navigate('/admin/productos')
  }

  return (
    <div className="container py-3" style={{ maxWidth: 640 }}>
      <form onSubmit={onSubmit} className="card card-body shadow-sm">
        <h3 className="mb-3 fw-bold">
          {isEdit ? 'Editar producto' : 'Nuevo producto'}
        </h3>

        {/* Nombre */}
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            className="form-control"
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
            required
          />
        </div>

        {/* Precio */}
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            name="precio"
            value={producto.precio}
            onChange={handleChange}
            required
          />
        </div>

        {/* Descripción */}
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            name="descripcion"
            rows="3"
            value={producto.descripcion}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Categoría */}
        <div className="mb-3">
          <label className="form-label">Categoría</label>
          <select
            className="form-select"
            name="categoria"
            value={producto.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            <option value="Accesorios">Accesorios</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Higiene">Higiene</option>
            <option value="Juguetes">Juguetes</option>
          </select>
        </div>

        {/* Oferta */}
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="oferta"
            name="oferta"
            checked={producto.oferta}
            onChange={handleChange}
          />
          <label htmlFor="oferta" className="form-check-label">
            ¿Producto en oferta?
          </label>
        </div>

        {/* Imagen */}
        <div className="mb-3">
          <label className="form-label">URL de imagen</label>
          <input
            className="form-control"
            name="imagen"
            value={producto.imagen}
            onChange={handleChange}
            placeholder="/placeholder/imagen.jpg"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </form>
    </div>
  )
}
