import { Link } from 'react-router-dom';
import { useCart } from '../providers/CartContext.jsx';

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  // Función para formatear el precio (asumiendo que funciona correctamente)
  const formattedPrice = product.price.toLocaleString('es-CL');

  return (
    <div className="col"> 
      <div className="card h-100 shadow-sm text-center"> 
        
        {/* Contenedor de Imagen */}
        <div className="p-3"> 
            {product.image && (
                <img 
                  // 🛑 CORREGIDO: Se quitó la llave de cierre extra. Ahora es {product.image}
                  src={product.image} 
                  className="card-img-top img-fluid" 
                  alt={product.name} 
                  style={{ maxHeight: '180px', objectFit: 'contain' }} 
                />
            )}
        </div>

        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold">{product.name}</h5> 
          
          <p className="card-text text-success fw-bold fs-5 mt-2">${formattedPrice}</p> 

          <div className="d-flex justify-content-center gap-2 mt-auto">
            <Link className="btn btn-sm btn-outline-success" to={`/producto/${product.id}`}>
              Ver Detalle
            </Link>
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