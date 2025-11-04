// src/pages/Gracias.jsx
import { Link } from 'react-router-dom'

export default function Gracias() {
  return (
    <div className="container text-center py-5">
      {/* Logo PetCare */}
      <div className="mb-4">
        <img
          src="/placeholder/logo.png"
          alt="PetCare Logo"
          className="img-fluid"
          style={{ maxWidth: '120px' }}
        />
      </div>

      {/* Ícono de éxito */}
      <div className="text-success mb-3" style={{ fontSize: '3rem' }}>
        <i className="fa-solid fa-circle-check"></i>
      </div>

      <h2 className="fw-bold mb-3">¡Gracias por tu compra!</h2>
      <p className="text-muted mb-4">
        Te hemos enviado un correo con el detalle de tu pedido.  
        Pronto te notificaremos cuando tu envío esté en camino.
      </p>

      <Link className="btn btn-primary" to="/">
        Volver al inicio
      </Link>
    </div>
  )
}
