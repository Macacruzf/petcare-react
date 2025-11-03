import { Link } from 'react-router-dom'
export default function AdminProductos(){
  const demo = [{id:1, nombre:'Arnés', precio:12990}, {id:2, nombre:'Cama', precio:34990}]
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3>Productos</h3>
        <Link to="nuevo" className="btn btn-primary">Nuevo producto</Link>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead><tr><th>ID</th><th>Nombre</th><th>Precio</th><th></th></tr></thead>
          <tbody>
            {demo.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td><td>{p.nombre}</td><td>${p.precio.toLocaleString()}</td>
                <td><Link to={String(p.id)} className="btn btn-sm btn-outline-secondary">Editar</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
