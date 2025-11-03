export default function Contacto(){
  return (
    <div className="container container-narrow">
      <h2>Contacto</h2>
      <form className="card card-body shadow-sm">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nombre</label>
            <input className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Correo</label>
            <input type="email" className="form-control" />
          </div>
          <div className="col-12">
            <label className="form-label">Mensaje</label>
            <textarea className="form-control" rows="4"></textarea>
          </div>
        </div>
        <button className="btn btn-primary mt-3">Enviar</button>
      </form>
    </div>
  )
}
