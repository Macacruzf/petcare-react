// src/pages/shop/Gracias.jsx
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'

export default function Gracias() {
  return (
    <div className="container text-center py-5">
      {/* 🔹 Logo PetCare */}
      <div className="mb-4">
        <img
          src={logo}
          alt="PetCare Logo"
          className="img-fluid"
          style={{ maxWidth: '120px' }}
        />
      </div>

      {/* 🔹 Ícono de éxito */}
      <div className="text-success mb-3" style={{ fontSize: '3rem' }}>
        <i className="fa-solid fa-circle-check"></i>
      </div>

      <h2 className="fw-bold text-success mb-3">¡Gracias por tu compra! 🐾</h2>
      <p className="text-muted mb-4">
        Te hemos enviado un correo con el detalle de tu pedido.  
        Pronto te notificaremos cuando tu envío esté en camino.
      </p>

      <div className="d-flex justify-content-center gap-3">
        <Link className="btn btn-success px-4" to="/">
          <i className="fa-solid fa-home me-2"></i>
          Volver al inicio
        </Link>
        <Link className="btn btn-outline-success px-4" to="/mis-pedidos">
          <i className="fa-solid fa-box me-2"></i>
          Ver mis pedidos
        </Link>
      </div>
    </div>
  )
}
