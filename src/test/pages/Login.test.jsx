import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Login from '../../pages/auth/Login'
import { AuthProvider } from '../../contexts/AuthContext'

// Mock del servicio de login
vi.mock('../../services/usuarioService', () => ({
  loginUsuario: vi.fn(() => Promise.resolve({
    id: 1,
    nombre: 'Test User',
    email: 'test@test.com',
    token: 'fake-token',
    rol: 'CLIENTE'
  }))
}))

describe('Login', () => {
  const renderLogin = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    )
  }

  it('debería renderizar el formulario de login', () => {
    const { container } = renderLogin()
    
    const emailInput = container.querySelector('input[name="correo"]')
    const passwordInput = container.querySelector('input[name="password"]')
    
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ingresar/i })).toBeInTheDocument()
  })

  it('debería mostrar error cuando los campos están vacíos', async () => {
    renderLogin()
    
    const submitButton = screen.getByRole('button', { name: /ingresar/i })
    const form = submitButton.closest('form')
    
    fireEvent.click(submitButton)
    
    // Bootstrap validation adds 'was-validated' class
    await waitFor(() => {
      expect(form).toHaveClass('was-validated')
    })
  })

  it('debería permitir escribir en los campos del formulario', () => {
    const { container } = renderLogin()
    
    const emailInput = container.querySelector('input[name="correo"]')
    const passwordInput = container.querySelector('input[name="password"]')
    
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    
    expect(emailInput.value).toBe('test@test.com')
    expect(passwordInput.value).toBe('password123')
  })

  it('debería alternar la visibilidad de la contraseña', () => {
    const { container } = renderLogin()
    
    const passwordInput = container.querySelector('input[name="password"]')
    const toggleButton = screen.getByAltText(/ver contraseña/i).closest('button')
    
    expect(passwordInput.type).toBe('password')
    
    fireEvent.click(toggleButton)
    expect(passwordInput.type).toBe('text')
    
    fireEvent.click(toggleButton)
    expect(passwordInput.type).toBe('password')
  })
})
