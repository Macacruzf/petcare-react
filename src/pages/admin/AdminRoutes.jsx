import { Routes, Route, NavLink } from 'react-router-dom'
import AdminHome from './AdminHome.jsx'
import AdminProductos from './AdminProductos.jsx'
import AdminUsuarios from './AdminUsuarios.jsx'
import FormProducto from './FormProducto.jsx'
import FormUsuario from './FormUsuario.jsx'

export default function AdminRoutes(){
  return (
    <div className="container">
      <div className="d-flex gap-2 mb-3">
        <NavLink className="btn btn-outline-secondary" to="">Inicio</NavLink>
        <NavLink className="btn btn-outline-secondary" to="productos">Productos</NavLink>
        <NavLink className="btn btn-outline-secondary" to="usuarios">Usuarios</NavLink>
      </div>
      <Routes>
        <Route index element={<AdminHome />} />
        <Route path="productos" element={<AdminProductos />} />
        <Route path="productos/nuevo" element={<FormProducto />} />
        <Route path="productos/:id" element={<FormProducto />} />
        <Route path="usuarios" element={<AdminUsuarios />} />
        <Route path="usuarios/nuevo" element={<FormUsuario />} />
        <Route path="usuarios/:id" element={<FormUsuario />} />
      </Routes>
    </div>
  )
}
