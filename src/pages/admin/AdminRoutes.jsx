// src/pages/admin/AdminRoutes.jsx
import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import AdminHome from './AdminHome.jsx'
import AdminProductos from './AdminProductos.jsx'
import AdminUsuarios from './AdminUsuarios.jsx'
import AdminPedidos from './AdminPedidos.jsx'
import AdminContactos from './AdminContactos.jsx'
import FormProducto from './FormProducto.jsx'
import FormUsuario from './FormUsuario.jsx'

export default function AdminRoutes() {
  const { usuario, esAdministrador } = useAuth()

  // Verificación de acceso
  if (!usuario) {
    // No ha iniciado sesión
    return <Navigate to="/login" />
  }

  if (!esAdministrador()) {
    // Es cliente o usuario común
    return <Navigate to="/" />
  }

  // Si es administrador, muestra las rutas internas
  return (
    <div className="container py-4">
      {/* 🔹 Barra de navegación interna del panel */}
      <div className="d-flex gap-2 mb-3">
        <NavLink
          end
          to="/admin"
          className={({ isActive }) =>
            `btn ${isActive ? 'btn-primary' : 'btn-outline-secondary'}`
          }
        >
          Inicio
        </NavLink>

        <NavLink
          to="/admin/productos"
          className={({ isActive }) =>
            `btn ${isActive ? 'btn-primary' : 'btn-outline-secondary'}`
          }
        >
          Productos
        </NavLink>

        <NavLink
          to="/admin/usuarios"
          className={({ isActive }) =>
            `btn ${isActive ? 'btn-primary' : 'btn-outline-secondary'}`
          }
        >
          Usuarios
        </NavLink>

        <NavLink
          to="/admin/pedidos"
          className={({ isActive }) =>
            `btn ${isActive ? 'btn-primary' : 'btn-outline-secondary'}`
          }
        >
          Pedidos
        </NavLink>

        <NavLink
          to="/admin/contactos"
          className={({ isActive }) =>
            `btn ${isActive ? 'btn-primary' : 'btn-outline-secondary'}`
          }
        >
          Contactos
        </NavLink>
      </div>

      {/* 🔹 Rutas internas del panel */}
      <Routes>
        <Route index element={<AdminHome />} />
        <Route path="productos" element={<AdminProductos />} />
        <Route path="productos/nuevo" element={<FormProducto />} />
        <Route path="productos/:id" element={<FormProducto />} />
        <Route path="usuarios" element={<AdminUsuarios />} />
        <Route path="usuarios/nuevo" element={<FormUsuario />} />
        <Route path="pedidos" element={<AdminPedidos />} />
        <Route path="contactos" element={<AdminContactos />} />
      </Routes>
    </div>
  )
}
