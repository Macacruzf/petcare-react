// src/pages/Productos.jsx
import { useState } from "react";
import { productos } from "../data/data";
import ProductCard from "../components/ProductCard.jsx";

export default function Productos() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");

  // 🔹 Extraer categorías únicas
  const categorias = ["Todos", ...new Set(productos.map((p) => p.categoria))];

  // 🔹 Filtrar productos por categoría
  const productosFiltrados =
    categoriaSeleccionada === "Todos"
      ? productos
      : productos.filter((p) => p.categoria === categoriaSeleccionada);

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
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {productosFiltrados.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
