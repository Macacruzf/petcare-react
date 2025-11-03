export default function Registro(){
  return (
    <div className="container" style={{maxWidth: 480}}>
      <h2 className="mb-3">Registro</h2>
      <form className="card card-body shadow-sm">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input type="email" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-control" />
        </div>
        <button className="btn btn-primary">Crear cuenta</button>
      </form>
    </div>
  )
}
