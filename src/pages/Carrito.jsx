import { useCart } from '../providers/CartContext.jsx'
import { Link } from 'react-router-dom'
import placeholder from '../assets/placeholder/logo.png' // ✅ ruta segura

export default function Carrito() {
  const { items, removeItem, clearCart, formattedTotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="container text-center py-5">
        <p className="mb-3">Tu carrito está vacío 🛒</p>
        <Link to="/productos" className="btn btn-success">
          Ver productos
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-success fw-bold">Carrito de Compras</h2>

      <div className="table-responsive">
        <table className="table align-middle table-hover">
          <thead className="table-success">
            <tr>
              <th>Imagen</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {items.map((i) => (
              <tr key={i.id}>
                <td style={{ width: '100px' }}>
                  <img
                    src={i.imagen ? i.imagen : placeholder}
                    alt={i.nombre}
                    className="img-fluid rounded shadow-sm"
                    style={{ maxWidth: '80px', maxHeight: '80px', objectFit: 'cover' }}
                  />
                </td>
                <td>{i.nombre}</td>
                <td>
                  {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(i.precio)}
                </td>
                <td>{i.qty}</td>
                <td>
                  {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(i.precio * i.qty)}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeItem(i.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="4" className="text-end fw-bold">Total</td>
              <td className="fw-bold">{formattedTotal}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <button className="btn btn-outline-danger" onClick={clearCart}>
          Vaciar carrito
        </button>
        <Link className="btn btn-success" to="/pago">
          Continuar al pago
        </Link>
      </div>
    </div>
  )
}
