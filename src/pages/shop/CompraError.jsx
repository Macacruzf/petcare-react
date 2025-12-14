// src/pages/shop/CompraError.jsx
import { Link } from 'react-router-dom'
import errorImg from '../../assets/images/error.svg' 

export default function CompraError() {
  return (
    <div className="container mt-5 text-center">
      <div className="card shadow-sm p-5 border border-danger">
        <h2 className="text-danger fw-bold mb-3">¡Ups! 😿</h2>

        <p className="lead mb-4">
          Algo salió mal durante el proceso de compra.  
          Por favor, inténtalo nuevamente o revisa tus datos de pago.
        </p>

        <img
          src={errorImg}
          alt="Error en la compra"
          className="img-fluid d-block mx-auto mb-4"
          style={{ width: '180px', maxWidth: '90%' }}
        />

        <div className="d-flex justify-content-center gap-3">
          <Link to="/pago" className="btn btn-outline-danger">
            Intentar de nuevo
          </Link>
          <Link to="/" className="btn btn-success">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
