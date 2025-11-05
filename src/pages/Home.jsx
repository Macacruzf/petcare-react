// src/pages/Home.jsx
import { Link } from 'react-router-dom'
import banner from '../assets/placeholder/banner.jpg'
import logo from '../assets/placeholder/logo.png'

export default function Home() {
  return (
    <div className="container-fluid p-0">
      {/* 🔹 Hero / Banner principal */}
      <div
        className="text-center text-white d-flex flex-column justify-content-center align-items-center position-relative"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '80vh',
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
            Tu tienda online de confianza para productos de mascotas 🐾
          </p>
          <Link to="/productos" className="btn btn-success btn-lg shadow-sm">
            Ver productos
          </Link>
        </div>
      </div>

      {/* 🔹 Sección breve de presentación */}
      <div className="container text-center py-5">
        <h2 className="mb-3">Cuidado y amor para tus mascotas</h2>
        <p className="text-muted mb-4">
          En <strong>PetCare</strong> encontrarás los mejores productos para tus compañeros peludos:
          camas, collares, juguetes y mucho más.  
          Diseñado con React, Vite y Bootstrap.
        </p>
        <Link to="/blog" className="btn btn-outline-success">
          Leer consejos en nuestro Blog
        </Link>
      </div>
    </div>
  )
}
