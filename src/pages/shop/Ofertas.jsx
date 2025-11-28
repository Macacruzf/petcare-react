// src/pages/shop/Ofertas.jsx
import React, { useState, useEffect } from "react";
import { obtenerTodosProductos } from "../../services/productosService";
import { useCart } from "../../contexts/CartContext.jsx";

export default function Ofertas() {
  const { addItem } = useCart();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await obtenerTodosProductos();
        setProductos(data);
      } catch (err) {
        console.error('Error al cargar productos:', err);
      } finally {
        setLoading(false);
      }
    };
    
    cargarProductos();
  }, []);

  // TODO: Agregar campo 'oferta' al modelo Producto en backend
  // Por ahora mostramos todos los productos
  const productosEnOferta = productos;

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 text-success fw-bold">
        🏷️ Productos Destacados
      </h2>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : productosEnOferta.length > 0 ? (
        <div className="row g-4">
          {productosEnOferta.map((producto) => (
            <div key={producto.id} className="col-12 col-sm-6 col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="position-relative">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="card-img-top rounded-top"
                    style={{
                      height: "240px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <span
                    className="badge bg-danger position-absolute top-0 end-0 m-2"
                    style={{ fontSize: "0.9rem" }}
                  >
                    OFERTA
                  </span>
                </div>

                <div className="card-body text-center d-flex flex-column">
                  <h5 className="card-title fw-bold text-success">
                    {producto.nombre}
                  </h5>
                  <p className="text-muted small flex-fill">
                    {producto.descripcion}
                  </p>
                  <p className="fw-bold fs-5 text-danger mb-3">
                    ${producto.precio.toLocaleString("es-CL")}
                  </p>
                  <button
                    className="btn btn-success w-100"
                    onClick={() => addItem(producto, 1)}
                  >
                    <i className="fa-solid fa-cart-plus me-1"></i> Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted mt-5">
          No hay productos en oferta por ahora 😺
        </p>
      )}
    </div>
  );
}
