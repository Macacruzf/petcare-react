// src/pages/admin/AdminHome.jsx
import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

export default function AdminHome() {
  const [productos, setProductos] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const { usuario } = useAuth()

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const { obtenerTodosProductos } = await import('../../services/productosService')
        const { obtenerTodosUsuarios } = await import('../../services/usuarioService')
        
        const [prods, users] = await Promise.all([
          obtenerTodosProductos(),
          obtenerTodosUsuarios()
        ])
        
        setProductos(prods)
        setUsuarios(users)
      } catch (err) {
        console.error('Error al cargar datos:', err)
      }
    }
    
    cargarDatos()
  }, [])

  return (
    <div className="container py-4">
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h3 className="fw-bold mb-3">Panel de Administración</h3>
          <p className="text-muted mb-4">
            Bienvenido{usuario ? `, ${usuario.nombre}` : ''}. Aquí puedes gestionar los productos,
            usuarios y revisar el estado general del sistema PetCare Connect.
          </p>

          {/* 🔹 Resumen rápido */}
          <div className="row text-center">
            <div className="col-md-4 mb-3">
              <div className="card bg-light shadow-sm border-0">
                <div className="card-body">
                  <i className="fa-solid fa-box fa-2x text-primary mb-2"></i>
                  <h5 className="fw-bold mb-0">{productos.length}</h5>
                  <small className="text-muted">Productos registrados</small>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card bg-light shadow-sm border-0">
                <div className="card-body">
                  <i className="fa-solid fa-users fa-2x text-success mb-2"></i>
                  <h5 className="fw-bold mb-0">{usuarios.length}</h5>
                  <small className="text-muted">Usuarios registrados</small>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card bg-light shadow-sm border-0">
                <div className="card-body">
                  <i className="fa-solid fa-lock fa-2x text-danger mb-2"></i>
                  <h5 className="fw-bold mb-0">
                    {usuario?.rol === 'ADMIN' ? 'Administrador' : 'Cliente'}
                  </h5>
                  <small className="text-muted">Rol actual</small>
                </div>
              </div>
            </div>
          </div>

          <hr />

          <p className="text-center text-muted small mt-3">
            © {new Date().getFullYear()} PetCare Connect – Panel de Control
          </p>
        </div>
      </div>
    </div>
  )
}
