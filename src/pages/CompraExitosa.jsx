// src/pages/CompraExitosa.jsx
import { Link } from 'react-router-dom'
import successImg from '../assets/placeholder/success.svg' 

export default function CompraExitosa() {
  return (
    <div className="container mt-5 text-center">
      <div className="card shadow-sm p-5 border border-success">
        <h2 className="text-success fw-bold mb-3">¡Compra Exitosa! 🎉</h2>

        <p className="lead mb-4">
          Tu pedido fue procesado correctamente.  
          En breve recibirás un correo con los detalles de tu compra.
        </p>

        <img
          src={successImg}
          alt="Compra exitosa"
          className="img-fluid d-block mx-auto mb-4"
          style={{ width: '180px', maxWidth: '90%' }}
        />

        <div className="d-flex justify-content-center gap-3">
          <Link to="/productos" className="btn btn-outline-success">
            Seguir comprando
          </Link>
          <Link to="/" className="btn btn-success">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
