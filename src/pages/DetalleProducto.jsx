import { useParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts.js'
import { useCart } from '../providers/CartContext.jsx'

export default function DetalleProducto(){
  const { id } = useParams()
  const { products } = useProducts()
  const { addItem } = useCart()

  const product = products.find(p => String(p.id) === String(id))
  if (!product) return <div className="container">Producto no encontrado.</div>

  return (
    <div className="container py-3">
      <div className="row g-4">
        <div className="col-md-6">
          {product.image && <img src={product.image} alt={product.name} className="img-fluid rounded" />}
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p className="text-muted">{product.description}</p>
          <h4 className="mb-3">${product.price.toLocaleString()}</h4>
          <button className="btn btn-primary" onClick={() => addItem(product, 1)}>Agregar al carrito</button>
        </div>
      </div>
    </div>
  )
}
