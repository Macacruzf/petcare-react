// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

//  Páginas Públicas y E-commerce
import Home from './pages/Home.jsx'
import Productos from './pages/Productos.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Carrito from './pages/Carrito.jsx'
import Pago from './pages/Pago.jsx'
import Gracias from './pages/Gracias.jsx'
import Login from './pages/Login.jsx'
import Registro from './pages/Registro.jsx'
import Nosotros from './pages/Nosotros.jsx'
import Contacto from './pages/Contacto.jsx'
import Ofertas from './pages/Ofertas.jsx'

// 📰Blog
import Blog from './pages/Blog.jsx'
import BlogComida from './pages/BlogComida.jsx'
import BlogVacuna from './pages/BlogVacuna.jsx'

//  Administración
import AdminRoutes from './pages/admin/AdminRoutes.jsx'

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-fill py-4">
        <Routes>
          {/* 🏠 Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          {/* 🛍️ Rutas de e-commerce */}
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/pago" element={<Pago />} />
          <Route path="/gracias" element={<Gracias />} />
          <Route path="/ofertas" element={<Ofertas />} />

          {/* 📰 Blog */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/comiendo" element={<BlogComida />} />
          <Route path="/blog/vacunas" element={<BlogVacuna />} />

          {/* 🔐 Administración protegida */}
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
