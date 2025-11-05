import { Link } from 'react-router-dom';
import { useCart } from '../providers/CartContext.jsx';

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  // Formatear precio según el formato chileno
  const formattedPrice = product.precio.toLocaleString('es-CL');

  return (
    <div className="col">
      <div className="card h-100 shadow-sm text-center">
        {/* Imagen del producto */}
        <div className="p-3">
          {product.imagen && (
            <img
              src={product.imagen}
              className="card-img-top img-fluid"
              alt={product.nombre}
              style={{ maxHeight: '180px', objectFit: 'contain' }}
            />
          )}
        </div>

        {/* Contenido de la tarjeta */}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold">{product.nombre}</h5>

          <p className="card-text text-success fw-bold fs-5 mt-2">
            ${formattedPrice}
          </p>

          <div className="d-flex justify-content-center gap-2 mt-auto">
            {/* Enlace al detalle del producto (si lo implementas después) */}
            <Link className="btn btn-sm btn-outline-success" to={`/producto/${product.id}`}>
              Ver Detalle
            </Link>

            {/* Botón para añadir al carrito */}
            <button
              className="btn btn-sm btn-success"
              onClick={() => addItem(product, 1)}
            >
              Añadir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
