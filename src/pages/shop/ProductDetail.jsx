// src/pages/shop/ProductDetail.jsx
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { obtenerProductoPorId } from "../../services/productosService";
import { useCart } from "../../contexts/CartContext.jsx";
import { useToggle } from "../../hooks";

export default function ProductDetail() {
  const { id } = useParams(); //  Obtiene el ID del producto desde la URL
  const { addItem } = useCart();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 🎣 Hook personalizado useToggle para mostrar descripción completa
  const [showFullDescription, toggleDescription] = useToggle(false);

  // 🔹 Cargar producto desde el microservicio
  useEffect(() => {
    const cargarProducto = async () => {
      try {
        setLoading(true);
        const data = await obtenerProductoPorId(Number(id));
        setProducto(data);
      } catch (err) {
        setError('Error al cargar el producto: ' + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    cargarProducto();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="text-muted mt-2">Cargando producto...</p>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-danger fw-bold mb-3">
          {error || 'Producto no encontrado'}
        </h2>
        <Link className="btn btn-primary" to="/productos">
          Volver a productos
        </Link>
      </div>
    );
  }

  const formattedPrice = producto.precio.toLocaleString("es-CL");

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        {/* 🖼️ Imagen del producto */}
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </div>

        {/* 📋 Información del producto */}
        <div className="col-md-6">
          <h2 className="fw-bold mb-3 text-success">{producto.nombre}</h2>

          <p className="text-muted mb-1">
            <strong>Categoría:</strong> {producto.categoria?.nombre}
          </p>

          <p className="fs-4 fw-bold text-success mb-3">
            ${formattedPrice}
          </p>

          {/* Descripción con toggle */}
          <div className="mb-4">
            <p className={showFullDescription ? '' : 'text-truncate'}>
              {producto.descripcion}
            </p>
            {producto.descripcion && producto.descripcion.length > 100 && (
              <button 
                className="btn btn-link btn-sm p-0 text-decoration-none"
                onClick={toggleDescription}
              >
                {showFullDescription ? '← Ver menos' : 'Ver más →'}
              </button>
            )}
          </div>

          <div className="d-flex gap-3">
            <button
              className="btn btn-success"
              onClick={() => addItem(producto, 1)}
            >
              <i className="fa-solid fa-cart-plus me-1"></i> Añadir al carrito
            </button>

            <Link className="btn btn-outline-primary" to="/productos">
              <i className="fa-solid fa-arrow-left me-1"></i> Volver
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
