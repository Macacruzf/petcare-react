// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'

//  Páginas Públicas
import Home from './pages/public/Home.jsx'
import Nosotros from './pages/public/Nosotros.jsx'
import Contacto from './pages/public/Contacto.jsx'

// E-commerce / Shop
import Productos from './pages/shop/Productos.jsx'
import ProductDetail from './pages/shop/ProductDetail.jsx'
import Carrito from './pages/shop/Carrito.jsx'
import Pago from './pages/shop/Pago.jsx'
import Gracias from './pages/shop/Gracias.jsx'
import Ofertas from './pages/shop/Ofertas.jsx'
import MisPedidos from './pages/shop/MisPedidos.jsx'

// Auth
import Login from './pages/auth/Login.jsx'
import Registro from './pages/auth/Registro.jsx'
import Perfil from './pages/auth/Perfil.jsx'

// Blog
import Blog from './pages/blog/Blog.jsx'
import BlogComida from './pages/blog/BlogComida.jsx'
import BlogVacuna from './pages/blog/BlogVacuna.jsx'

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
          <Route path="/perfil" element={<Perfil />} />

          {/* 🛍️ Rutas de e-commerce */}
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/pago" element={<Pago />} />
          <Route path="/gracias" element={<Gracias />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/mis-pedidos" element={<MisPedidos />} />

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
