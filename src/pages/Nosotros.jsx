// src/pages/Nosotros.jsx
export default function Nosotros() {
  return (
    <div className="container py-4">
      {/* Logo y encabezado */}
      <div className="text-center mb-4">
        <img
          src="/placeholder/logo.png"
          alt="PetCare Logo"
          className="img-fluid mb-3"
          style={{ maxWidth: '120px' }}
        />
        <h2 className="fw-bold">Sobre Nosotros</h2>
      </div>

      {/* Imagen de fondo o ilustrativa */}
      <div className="text-center mb-4">
        <img
          src="/placeholder/equipo.jpg"
          alt="Equipo PetCare"
          className="img-fluid rounded shadow-sm"
          style={{ maxHeight: '300px', objectFit: 'cover' }}
        />
      </div>

      {/* Descripción principal */}
      <div className="container-narrow mx-auto">
        <p className="text-muted fs-5 text-center">
          En <strong>PetCare</strong>, somos una tienda comprometida con el bienestar y la felicidad de tu mascota.
          Ofrecemos productos de alta calidad seleccionados con amor y cuidado, para que tu compañero peludo tenga
          una vida plena, sana y feliz.
        </p>

        {/* Sección Misión, Visión, Valores */}
        <div className="row g-4 mt-4">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title fw-bold text-primary">Nuestra Misión</h5>
                <p className="card-text">
                  Promover el bienestar animal a través de productos de calidad, atención personalizada y un servicio confiable.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title fw-bold text-primary">Nuestra Visión</h5>
                <p className="card-text">
                  Ser la tienda líder en productos para mascotas en Chile, reconocida por su compromiso, empatía y excelencia.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title fw-bold text-primary">Nuestros Valores</h5>
                <ul className="card-text mb-0">
                  <li>Amor por los animales 🐶🐱</li>
                  <li>Calidad y confianza</li>
                  <li>Atención cercana</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
