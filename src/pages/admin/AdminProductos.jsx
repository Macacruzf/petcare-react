// src/pages/admin/AdminProductos.jsx
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { productos as dataInicial } from '../../data/data.js'
import { useLocalStorage } from '../../hooks'

export default function AdminProductos() {
  const navigate = useNavigate()
  
  // 🎣 Hook personalizado useLocalStorage
  const [productos, setProductos] = useLocalStorage('productos', dataInicial)

  // 🔹 Eliminar producto
  const eliminarProducto = (id) => {
    if (confirm('¿Deseas eliminar este producto?')) {
      const nuevos = productos.filter((p) => p.id !== id)
      setProductos(nuevos)
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

      {productos.length === 0 ? (
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
                <th>Oferta</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>${p.precio.toLocaleString('es-CL')}</td>
                  <td>{p.categoria}</td>
                  <td>{p.oferta ? 'Sí' : 'No'}</td>
                  <td className="text-end">
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => eliminarProducto(p.id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => navigate(String(p.id))}
                      >
                        <i className="fa-solid fa-pen"></i>
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
