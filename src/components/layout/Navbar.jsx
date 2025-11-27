// src/components/layout/Navbar.jsx
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext.jsx'
import logo from '../../assets/images/logo.png'
import { useAuth } from '../../hooks'

export default function Navbar() {
  const { count } = useCart()
  const navigate = useNavigate()
  
  // 🎣 Hook personalizado useAuth
  const { user: usuario, logout, isAdmin } = useAuth()

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
            <li className="nav-item"><NavLink className="nav-link" to="/contacto">Contacto</NavLink></li>

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
                  {usuario.rol === 'admin' && '(Admin)'}
                </span>
                <button className="btn btn-outline-light" onClick={handleLogout}>
                  <i className="fa-solid fa-right-from-bracket me-1"></i> Cerrar sesión
                </button>
              </>
            ) : (
              <NavLink className="btn btn-outline-light" to="/login">
                <i className="fa-solid fa-user me-1"></i> Ingresar
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
          </div>
        </div>
      </div>
    </nav>
  )
}
