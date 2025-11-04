import ProductCard from '../components/ProductCard.jsx'
import { useProducts } from '../hooks/useProducts.js'

export default function Productos(){
  const { products, loading } = useProducts()
  if (loading) return <div className="container">Cargando productos...</div>
  
  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 fw-bold">Productos</h2> 
      
      {/* ⚠️ Ajuste la grilla para 2 columnas en sm, 3 en md, y 4 en lg */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {/* Aquí se recorre la lista de productos */}
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}