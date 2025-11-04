// src/pages/Productos.jsx
import ProductCard from '../components/ProductCard.jsx'
import { useProducts } from '../hooks/useProducts.js'

export default function Productos() {
  const { products, loading } = useProducts()

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3 text-muted">Cargando productos...</p>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="container text-center py-5">
        <h4 className="text-muted">No hay productos disponibles.</h4>
      </div>
    )
  }

  return (
    <div className="container py-4">
      {/* Logo y título */}
      <div className="text-center mb-4">
        <img
          src="/placeholder/logo.png"
          alt="PetCare Logo"
          className="img-fluid mb-2"
          style={{ maxWidth: '120px' }}
        />
        <h2 className="fw-bold">Nuestros Productos</h2>
        <p className="text-muted">Encuentra lo mejor para tus mascotas 🐶🐱</p>
      </div>

      {/* Grilla de productos */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {products.map((p) => (
          <div key={p.id} className="col">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  )
}
