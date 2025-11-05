// src/pages/Blog.jsx
import { Link } from 'react-router-dom'

export default function Blog() {
  const posts = [
    {
      id: 'comiendo',
      title: 'Alimentación adecuada',
      excerpt: 'Consejos para una dieta equilibrada y saludable.',
      image: '/placeholder/comiendo.jpg'
    },
    {
      id: 'vacunas',
      title: 'Calendario de vacunas',
      excerpt: 'Protege a tu mascota con un plan de vacunación al día.',
      image: '/placeholder/perritovacu.jpg'
    }
  ]

  return (
    <div className="container py-4 container-narrow">
      <h2 className="mb-4 text-center">Blog de PetCare</h2>

      <div className="row g-4">
        {posts.map(p => (
          <div key={p.id} className="col-12 col-md-6">
            <div className="card h-100 shadow-sm">
              {p.image && (
                <img
                  src={p.image}
                  alt={p.title}
                  className="card-img-top"
                  style={{ objectFit: 'cover', height: '180px' }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text text-muted flex-fill">{p.excerpt}</p>
                <Link className="btn btn-sm btn-primary mt-auto align-self-start" to={`/blog/${p.id}`}>
                  Leer más
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
