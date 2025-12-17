import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '../../hooks/useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    // Resetear los mocks antes de cada test
    localStorage.clear.mockClear()
    localStorage.getItem.mockClear()
    localStorage.setItem.mockClear()
  })

  it('debería devolver el valor inicial cuando no hay nada en localStorage', () => {
    localStorage.getItem.mockReturnValue(null)
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'valor-inicial'))
    
    expect(result.current[0]).toBe('valor-inicial')
  })

  it('debería guardar y recuperar valores de localStorage', () => {
    let storedValue = null
    
    localStorage.getItem.mockImplementation(() => storedValue)
    localStorage.setItem.mockImplementation((key, value) => {
      storedValue = value
    })
    
    const { result } = renderHook(() => useLocalStorage('test-key', ''))
    
    act(() => {
      result.current[1]('nuevo-valor')
    })
    
    expect(localStorage.setItem).toHaveBeenCalledWith('test-key', JSON.stringify('nuevo-valor'))
  })

  it('debería manejar objetos complejos', () => {
    const objetoTest = { nombre: 'Test', edad: 25 }
    let storedValue = null
    
    localStorage.getItem.mockImplementation(() => storedValue)
    localStorage.setItem.mockImplementation((key, value) => {
      storedValue = value
    })
    
    const { result } = renderHook(() => useLocalStorage('test-objeto', null))
    
    act(() => {
      result.current[1](objetoTest)
    })
    
    expect(localStorage.setItem).toHaveBeenCalledWith('test-objeto', JSON.stringify(objetoTest))
  })
})
