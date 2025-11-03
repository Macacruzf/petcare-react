import { useCart } from '../providers/CartContext.jsx'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Pago(){
  const { items, total, clear } = useCart()
  const [nombre, setNombre] = useState('')
  const [direccion, setDireccion] = useState('')
  const [tarjeta, setTarjeta] = useState('')
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    if (!nombre || !direccion || !tarjeta) return alert('Completa todos los campos.')
    clear()
    navigate('/gracias')
  }

  if (items.length === 0) {
    return <div className="container">Tu carrito está vacío.</div>
  }

  return (
    <div className="container">
      <h2>Pago</h2>
      <div className="row g-4">
        <div className="col-md-7">
          <form onSubmit={onSubmit} className="card card-body shadow-sm">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Dirección</label>
              <input className="form-control" value={direccion} onChange={e => setDireccion(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Tarjeta</label>
              <input className="form-control" value={tarjeta} onChange={e => setTarjeta(e.target.value)} placeholder="**** **** **** 1234" />
            </div>
            <button className="btn btn-primary">Pagar ${total.toLocaleString()}</button>
          </form>
        </div>
        <div className="col-md-5">
          <div className="card card-body shadow-sm">
            <h5>Resumen</h5>
            <ul className="list-group list-group-flush">
              {items.map(i => <li key={i.id} className="list-group-item d-flex justify-content-between">
                <span>{i.name} x{i.qty}</span><span>${(i.qty * i.price).toLocaleString()}</span>
              </li>)}
            </ul>
            <div className="pt-3 text-end">
              <strong>Total: ${total.toLocaleString()}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
