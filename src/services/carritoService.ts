// src/services/carritoService.ts

/**
 * Servicio para interactuar con el microservicio de Carrito
 * Puerto: 8083
 * Endpoints implementados según CarritoController.java
 */

import { buildApiUrl, fetchApi } from './apiClient'
import { CarritoDto, AgregarItemRequest } from '../Types/ApiTypes'

const SERVICE = 'CARRITO'

/**
 * Obtiene el carrito de un usuario
 * GET /carrito/{usuarioId}
 */
export const obtenerCarritoPorUsuario = async (
  usuarioId: number
): Promise<CarritoDto> => {
  const url = buildApiUrl(SERVICE, `/carrito/${usuarioId}`)
  return fetchApi<CarritoDto>(url, {
    method: 'GET',
  })
}

/**
 * Agrega un item al carrito
 * POST /carrito/{usuarioId}/agregar
 * Body: { productoId, cantidad }
 */
export const agregarItemAlCarrito = async (
  usuarioId: number,
  productoId: number,
  cantidad: number
): Promise<CarritoDto> => {
  const url = buildApiUrl(SERVICE, `/carrito/${usuarioId}/agregar`)
  const request: AgregarItemRequest = { productoId, cantidad }
  return fetchApi<CarritoDto>(url, {
    method: 'POST',
    body: JSON.stringify(request),
  })
}

/**
 * Vacía el carrito de un usuario
 * DELETE /carrito/{usuarioId}/vaciar
 */
export const vaciarCarrito = async (usuarioId: number): Promise<void> => {
  const url = buildApiUrl(SERVICE, `/carrito/${usuarioId}/vaciar`)
  return fetchApi<void>(url, {
    method: 'DELETE',
  })
}

/**
 * Obtiene el carrito del usuario actual (usando localStorage)
 */
export const obtenerCarritoActual = async (): Promise<CarritoDto | null> => {
  const userId = localStorage.getItem('userId')
  if (!userId) {
    throw new Error('Usuario no autenticado')
  }
  return obtenerCarritoPorUsuario(parseInt(userId))
}

/**
 * Agrega item al carrito del usuario actual
 */
export const agregarItemCarritoActual = async (
  productoId: number,
  cantidad: number
): Promise<CarritoDto> => {
  const userId = localStorage.getItem('userId')
  if (!userId) {
    throw new Error('Usuario no autenticado')
  }
  return agregarItemAlCarrito(parseInt(userId), productoId, cantidad)
}

/**
 * Vacía el carrito del usuario actual
 */
export const vaciarCarritoActual = async (): Promise<void> => {
  const userId = localStorage.getItem('userId')
  if (!userId) {
    throw new Error('Usuario no autenticado')
  }
  return vaciarCarrito(parseInt(userId))
}

/**
 * Calcula el total del carrito
 */
export const calcularTotalCarrito = (carrito: CarritoDto): number => {
  return carrito.items.reduce((total, item) => {
    return total + item.precio * item.cantidad
  }, 0)
}

/**
 * Cuenta la cantidad total de items en el carrito
 */
export const contarItemsCarrito = (carrito: CarritoDto): number => {
  return carrito.items.reduce((count, item) => count + item.cantidad, 0)
}

export default {
  obtenerCarritoPorUsuario,
  agregarItemAlCarrito,
  vaciarCarrito,
  obtenerCarritoActual,
  agregarItemCarritoActual,
  vaciarCarritoActual,
  calcularTotalCarrito,
  contarItemsCarrito,
}
