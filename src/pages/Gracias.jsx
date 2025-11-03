import { Link } from 'react-router-dom'
export default function Gracias(){
  return (
    <div className="container text-center py-5">
      <h2>¡Gracias por tu compra!</h2>
      <p>Te enviamos un correo con el detalle de tu pedido.</p>
      <Link className="btn btn-primary" to="/">Volver al inicio</Link>
    </div>
  )
}
