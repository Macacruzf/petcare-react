// src/pages/admin/AdminProductos.jsx
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { obtenerTodosProductos, eliminarProducto } from '../../services/productosService'

export default function AdminProductos() {
  const navigate = useNavigate()
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Cargar productos desde el microservicio
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true)
        const data = await obtenerTodosProductos()
        setProductos(data)
      } catch (err) {
        setError('Error al cargar productos: ' + err.message)
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    cargarProductos()
  }, [])

  // Eliminar producto
  const handleEliminarProducto = async (id) => {
    if (confirm('¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer.')) {
      try {
        await eliminarProducto(id)
        // Actualizar la lista de productos
        setProductos(productos.filter(p => p.id !== id))
        alert('Producto eliminado exitosamente')
      } catch (err) {
        console.error('Error al eliminar producto:', err)
        alert('Error al eliminar el producto: ' + err.message)
      }
    }
  }

  return (
    <div className="container py-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold">Productos</h3>
        <Link to="nuevo" className="btn btn-primary">
          <i className="fa-solid fa-plus me-1"></i> Nuevo producto
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="text-muted mt-2">Cargando productos...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : productos.length === 0 ? (
        <p className="text-muted">No hay productos registrados.</p>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle table-striped">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>${p.precio.toLocaleString('es-CL')}</td>
                  <td>{p.categoria?.nombre}</td>
                  <td>{p.stock} unidades</td>
                  <td className="text-end">
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => navigate(String(p.id))}
                      >
                        <i className="fa-solid fa-pen me-1"></i>
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleEliminarProducto(p.id)}
                      >
                        <i className="fa-solid fa-trash me-1"></i>
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
