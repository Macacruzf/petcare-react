import { useParams, useNavigate } from 'react-router-dom'
export default function FormUsuario(){
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const onSubmit = (e) => {
    e.preventDefault()
    alert(isEdit ? 'Usuario actualizado' : 'Usuario creado')
    navigate('/admin/usuarios')
  }

  return (
    <form onSubmit={onSubmit} className="card card-body shadow-sm" style={{maxWidth: 640}}>
      <h3 className="mb-3">{isEdit ? 'Editar' : 'Nuevo'} usuario</h3>
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input className="form-control" defaultValue={isEdit ? 'Francisca' : ''} />
      </div>
      <div className="mb-3">
        <label className="form-label">Correo</label>
        <input type="email" className="form-control" defaultValue={isEdit ? 'fran@example.com' : ''} />
      </div>
      <button className="btn btn-primary">Guardar</button>
    </form>
  )
}
