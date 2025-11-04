// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

import Home from './pages/Home.jsx'
import Productos from './pages/Productos.jsx'
import DetalleProducto from './pages/DetalleProducto.jsx'
import Carrito from './pages/Carrito.jsx'
import Pago from './pages/Pago.jsx'
import Gracias from './pages/Gracias.jsx'
import Login from './pages/Login.jsx'
import Registro from './pages/Registro.jsx'
import Nosotros from './pages/Nosotros.jsx'
import Contacto from './pages/Contacto.jsx'
import Blog from './pages/Blog.jsx'
import AdminRoutes from './pages/admin/AdminRoutes.jsx'

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* 🔹 Barra de navegación superior */}
      <Navbar />

      {/* 🔹 Contenido principal */}
      <main className="flex-fill py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/pago" element={<Pago />} />
          <Route path="/gracias" element={<Gracias />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </main>

      {/* 🔹 Pie de página */}
      <Footer />
    </div>
  )
}
