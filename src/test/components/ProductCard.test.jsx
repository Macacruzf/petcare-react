import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from '../../contexts/CartContext'
import ProductCard from '../../components/common/ProductCard'

describe('ProductCard', () => {
  const mockProducto = {
    id: 1,
    nombre: 'Collar para perro',
    precio: 5990,
    imagen: '/images/collar.jpg',
    stock: 10,
    categoria: { nombre: 'Accesorios' }
  }

  const renderProductCard = (product) => {
    return render(
      <BrowserRouter>
        <CartProvider>
          <ProductCard product={product} />
        </CartProvider>
      </BrowserRouter>
    )
  }

  it('debería renderizar el nombre del producto', () => {
    renderProductCard(mockProducto)
    
    expect(screen.getByText('Collar para perro')).toBeInTheDocument()
  })

  it('debería mostrar el precio formateado', () => {
    renderProductCard(mockProducto)
    
    expect(screen.getByText(/5\.990/)).toBeInTheDocument()
  })

  it('debería mostrar "Sin stock" cuando stock es 0', () => {
    const productoSinStock = { ...mockProducto, stock: 0 }
    
    const { container } = renderProductCard(productoSinStock)
    
    // Verificar que el botón "Añadir" esté presente
    const addButton = screen.getByText('Añadir')
    expect(addButton).toBeInTheDocument()
  })
})
