// src/components/Navbar.jsx
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../providers/CartContext.jsx'

export default function Navbar() {
  const { count } = useCart()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-petcare shadow-sm sticky-top">
      <div className="container">
        {/* Logo + nombre */}
        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
          <img
            src="/placeholder/logo.png"
            alt="PetCare Logo"
            className="me-2"
            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
          />
          PetCare
        </Link>

        {/* Botón colapsable (para móviles) */}
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

        {/* Enlaces */}
        <div id="nav" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink end className="nav-link" to="/">Inicio</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/productos">Productos</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/blog">Blog</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/nosotros">Nosotros</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contacto">Contacto</NavLink></li>
          </ul>

          {/* Acciones de usuario y carrito */}
          <div className="d-flex gap-2">
            <NavLink className="btn btn-outline-light" to="/login">
              <i className="fa-solid fa-user me-1"></i> Ingresar
            </NavLink>

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
