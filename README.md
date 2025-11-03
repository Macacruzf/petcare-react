# PetCare React (Vite + Bootstrap)

Proyecto base migrado a React con Vite y Bootstrap.

## Requisitos
- Node.js 18+

## Instalación
```bash
npm install
npm run dev
```

## Estructura
- `src/components`: Navbar, Footer, ProductCard
- `src/pages`: Home, Productos, DetalleProducto, Carrito, Pago, Gracias, Login, Registro, Nosotros, Contacto, Blog
- `src/pages/admin`: AdminRoutes + pantallas CRUD de ejemplo
- `src/providers/CartContext.jsx`: carrito global
- `public/products.json`: productos demo

## Notas
- Bootstrap se importa en `main.jsx`.
- Las imágenes demo están en `public/placeholder/` (archivos vacíos).
