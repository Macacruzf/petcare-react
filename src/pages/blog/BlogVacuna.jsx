// src/pages/blog/BlogVacuna.jsx
import { Link } from 'react-router-dom'
import perritovacu from '../../assets/images/perritovacu.jpg' 

export default function BlogVacuna() {
  return (
    <div className="container py-4 container-narrow">
      {/* Botón de regreso al índice del blog */}
      <Link to="/blog" className="btn btn-outline-success btn-sm mb-4">
        &larr; Volver al Blog
      </Link>

      <h1 className="mb-4 text-success fw-bold">
        Calendario de Vacunas: Protege a tu Mascota
      </h1>
      
      {/*  Imagen de portada del artículo */}
      <img
        src={perritovacu}
        alt="Perrito siendo vacunado"
        className="img-fluid rounded shadow-sm mb-5"
        style={{ maxHeight: '470px', width: '95%', objectFit: 'cover' }}
      />

      <div className="lead mb-4">
        Proteger a tu mascota con un plan de vacunación al día es fundamental para su salud a largo plazo.
        Las vacunas previenen enfermedades graves y contagiosas, ayudando a prolongar la vida y bienestar de tu compañero.
      </div>

      <h3 className="mt-5 mb-3">Programa de Vacunación Esencial (Perros)</h3>
      <p>
        El calendario puede variar según la región, raza y estilo de vida de tu perro,
        pero en general se recomienda el siguiente esquema:
      </p>
      <ul>
        <li>🐶 <strong>6-8 semanas:</strong> Parvovirus y Moquillo Canino.</li>
        <li>💉 <strong>10-12 semanas:</strong> Refuerzo de Parvovirus/Moquillo, Adenovirus y Parainfluenza.</li>
        <li>🦠 <strong>16 semanas:</strong> Refuerzo final y vacuna antirrábica.</li>
        <li>📅 <strong>Anual/Trienal:</strong> Refuerzo de Rabia y otras vacunas esenciales según evaluación veterinaria.</li>
      </ul>

      <h3 className="mt-5 mb-3">La Importancia de la Desparasitación</h3>
      <p>
        Junto con las vacunas, la desparasitación regular (tanto interna como externa) es fundamental.
        Los parásitos pueden causar enfermedades graves y afectar a otros animales o incluso a humanos.
        Consulta con tu veterinario para establecer un calendario de desparasitación adecuado.
      </p>

      {/* CTA */}
      <div className="text-center mt-5 p-3 border-top">
        <p className="fw-bold">¿Tienes dudas sobre el calendario de tu mascota?</p>
        <Link to="/contacto" className="btn btn-success">
          Contáctanos para una Asesoría
        </Link>
      </div>
    </div>
  )
}
