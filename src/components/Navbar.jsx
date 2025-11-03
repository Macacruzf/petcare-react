import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../providers/CartContext.jsx'

export default function Navbar() {
  const { count } = useCart()
  return (
    <nav className="navbar navbar-expand-lg navbar-dark brand-bg">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">PetCare</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="nav" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink end className="nav-link" to="/">Inicio</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/productos">Productos</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/blog">Blog</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/nosotros">Nosotros</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contacto">Contacto</NavLink></li>
          </ul>
          <div className="d-flex gap-2">
            <NavLink className="btn btn-outline-light" to="/login">Ingresar</NavLink>
            <NavLink className="btn btn-light" to="/carrito">Carrito ({count})</NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}
