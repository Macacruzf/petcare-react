// src/pages/Home.jsx
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="container-fluid p-0">
      {/* 🔹 Hero / Banner principal */}
      <div
        className="text-center text-white d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundImage: "url('/placeholder/banner.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '80vh',
          position: 'relative'
        }}
      >
        {/* Fondo semitransparente para contraste */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.45)'
          }}
        ></div>

        {/* Contenido sobre el banner */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <img
            src="/placeholder/logo.png"
            alt="PetCare Logo"
            className="img-fluid mb-3"
            style={{ maxWidth: '140px' }}
          />
          <h1 className="fw-bold display-5 mb-3">Bienvenido a PetCare</h1>
          <p className="lead mb-4">
            Tu tienda online de confianza para productos de mascotas 🐾
          </p>
          <Link to="/productos" className="btn btn-primary btn-lg shadow">
            Ver productos
          </Link>
        </div>
      </div>

      {/* 🔹 Sección breve de presentación */}
      <div className="container text-center py-5">
        <h2 className="mb-3">Cuidado y amor para tus mascotas</h2>
        <p className="text-muted mb-4">
          En <strong>PetCare</strong> encontrarás los mejores productos para tus compañeros peludos:
          camas, collares, juguetes y mucho más. Diseñado con React, Vite y Bootstrap.
        </p>
        <Link to="/blog" className="btn btn-outline-primary">
          Leer consejos en nuestro Blog
        </Link>
      </div>
    </div>
  )
}
