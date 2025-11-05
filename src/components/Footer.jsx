// src/components/Footer.jsx
import logo from '../assets/placeholder/logo.png'

export default function Footer() {
  return (
    <footer className="mt-auto py-4 bg-light border-top">
      <div className="container text-center small">
        {/*  Logo */}
        <div className="mb-2">
          <img
            src={logo}
            alt="PetCare Logo"
            className="img-fluid"
            style={{
              maxWidth: '80px',
              opacity: 0.9,
            }}
          />
        </div>

        {/*  Texto */}
        <div className="fw-semibold text-dark">
          © {new Date().getFullYear()} <strong>PetCare</strong>. Todos los derechos reservados.
        </div>
        <div className="text-muted mb-2">
          Hecho con ❤️ para tus mascotas.
        </div>

        {/* 🔹 Enlaces rápidos */}
        <div className="mt-2">
          <a
            href="/nosotros"
            className="text-decoration-none me-3 text-success fw-semibold"
          >
            Nosotros
          </a>
          <a
            href="/contacto"
            className="text-decoration-none text-success fw-semibold"
          >
            Contacto
          </a>
        </div>
      </div>
    </footer>
  )
}
