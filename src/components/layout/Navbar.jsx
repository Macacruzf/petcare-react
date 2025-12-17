// src/components/layout/Navbar.jsx
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext.jsx'
import { useAuth } from '../../contexts/AuthContext'
import { useNotificaciones } from '../../hooks/useNotificaciones'
import logo from '../../assets/images/logo.png'

export default function Navbar() {
  const { count } = useCart()
  const navigate = useNavigate()
  
  // Obtener usuario y funciones del contexto de autenticación
  const { usuario, logout, esAdministrador } = useAuth()
  const isAdmin = esAdministrador()
  
  // Hook de notificaciones (siempre se llama, pero solo se usa para admin)
  const { contadorNoLeidas } = useNotificaciones()

  //  Cerrar sesión
  const handleLogout = () => {
    if (window.confirm('¿Deseas cerrar sesión?')) {
      logout()
      navigate('/')
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-petcare shadow-sm sticky-top">
      <div className="container">
        {/*  Logo + nombre */}
        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
          <img
            src={logo}
            alt="PetCare Logo"
            className="me-2"
            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
          />
          PetCare
        </Link>

        {/*  Botón colapsable (móviles) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/*  Enlaces */}
        <div id="nav" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink end className="nav-link" to="/">Inicio</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/productos">Productos</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/ofertas">Ofertas</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/blog">Blog</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/nosotros">Nosotros</NavLink></li>
            
            {/* Contacto - Solo visible para clientes */}
            {!isAdmin && (
              <li className="nav-item"><NavLink className="nav-link" to="/contacto">Contacto</NavLink></li>
            )}

            {/*  Panel admin visible solo para rol admin */}
            {isAdmin && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  <i className="fa-solid fa-lock me-1"></i> Panel Admin
                </NavLink>
              </li>
            )}
          </ul>

          {/*  Sección derecha: usuario + carrito */}
          <div className="d-flex align-items-center gap-2">
            {usuario ? (
              <>
                <span className="text-white-50 small me-2">
                  Hola,{' '}
                  <strong className="text-white">{usuario.nombre}</strong>{' '}
                  {usuario.rol === 'ADMIN' && '(Admin)'}
                </span>
                
                {/* Ver Perfil - Solo visible para clientes */}
                {!isAdmin && (
                  <NavLink className="btn btn-light" to="/perfil">
                    <i className="fa-solid fa-user me-1"></i> Ver Perfil
                  </NavLink>
                )}
                
                {/* Mis Pedidos - Solo visible para clientes */}
                {!isAdmin && (
                  <NavLink className="btn btn-outline-light" to="/mis-pedidos">
                    <i className="fa-solid fa-box me-1"></i> Mis Pedidos
                  </NavLink>
                )}
                
                {/* Notificaciones - Solo visible para administradores */}
                {isAdmin && (
                  <NavLink className="btn btn-outline-light position-relative" to="/admin/notificaciones">
                    <i className="fa-solid fa-bell me-1"></i>
                    Notificaciones
                    {contadorNoLeidas > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {contadorNoLeidas}
                      </span>
                    )}
                  </NavLink>
                )}
                
                {/* Carrito */}
                <NavLink className="btn btn-light position-relative" to="/carrito">
                  <i className="fa-solid fa-cart-shopping me-1"></i>
                  Carrito
                  {count > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                      {count}
                    </span>
                  )}
                </NavLink>
                
                <button className="btn btn-outline-light" onClick={handleLogout}>
                  <i className="fa-solid fa-right-from-bracket me-1"></i> Cerrar sesión
                </button>
              </>
            ) : (
              <NavLink className="btn btn-outline-light" to="/login">
                <i className="fa-solid fa-user me-1"></i> Ingresar
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
