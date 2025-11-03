import { Link } from 'react-router-dom'
export default function Blog(){
  const posts = [
    {id: 'comiendo', title: 'Alimentación adecuada', excerpt: 'Consejos para una dieta equilibrada.'},
    {id: 'vacunas', title: 'Calendario de vacunas', excerpt: 'Protege a tu mascota con un plan al día.'},
  ]
  return (
    <div className="container container-narrow">
      <h2>Blog</h2>
      <ul className="list-group">
        {posts.map(p => (
          <li key={p.id} className="list-group-item">
            <h6 className="mb-1">{p.title}</h6>
            <p className="mb-2 text-muted small">{p.excerpt}</p>
            <Link className="btn btn-sm btn-outline-primary" to={`/blog/${p.id}`}>Leer más</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
