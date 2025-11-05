// src/pages/ProductDetail.jsx
import { useParams, Link } from "react-router-dom";
import { productos } from "../data/data";
import { useCart } from "../providers/CartContext.jsx";

export default function ProductDetail() {
  const { id } = useParams(); // 🆔 Obtiene el ID del producto desde la URL
  const { addItem } = useCart();

  // Buscar el producto por su ID
  const producto = productos.find((p) => p.id === Number(id));

  if (!producto) {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-danger fw-bold mb-3">Producto no encontrado</h2>
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
            src={producto.imagen.replace("/placeholder/", "/src/assets/placeholder/")}
            alt={producto.nombre}
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </div>

        {/* 📋 Información del producto */}
        <div className="col-md-6">
          <h2 className="fw-bold mb-3 text-success">{producto.nombre}</h2>

          <p className="text-muted mb-1">
            <strong>Categoría:</strong> {producto.categoria}
          </p>

          <p className="fs-4 fw-bold text-success mb-3">
            ${formattedPrice}
          </p>

          <p className="mb-4">{producto.descripcion}</p>

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
