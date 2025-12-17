import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// Mock de localStorage
const localStorageMock = {
  getItem: vi.fn((key) => null),
  setItem: vi.fn((key, value) => null),
  removeItem: vi.fn((key) => null),
  clear: vi.fn(() => null),
}

global.localStorage = localStorageMock

// Limpiar después de cada test
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})
