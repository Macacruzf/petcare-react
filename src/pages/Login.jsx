import { Link } from 'react-router-dom'
export default function Login(){
  return (
    <div className="container" style={{maxWidth: 480}}>
      <h2 className="mb-3">Ingresar</h2>
      <form className="card card-body shadow-sm">
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input type="email" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-control" />
        </div>
        <button className="btn btn-primary">Ingresar</button>
        <p className="text-center mt-3 small">¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
      </form>
    </div>
  )
}
