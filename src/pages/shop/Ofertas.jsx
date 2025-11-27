// src/pages/shop/Ofertas.jsx
import React from "react";
import { productos } from "../../data/data";
import { useCart } from "../../contexts/CartContext.jsx";

export default function Ofertas() {
  const { addItem } = useCart();

  // Filtrar solo productos marcados con oferta
  const productosEnOferta = productos.filter((p) => p.oferta === true);

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 text-success fw-bold">
        🏷️ Productos en Oferta
      </h2>

      {productosEnOferta.length > 0 ? (
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
