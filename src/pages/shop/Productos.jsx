// src/pages/shop/Productos.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { obtenerTodosProductos } from "../../services/productosService";
import ProductCard from "../../components/common/ProductCard.jsx";

export default function Productos() {
  const location = useLocation();
  const categoriaInicial = location.state?.categoriaInicial || "Todos";
  
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(categoriaInicial);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Actualizar categoría seleccionada cuando cambia el state de navegación
  useEffect(() => {
    if (location.state?.categoriaInicial) {
      setCategoriaSeleccionada(location.state.categoriaInicial);
    }
  }, [location.state]);

  // Cargar productos desde el microservicio
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        const data = await obtenerTodosProductos();
        setProductos(data);
      } catch (err) {
        setError('Error al cargar productos: ' + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    cargarProductos();
  }, []);

  // Extraer categorías únicas
  const categorias = ["Todos", ...new Set(productos.map((p) => p.categoria?.nombre).filter(Boolean))];

  // Filtrar productos por categoría
  const productosFiltrados =
    categoriaSeleccionada === "Todos"
      ? productos
      : productos.filter((p) => p.categoria?.nombre === categoriaSeleccionada);

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 fw-bold">Productos</h2>

      {/* 🔸 Filtros de categoría */}
      <div className="d-flex justify-content-center flex-wrap mb-4">
        {categorias.map((cat) => (
          <button
            key={cat}
            className={`btn m-2 ${
              categoriaSeleccionada === cat
                ? "btn-success"
                : "btn-outline-success"
            }`}
            onClick={() => setCategoriaSeleccionada(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🔸 Grilla de productos */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="text-muted mt-2">Cargando productos...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {productosFiltrados.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
