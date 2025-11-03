import { Link } from 'react-router-dom'
export default function AdminUsuarios(){
  const demo = [{id:1, nombre:'Francisca', correo:'fran@example.com'}]
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3>Usuarios</h3>
        <Link to="nuevo" className="btn btn-primary">Nuevo usuario</Link>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead><tr><th>ID</th><th>Nombre</th><th>Correo</th><th></th></tr></thead>
          <tbody>
            {demo.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td><td>{u.nombre}</td><td>{u.correo}</td>
                <td><Link to={String(u.id)} className="btn btn-sm btn-outline-secondary">Editar</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
