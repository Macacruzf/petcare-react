// src/pages/BlogVacuna.jsx
import { Link } from 'react-router-dom';

export default function BlogVacuna() {
  return (
    <div className="container py-4 container-narrow">
      {/* ⬅️ Botón de regreso al índice del blog */}
      <Link to="/blog" className="btn btn-outline-primary btn-sm mb-4">
        &larr; Volver al Blog
      </Link>

      <h1 className="mb-4 text-petcare-dark fw-bold">
        Calendario de Vacunas: Protege a tu Mascota
      </h1>
      
      {/* 🖼️ Imagen de portada del artículo */}
      <img 
        src="/placeholder/perritovacu.jpg" 
        alt="Perrito siendo vacunado" 
        className="img-fluid rounded shadow-sm mb-5"
        style={{ maxHeight: '470px', width: '95%', objectFit: 'cover' }}
      />
      
      <div className="lead mb-4">
        Proteger a tu mascota con un plan de vacunación al día es fundamental para su salud a largo plazo. Las vacunas previenen enfermedades graves y contagiosas.
      </div>

      <h3 className="mt-5 mb-3">Programa de Vacunación Esencial (Perros)</h3>
      <p>
        El calendario puede variar según la región y el estilo de vida de tu perro, pero generalmente incluye:
      </p>
      <ul>
        <li>6-8 Semanas: Parvovirus, Moquillo Canino.</li>
        <li>10-12 Semanas: Refuerzo de Parvovirus/Moquillo, Adenovirus, Parainfluenza.</li>
        <li>16 Semanas: Refuerzo final y Rabia.</li>
        <li>Anual/Trienal: Refuerzo de Rabia y otras vacunas esenciales.</li>
      </ul>

      <h3 className="mt-5 mb-3">La Importancia de la Desparasitación</h3>
      <p>
        Junto con las vacunas, la desparasitación regular (interna y externa) es crucial. Consulta a tu veterinario para establecer un régimen adecuado.
      </p>

      {/* Botón de acción o CTA */}
      <div className="text-center mt-5 p-3 border-top">
        <p className="fw-bold">¿Tienes dudas sobre el calendario de tu mascota?</p>
        <Link to="/contacto" className="btn btn-primary">
          Contáctanos para una Asesoría
        </Link>
      </div>

    </div>
  );
}