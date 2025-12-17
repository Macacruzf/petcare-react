import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../../contexts/AuthContext'
import { CartProvider } from '../../contexts/CartContext'
import Navbar from '../../components/layout/Navbar'

// Mock de hooks
vi.mock('../../hooks/useNotificaciones', () => ({
  useNotificaciones: () => ({
    contadorNoLeidas: 3,
    notificaciones: [],
    loading: false,
  })
}))

describe('Navbar', () => {
  const renderNavbar = (usuario = null) => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Navbar />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    )
  }

  it('debería renderizar el logo y nombre de la aplicación', () => {
    renderNavbar()
    
    expect(screen.getByText('PetCare')).toBeInTheDocument()
    expect(screen.getByAltText('PetCare Logo')).toBeInTheDocument()
  })

  it('debería mostrar los enlaces de navegación principales', () => {
    renderNavbar()
    
    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText('Productos')).toBeInTheDocument()
    expect(screen.getByText('Ofertas')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
    expect(screen.getByText('Nosotros')).toBeInTheDocument()
  })

  it('debería mostrar el botón de Ingresar cuando no hay usuario autenticado', () => {
    renderNavbar()
    
    expect(screen.getByText('Ingresar')).toBeInTheDocument()
  })
})
