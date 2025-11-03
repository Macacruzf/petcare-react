import { Link } from 'react-router-dom'
export default function Home(){
  return (
    <div className="container container-narrow">
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-6 fw-bold">Bienvenido a PetCare</h1>
          <p className="col-md-10 fs-5">Tienda de productos para tu mascota. React + Vite + Bootstrap.</p>
          <Link to="/productos" className="btn btn-primary btn-lg">Ver productos</Link>
        </div>
      </div>
    </div>
  )
}
