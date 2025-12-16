// src/pages/admin/FormProducto.jsx
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { 
  obtenerProductoPorId, 
  crearProducto, 
  actualizarProducto 
} from '../../services/productosService'

export default function FormProducto() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    categoriaId: '',
    stock: '',
    imagen: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Categorías disponibles (corresponden a la BD)
  const categorias = [
    { id: 1, nombre: 'Accesorios' },
    { id: 2, nombre: 'Juguetes' },
    { id: 3, nombre: 'Alimentos' },
    { id: 4, nombre: 'Higiene' }
  ]

  // Cargar datos si es edición
  useEffect(() => {
    if (isEdit) {
      const cargarProducto = async () => {
        try {
          setLoading(true)
          const data = await obtenerProductoPorId(Number(id))
          setProducto({
            nombre: data.nombre,
            precio: data.precio,
            descripcion: data.descripcion || '',
            categoriaId: data.categoria.id,
            stock: data.stock,
            imagen: data.imagen || ''
          })
        } catch (err) {
          setError('Error al cargar el producto: ' + err.message)
          console.error(err)
        } finally {
          setLoading(false)
        }
      }
      cargarProducto()
    }
  }, [id, isEdit])

  // Manejar cambios en los campos
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setProducto({
      ...producto,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  // Guardar producto (crear o editar)
  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const productoData = {
        nombre: producto.nombre,
        precio: Number(producto.precio),
        descripcion: producto.descripcion,
        categoriaId: Number(producto.categoriaId),
        stock: Number(producto.stock),
        imagen: producto.imagen
      }

      if (isEdit) {
        // Actualizar producto existente
        await actualizarProducto(Number(id), productoData)
        alert('✅ Producto actualizado correctamente')
      } else {
        // Crear nuevo producto
        await crearProducto(productoData)
        alert('✅ Producto creado correctamente')
      }

      navigate('/admin/productos')
    } catch (err) {
      setError('Error al guardar el producto: ' + err.message)
      console.error(err)
      setLoading(false)
    }
  }

  if (loading && isEdit) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-3" style={{ maxWidth: 640 }}>
      <form onSubmit={onSubmit} className="card card-body shadow-sm">
        <h3 className="mb-3 fw-bold">
          {isEdit ? 'Editar producto' : 'Nuevo producto'}
        </h3>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

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
            name="categoriaId"
            value={producto.categoriaId}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Stock */}
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            type="number"
            className="form-control"
            name="stock"
            value={producto.stock}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        {/* Imagen */}
        <div className="mb-3">
          <label className="form-label">URL de imagen</label>
          <input
            className="form-control"
            name="imagen"
            value={producto.imagen}
            onChange={handleChange}
            placeholder="/arnes.jpg"
          />
          <small className="form-text text-muted">
            Ejemplo: /arnes.jpg (archivo debe estar en la carpeta public/)
          </small>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Guardando...
            </>
          ) : (
            'Guardar'
          )}
        </button>
      </form>
    </div>
  )
}
