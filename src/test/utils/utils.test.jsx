import { describe, it, expect } from 'vitest'

// Utilidades de testing
export const formatearPrecio = (precio) => {
  return `$${precio.toLocaleString('es-CL')}`
}

export const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

describe('Utilidades', () => {
  describe('formatearPrecio', () => {
    it('debería formatear precios correctamente', () => {
      expect(formatearPrecio(5990)).toBe('$5.990')
      expect(formatearPrecio(15000)).toBe('$15.000')
      expect(formatearPrecio(100)).toBe('$100')
    })
  })

  describe('validarEmail', () => {
    it('debería validar emails correctos', () => {
      expect(validarEmail('test@example.com')).toBe(true)
      expect(validarEmail('usuario@dominio.cl')).toBe(true)
    })

    it('debería rechazar emails inválidos', () => {
      expect(validarEmail('invalid')).toBe(false)
      expect(validarEmail('test@')).toBe(false)
      expect(validarEmail('@example.com')).toBe(false)
    })
  })
})
