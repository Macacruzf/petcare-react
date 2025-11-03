import { useParams, useNavigate } from 'react-router-dom'
export default function FormProducto(){
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const onSubmit = (e) => {
    e.preventDefault()
    alert(isEdit ? 'Producto actualizado' : 'Producto creado')
    navigate('/admin/productos')
  }

  return (
    <form onSubmit={onSubmit} className="card card-body shadow-sm" style={{maxWidth: 640}}>
      <h3 className="mb-3">{isEdit ? 'Editar' : 'Nuevo'} producto</h3>
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input className="form-control" defaultValue={isEdit ? 'Demo' : ''} />
      </div>
      <div className="mb-3">
        <label className="form-label">Precio</label>
        <input type="number" className="form-control" defaultValue={isEdit ? 12990 : ''} />
      </div>
      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea className="form-control" rows="3"></textarea>
      </div>
      <button className="btn btn-primary">Guardar</button>
    </form>
  )
}
