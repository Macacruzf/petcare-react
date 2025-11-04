// src/components/ProductCard.jsx
import { Link } from 'react-router-dom'
import { useCart } from '../providers/CartContext.jsx'

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  // Formato de precio CLP (pesos chilenos)
  const formatPrice = (value) =>
    new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(value)

  return (
    <div className="col">
      <div className="card h-100 shadow-sm border-0">
        {/* Imagen del producto */}
        {product.image && (
          <img
            src={product.image}
            className="card-img-top"
            alt={product.name}
          />
        )}

        {/* Cuerpo del producto */}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold text-primary">{product.name}</h5>
          <p className="card-text text-muted flex-fill">{product.description}</p>

          <div className="d-flex justify-content-between align-items-center mt-2">
            <span className="fw-bold text-success">
              {formatPrice(product.price)}
            </span>

            <div className="btn-group">
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => addItem(product, 1)}
              >
                Agregar
              </button>
              <Link
                className="btn btn-sm btn-primary"
                to={`/producto/${product.id}`}
              >
                Ver
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
