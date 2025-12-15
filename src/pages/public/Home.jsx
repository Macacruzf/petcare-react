// src/pages/public/Home.jsx
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import banner from '../../assets/images/banner.jpg'
import logo from '../../assets/images/logo.png'
import { obtenerTodosProductos } from '../../services/productosService'

export default function Home() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);

  // 🔹 Cargar categorías desde productos
  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const productos = await obtenerTodosProductos();
        const categoriasUnicas = [...new Set(productos.map(p => p.categoria?.nombre).filter(Boolean))];
        
        // Agregar íconos, colores e imágenes a las categorías
        const categoriasConDatos = categoriasUnicas.map(nombre => {
          // Obtener el primer producto de esta categoría para usar su imagen
          const productoRepresentativo = productos.find(p => p.categoria?.nombre === nombre);
          
          return {
            nombre,
            icono: obtenerIconoCategoria(nombre),
            color: obtenerColorCategoria(nombre),
            imagen: productoRepresentativo?.imagen || ''
          };
        });
        
        setCategorias(categoriasConDatos);
      } catch (err) {
        console.error('Error al cargar categorías:', err);
      }
    };
    
    cargarCategorias();
  }, []);

  // Función auxiliar para obtener ícono según categoría
  const obtenerIconoCategoria = (nombre) => {
    const iconos = {
      'Alimentos': 'fa-bowl-food',
      'Juguetes': 'fa-baseball',
      'Accesorios': 'fa-paw',
      'Higiene': 'fa-shower',
      'Salud': 'fa-heart-pulse',
      'Camas': 'fa-bed',
      'Collares': 'fa-user-tag',
      'Ropa': 'fa-shirt'
    };
    return iconos[nombre] || 'fa-box';
  };

  // Función auxiliar para obtener color según categoría
  const obtenerColorCategoria = (nombre) => {
    const colores = {
      'Alimentos': 'success',
      'Juguetes': 'primary',
      'Accesorios': 'warning',
      'Higiene': 'info',
      'Salud': 'danger',
      'Camas': 'secondary',
      'Collares': 'dark',
      'Ropa': 'purple'
    };
    return colores[nombre] || 'success';
  };

  const handleCategoriaClick = (nombreCategoria) => {
    navigate('/productos', { state: { categoriaInicial: nombreCategoria } });
  };

  return (
    <div className="container-fluid p-0">
      {/* 🔹 Hero / Banner principal */}
      <div
        className="text-center text-white d-flex flex-column justify-content-center align-items-center position-relative"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '55vh',
          overflow: 'hidden'
        }}
      >
        {/* Overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}
        ></div>

        {/* Contenido sobre el banner */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <img
            src={logo}
            alt="PetCare Logo"
            className="img-fluid mb-3"
            style={{ maxWidth: '140px' }}
          />
          <h1 className="fw-bold display-5 mb-3">Bienvenido a PetCare</h1>
          <p className="lead mb-4">
            Tu tienda online de confianza para productos de mascotas 🐾. <br />
            En <strong>PetCare</strong> encontrarás los mejores productos para tus compañeros peludos:
          camas, collares, juguetes y mucho más.  
          Diseñado con React, Vite y Bootstrap.
          </p>
        </div>
      </div>

      {/* 🔹 Sección de Categorías */}
      {categorias.length > 0 && (
        <div className="container py-5" style={{ backgroundColor: '#f8f9fa' }}>
          <h2 className="text-center mb-4 fw-bold">
            <i className="fa-solid fa-tags me-2 text-success"></i>
            Explora Nuestras Categorías
          </h2>
          <p className="text-center text-muted mb-5">
            Encuentra exactamente lo que tu mascota necesita
          </p>
          
          <div className="row g-4">
            {categorias.map((categoria) => (
              <div key={categoria.nombre} className="col-md-6 col-lg-3">
                <div 
                  className="card h-100 border-0 shadow-sm overflow-hidden"
                  style={{ 
                    cursor: 'pointer', 
                    transition: 'all 0.3s'
                  }}
                  onClick={() => handleCategoriaClick(categoria.nombre)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  {/* Imagen de la categoría */}
                  <div 
                    className="position-relative"
                    style={{ 
                      height: '200px',
                      overflow: 'hidden'
                    }}
                  >
                    <img 
                      src={categoria.imagen} 
                      alt={categoria.nombre}
                      className="w-100 h-100"
                      style={{ 
                        objectFit: 'cover',
                        filter: 'brightness(0.85)'
                      }}
                    />
                    {/* Overlay con gradiente */}
                    <div 
                      className="position-absolute top-0 start-0 w-100 h-100"
                      style={{
                        background: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.5))`
                      }}
                    ></div>
                  </div>

                  {/* Contenido de la tarjeta */}
                  <div className={`card-body text-center py-4 bg-${categoria.color} bg-opacity-10`}>
                    <h5 className={`card-title fw-bold text-${categoria.color} mb-2`}>
                      {categoria.nombre}
                    </h5>
                    <p className="card-text text-muted small mb-3">
                      Explorar productos
                    </p>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <span className={`text-${categoria.color} small fw-bold`}>Ver más</span>
                      <i className={`fa-solid fa-arrow-right text-${categoria.color}`}></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/productos" className="btn btn-success btn-lg">
              <i className="fa-solid fa-box-open me-2"></i>
              Ver Todos los Productos
            </Link>
          </div>
        </div>
      )}

      {/* 🔹 Sección breve de presentación */}
      <div className="container text-center py-5">
        <h2 className="mb-3">Cuidado y amor para tus mascotas</h2>
        <Link to="/blog" className="btn btn-outline-success">
          Leer consejos en nuestro Blog
        </Link>
      </div>
    </div>
  )
}
