// src/pages/BlogComida.jsx
import { Link } from 'react-router-dom';

export default function BlogComida() {
  return (
    <div className="container py-4 container-narrow">
      {/* ⬅️ Botón de regreso al índice del blog */}
      <Link to="/blog" className="btn btn-outline-primary btn-sm mb-4">
        &larr; Volver al Blog
      </Link>

      {/* 🖼️ Contenido principal del artículo */}
      <h1 className="mb-4 text-petcare-dark fw-bold">
        Nutrición para una Vida Saludable
      </h1>
      
      {/* 🛑 Nota: La imagen cargará desde el mismo archivo placeholder/comiendo.jpg 
          que definiste en el índice del blog, si lo tienes en tu carpeta public. */}
      <img 
        src="/placeholder/comiendo.jpg" 
        alt="Perro y gato comiendo juntos" 
        className="img-fluid rounded shadow-sm mb-5"
        style={{ maxHeight: '470px', width: '95%', objectFit: 'cover' }}
      />
      
      <div className="lead mb-4">
        Elegir alimentos balanceados y adecuados a la edad, tamaño y condición de tu mascota es el pilar de su bienestar. El agua fresca y el ejercicio complementan una buena dieta.
      </div>

      <h3 className="mt-5 mb-3">La Importancia de Elegir Bien</h3>
      <p>
        Los requerimientos nutricionales cambian a lo largo de la vida de tu mascota. Un cachorro o gatito necesita más proteínas y grasas para el desarrollo, mientras que un animal senior requiere fórmulas bajas en calorías para prevenir el sobrepeso.
      </p>

      <h3 className="mt-5 mb-3">Consejos de Alimentación</h3>
      <ul>
        <li>Porciones controladas: Evita la sobrealimentación revisando las guías del empaque.</li>
        <li>Agua siempre disponible: Mantén un recipiente con agua limpia y fresca.</li>
        <li>Evita la comida humana: Muchos alimentos de consumo humano son tóxicos o causan desequilibrios.</li>
        <li>Consistencia: Cambia la marca o el tipo de alimento gradualmente para evitar problemas digestivos.</li>
      </ul>

      {/* Botón de acción o CTA */}
      <div className="text-center mt-5 p-3 border-top">
        <p className="fw-bold">Explora nuestros alimentos premium recomendados.</p>
        <Link to="/productos" className="btn btn-primary">
          Ver Productos de Nutrición
        </Link>
      </div>

    </div>
  );
}