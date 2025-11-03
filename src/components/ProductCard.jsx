import { Link } from 'react-router-dom'
import { useCart } from '../providers/CartContext.jsx'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        {product.image && <img src={product.image} className="card-img-top" alt={product.name} />}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text text-muted flex-fill">{product.description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold">${"{:,.0f}".format(product.price)}</span>
            <div className="btn-group">
              <button className="btn btn-sm btn-outline-primary" onClick={() => addItem(product, 1)}>Agregar</button>
              <Link className="btn btn-sm btn-primary" to={`/producto/${product.id}`}>Ver</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
