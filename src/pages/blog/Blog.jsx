// src/pages/blog/Blog.jsx
import { Link } from 'react-router-dom'
import comiendo from '../../assets/images/comiendo.jpg' 

export default function BlogComida() {
  return (
    <div className="container py-4 container-narrow">
      {/*  Botón de regreso al índice del blog */}
      <Link to="/blog" className="btn btn-outline-success btn-sm mb-4">
        &larr; Volver al Blog
      </Link>

      {/*  Contenido principal del artículo */}
      <h1 className="mb-4 text-success fw-bold">
        Nutrición para una Vida Saludable
      </h1>

      <img
        src={comiendo}
        alt="Perro y gato comiendo juntos"
        className="img-fluid rounded shadow-sm mb-5"
        style={{ maxHeight: '470px', width: '95%', objectFit: 'cover' }}
      />

      <div className="lead mb-4">
        Elegir alimentos balanceados y adecuados a la edad, tamaño y condición de tu mascota es el pilar de su bienestar.
        El agua fresca y el ejercicio complementan una buena dieta.
      </div>

      <h3 className="mt-5 mb-3">La Importancia de Elegir Bien</h3>
      <p>
        Los requerimientos nutricionales cambian a lo largo de la vida de tu mascota.
        Un cachorro o gatito necesita más proteínas y grasas para el desarrollo, mientras que un animal senior requiere
        fórmulas bajas en calorías para prevenir el sobrepeso.
      </p>

      <h3 className="mt-5 mb-3">Consejos de Alimentación</h3>
      <ul>
        <li> <strong>Porciones controladas:</strong> Evita la sobrealimentación revisando las guías del empaque.</li>
        <li> <strong>Agua siempre disponible:</strong> Mantén un recipiente con agua limpia y fresca.</li>
        <li><strong>Evita la comida humana:</strong> Muchos alimentos de consumo humano son tóxicos o causan desequilibrios.</li>
        <li> <strong>Consistencia:</strong> Cambia la marca o el tipo de alimento gradualmente para evitar problemas digestivos.</li>
      </ul>

      {/* CTA */}
      <div className="text-center mt-5 p-3 border-top">
        <p className="fw-bold">🐶 Explora nuestros alimentos premium recomendados.</p>
        <Link to="/productos" className="btn btn-success">
          Ver Productos de Nutrición
        </Link>
      </div>
    </div>
  )
}
