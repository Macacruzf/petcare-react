// src/pages/blog/BlogComida.jsx
import { Link } from 'react-router-dom'
import comiendo from '../../assets/images/comiendo.jpg'

export default function BlogComida() {
  return (
    <div className="container py-5" style={{ maxWidth: '900px' }}>
      {/* 🔹 Título principal */}
      <h1 className="fw-bold text-success mb-3 text-center">
        Nutrición para una Vida Saludable
      </h1>

      {/* 🔹 Imagen principal más pequeña */}
      <div className="text-center mb-5">
        <img
          src={comiendo}
          alt="Perro y gato comiendo juntos"
          className="img-fluid rounded shadow-sm"
          style={{
            maxHeight: '180px', 
            width: '60%',       
            objectFit: 'cover',
            border: '3px solid #e8f5e9',
          }}
        />
      </div>

      {/* 🔹 Introducción */}
      <p className="lead text-muted text-center mb-5" style={{ lineHeight: '1.8' }}>
        Elegir alimentos balanceados y adecuados a la edad, tamaño y condición de tu mascota es
        el pilar de su bienestar. El agua fresca y el ejercicio complementan una buena dieta.
      </p>

      {/* 🔹 Contenido estructurado */}
      <section className="mb-5">
        <h3 className="fw-bold text-success mb-3">La Importancia de Elegir Bien</h3>
        <p className="text-muted">
          Los requerimientos nutricionales cambian a lo largo de la vida de tu mascota.
          Un cachorro o gatito necesita más proteínas y grasas para el desarrollo,
          mientras que un animal senior requiere fórmulas bajas en calorías para prevenir el sobrepeso.
        </p>
      </section>

      <section className="mb-5">
        <h3 className="fw-bold text-success mb-3">Consejos de Alimentación</h3>
        <ul className="text-muted">
          <li>
            <strong>Porciones controladas:</strong> Evita la sobrealimentación revisando las guías del empaque.
          </li>
          <li>
            <strong>Agua siempre disponible:</strong> Mantén un recipiente con agua limpia y fresca.
          </li>
          <li>
            <strong>Evita la comida humana:</strong> Muchos alimentos de consumo humano son tóxicos o causan desequilibrios.
          </li>
          <li>
            <strong>Consistencia:</strong> Cambia la marca o el tipo de alimento gradualmente para evitar problemas digestivos.
          </li>
        </ul>
      </section>

      {/* 🔹 CTA final */}
      <div className="text-center border-top pt-4">
        <p className="fw-bold text-muted mb-3">
          🐾 Explora nuestros alimentos premium recomendados.
        </p>
        <Link 
          to="/productos" 
          state={{ categoriaInicial: 'Alimentos' }}
          className="btn btn-success px-4"
        >
          Ver Productos de Nutrición
        </Link>
      </div>
    </div>
  )
}
