// src/App.jsx

import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

// Páginas Públicas y de E-commerce
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

// Páginas del Blog (Índice y Detalle)
import Blog from './pages/Blog.jsx'
import BlogComida from './pages/BlogComida.jsx' // 🛑 Asegúrate que este archivo exista
import BlogVacuna from './pages/BlogVacuna.jsx' // 🛑 Asegúrate que este archivo exista

// Páginas de Administración
import AdminRoutes from './pages/admin/AdminRoutes.jsx'

export default function App() {
  return (
    // Estructura de Layout (Barra + Contenido que ocupa espacio + Pie)
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-fill py-4">
        <Routes>
          {/* Rutas de Marketing y Autenticación */}
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          {/* Rutas de E-commerce */}
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/pago" element={<Pago />} />
          <Route path="/gracias" element={<Gracias />} />

          {/* Rutas del Blog */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/comiendo" element={<BlogComida />} />
          <Route path="/blog/vacunas" element={<BlogVacuna />} />

          {/* Ruta de Administración (Anidada y Protegida) */}
          <Route path="/admin/*" element={<AdminRoutes />} />
          
        </Routes>
      </main>

      <Footer />
    </div>
  )
}