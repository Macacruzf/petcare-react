// src/pages/public/Nosotros.jsx
import logo from '../../assets/images/logo.png'
import equipo from '../../assets/images/Superioridad.jpg'

export default function Nosotros() {
  return (
    <div className="container py-5">
      {/*  Logo y encabezado */}
      <div className="text-center mb-4">
        <img
          src={logo}
          alt="PetCare Logo"
          className="img-fluid mb-3"
          style={{ maxWidth: '120px' }}
        />
        <h2 className="fw-bold text-success">Sobre Nosotros</h2>
        <p className="text-muted small">
          Conectando el amor por los animales con productos de calidad 🐾
        </p>
      </div>

      {/*  Imagen ilustrativa */}
      <div className="text-center mb-4">
        <img
          src={equipo}
          alt="Equipo PetCare"
          className="img-fluid rounded shadow-sm"
          style={{
            maxWidth: '70%',         // Imagen más pequeña y centrada
            maxHeight: '220px',      // Altura controlada
            objectFit: 'cover',      // Mantiene proporción
            borderRadius: '16px',    // Bordes suaves
            boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)', // sombra verde suave
            display: 'block',
            margin: '0 auto'
          }}
        />
      </div>

      {/*  Descripción principal */}
      <div className="container-narrow mx-auto">
        <p className="text-muted fs-5 text-center">
          En <strong>PetCare</strong> creemos que cada mascota merece lo mejor.
          Por eso, trabajamos para ofrecer productos de alta calidad,
          seleccionados con amor y cuidado, asegurando que tu compañero peludo
          tenga una vida sana, plena y feliz.  
          Nuestro compromiso es acompañarte en cada etapa de su vida.
        </p>

        {/*  Misión, Visión y Valores */}
        <div className="row g-4 mt-5">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title fw-bold text-success">Nuestra Misión</h5>
                <p className="card-text text-muted">
                  Promover el bienestar animal a través de productos de calidad,
                  atención personalizada y un servicio confiable.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title fw-bold text-success">Nuestra Visión</h5>
                <p className="card-text text-muted">
                  Ser la tienda líder en productos para mascotas en Chile,
                  reconocida por su compromiso, empatía y excelencia.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title fw-bold text-success">Nuestros Valores</h5>
                <ul className="list-unstyled text-muted mb-0">
                  <li> Amor y respeto por los animales</li>
                  <li> Calidad y confianza</li>
                  <li> Atención cercana y humana</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
