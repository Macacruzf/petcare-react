import { useCart } from '../providers/CartContext.jsx'
import { Link } from 'react-router-dom'

export default function Carrito(){
  const { items, removeItem, clear, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="container text-center py-5">
        <p>Tu carrito está vacío.</p>
        <Link to="/productos" className="btn btn-primary">Ver productos</Link>
      </div>
    )
  }

  return (
    <div className="container">
      <h2>Carrito</h2>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead><tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th></th></tr></thead>
          <tbody>
            {items.map(i => (
              <tr key={i.id}>
                <td>{i.name}</td>
                <td>${i.price.toLocaleString()}</td>
                <td>{i.qty}</td>
                <td>${(i.price * i.qty).toLocaleString()}</td>
                <td><button className="btn btn-sm btn-outline-danger" onClick={() => removeItem(i.id)}>Eliminar</button></td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr><td colSpan="3" className="text-end fw-bold">Total</td><td className="fw-bold">${total.toLocaleString()}</td><td></td></tr>
          </tfoot>
        </table>
      </div>
      <div className="d-flex gap-2">
        <button className="btn btn-outline-secondary" onClick={clear}>Vaciar</button>
        <Link className="btn btn-primary" to="/pago">Continuar al pago</Link>
      </div>
    </div>
  )
}
