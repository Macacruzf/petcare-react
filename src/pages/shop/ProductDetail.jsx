// src/pages/shop/ProductDetail.jsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { obtenerProductoPorId, obtenerTodosProductos } from "../../services/productosService";
import { useCart } from "../../contexts/CartContext.jsx";
import { useToggle } from "../../hooks";

export default function ProductDetail() {
  const { id } = useParams(); //  Obtiene el ID del producto desde la URL
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [productosRelacionados, setProductosRelacionados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 🎣 Hook personalizado useToggle para mostrar descripción completa
  const [showFullDescription, toggleDescription] = useToggle(false);

  // 🔹 Cargar producto y productos relacionados desde el microservicio
  useEffect(() => {
    const cargarProducto = async () => {
      try {
        setLoading(true);
        const data = await obtenerProductoPorId(Number(id));
        setProducto(data);
        
        // Cargar productos relacionados de la misma categoría
        const todosProductos = await obtenerTodosProductos();
        const relacionados = todosProductos
          .filter(p => 
            p.id !== data.id && // Excluir el producto actual
            p.categoria?.id === data.categoria?.id && // Misma categoría
            p.stock > 0 // Solo productos con stock
          )
          .slice(0, 4); // Máximo 4 productos
        
        setProductosRelacionados(relacionados);
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

  const formattedPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(producto.precio);

  return (
    <div className="container py-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/productos" className="text-decoration-none">Productos</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {producto.nombre}
          </li>
        </ol>
      </nav>

      <div className="row g-4">
        {/* 🖼️ Imagen del producto */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="img-fluid rounded"
                style={{ width: "100%", height: "400px", objectFit: "contain" }}
              />
            </div>
          </div>
        </div>

        {/* 📋 Información del producto */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              {/* Título y categoría */}
              <div className="mb-4">
                <h1 className="fw-bold text-success mb-2">{producto.nombre}</h1>
                <span className="badge bg-success bg-opacity-10 text-success px-3 py-2">
                  <i className="fa-solid fa-tag me-2"></i>
                  {producto.categoria?.nombre || 'Sin categoría'}
                </span>
              </div>

              {/* Precio */}
              <div className="mb-4 p-3 bg-light rounded">
                <p className="text-muted mb-1 small">Precio</p>
                <h2 className="fw-bold text-success mb-0">{formattedPrice}</h2>
              </div>

              {/* Disponibilidad */}
              <div className="mb-4">
                <div className="d-flex align-items-center gap-2">
                  <span className="fw-bold">Disponibilidad:</span>
                  {producto.stock > 0 ? (
                    <>
                      <span className="badge bg-success">
                        <i className="fa-solid fa-check me-1"></i>
                        En stock ({producto.stock} unidades)
                      </span>
                    </>
                  ) : (
                    <span className="badge bg-danger">
                      <i className="fa-solid fa-times me-1"></i>
                      Sin stock
                    </span>
                  )}
                </div>
              </div>

              {/* Descripción */}
              <div className="mb-4">
                <h5 className="fw-bold mb-3">
                  <i className="fa-solid fa-info-circle me-2 text-success"></i>
                  Descripción
                </h5>
                <div className="border-start border-success border-3 ps-3">
                  <p className={`mb-0 ${!showFullDescription && producto.descripcion?.length > 150 ? 'text-truncate' : ''}`}>
                    {producto.descripcion || 'Sin descripción disponible'}
                  </p>
                  {producto.descripcion && producto.descripcion.length > 150 && (
                    <button 
                      className="btn btn-link btn-sm p-0 mt-2 text-success text-decoration-none"
                      onClick={toggleDescription}
                    >
                      {showFullDescription ? '← Ver menos' : 'Ver más →'}
                    </button>
                  )}
                </div>
              </div>

              {/* Botones de acción */}
              <div className="d-flex gap-2 flex-wrap">
                <button
                  className="btn btn-success btn-lg flex-grow-1"
                  onClick={() => addItem(producto, 1)}
                  disabled={producto.stock <= 0}
                >
                  <i className="fa-solid fa-cart-plus me-2"></i>
                  {producto.stock > 0 ? 'Añadir al carrito' : 'Producto no disponible'}
                </button>

                <Link 
                  className="btn btn-outline-secondary btn-lg" 
                  to="/productos"
                >
                  <i className="fa-solid fa-arrow-left me-2"></i>
                  Volver
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔗 Productos Relacionados */}
      {productosRelacionados.length > 0 && (
        <div className="mt-5">
          <h3 className="fw-bold mb-4">
            <i className="fa-solid fa-boxes-stacked me-2 text-success"></i>
            Productos Relacionados
          </h3>
          <div className="row g-3">
            {productosRelacionados.map((relacionado) => {
              const precioFormateado = new Intl.NumberFormat('es-CL', {
                style: 'currency',
                currency: 'CLP'
              }).format(relacionado.precio);

              return (
                <div key={relacionado.id} className="col-md-6 col-lg-3">
                  <div 
                    className="card h-100 border-0 shadow-sm hover-shadow" 
                    style={{ cursor: 'pointer', transition: 'all 0.3s' }}
                    onClick={() => navigate(`/productos/${relacionado.id}`)}
                  >
                    <img
                      src={relacionado.imagen}
                      alt={relacionado.nombre}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "contain", padding: "15px" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <span className="badge bg-success bg-opacity-10 text-success mb-2 align-self-start">
                        {relacionado.categoria?.nombre || 'Sin categoría'}
                      </span>
                      <h6 className="card-title fw-bold text-truncate">{relacionado.nombre}</h6>
                      <p className="card-text text-muted small text-truncate mb-2">
                        {relacionado.descripcion || 'Sin descripción'}
                      </p>
                      <div className="mt-auto">
                        <p className="fw-bold text-success mb-2">{precioFormateado}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <small className="text-muted">
                            {relacionado.stock > 0 ? (
                              <span className="text-success">
                                <i className="fa-solid fa-check-circle me-1"></i>
                                Disponible
                              </span>
                            ) : (
                              <span className="text-danger">Sin stock</span>
                            )}
                          </small>
                          <button 
                            className="btn btn-sm btn-outline-success"
                            onClick={(e) => {
                              e.stopPropagation();
                              addItem(relacionado, 1);
                            }}
                            disabled={relacionado.stock <= 0}
                          >
                            <i className="fa-solid fa-cart-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
