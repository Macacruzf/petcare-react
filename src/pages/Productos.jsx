import ProductCard from '../components/ProductCard.jsx'
import { useProducts } from '../hooks/useProducts.js'

export default function Productos(){
  const { products, loading } = useProducts()
  if (loading) return <div className="container">Cargando productos...</div>
  return (
    <div className="container py-3">
      <h2 className="mb-3">Productos</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
