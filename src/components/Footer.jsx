// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="mt-auto py-4 bg-light border-top">
      <div className="container text-center small">
        {/* Logo */}
        <div className="mb-2">
          <img
            src="/placeholder/logo.png"
            alt="PetCare Logo"
            className="img-fluid"
            style={{ maxWidth: '90px' }}
          />
        </div>

        {/* Texto */}
        <div>© {new Date().getFullYear()} <strong>PetCare</strong>. Todos los derechos reservados.</div>
        <div className="text-muted">Hecho con ❤️ usando React + Vite + Bootstrap</div>

        {/* Enlaces rápidos */}
        <div className="mt-2">
          <a href="/nosotros" className="text-decoration-none me-3 text-primary">Nosotros</a>
          <a href="/contacto" className="text-decoration-none text-primary">Contacto</a>
        </div>
      </div>
    </footer>
  )
}
