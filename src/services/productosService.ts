// src/services/productosService.ts

/**
 * Servicio para interactuar con el microservicio de Productos
 * Puerto: 8082
 * Endpoints implementados según ProductoController.java
 */

import { buildApiUrl, fetchApi } from './apiClient'
import { ProductoDto, DescontarStockRequest } from '../Types/ApiTypes'

const SERVICE = 'PRODUCTOS'

/**
 * Obtiene todos los productos
 * GET /productos
 */
export const obtenerTodosProductos = async (): Promise<ProductoDto[]> => {
  const url = buildApiUrl(SERVICE, '/productos')
  return fetchApi<ProductoDto[]>(url, {
    method: 'GET',
  })
}

/**
 * Obtiene un producto por ID
 * GET /productos/{id}
 */
export const obtenerProductoPorId = async (
  id: number
): Promise<ProductoDto> => {
  const url = buildApiUrl(SERVICE, `/productos/${id}`)
  return fetchApi<ProductoDto>(url, {
    method: 'GET',
  })
}

/**
 * Crea un nuevo producto (solo ADMIN)
 * POST /productos
 */
export const crearProducto = async (
  producto: ProductoDto
): Promise<ProductoDto> => {
  const url = buildApiUrl(SERVICE, '/productos')
  return fetchApi<ProductoDto>(url, {
    method: 'POST',
    body: JSON.stringify(producto),
  })
}

/**
 * Actualiza un producto existente (solo ADMIN)
 * PUT /productos/{id}
 */
export const actualizarProducto = async (
  id: number,
  producto: ProductoDto
): Promise<ProductoDto> => {
  const url = buildApiUrl(SERVICE, `/productos/${id}`)
  return fetchApi<ProductoDto>(url, {
    method: 'PUT',
    body: JSON.stringify(producto),
  })
}

/**
 * Elimina un producto (solo ADMIN)
 * DELETE /productos/{id}
 */
export const eliminarProducto = async (id: number): Promise<void> => {
  const url = buildApiUrl(SERVICE, `/productos/${id}`)
  return fetchApi<void>(url, {
    method: 'DELETE',
  })
}

/**
 * Descuenta stock de un producto
 * POST /productos/descontar/{id}
 */
export const descontarStock = async (
  id: number,
  cantidad: number
): Promise<ProductoDto> => {
  const url = buildApiUrl(SERVICE, `/productos/descontar/${id}`)
  const request: DescontarStockRequest = { cantidad }
  return fetchApi<ProductoDto>(url, {
    method: 'POST',
    body: JSON.stringify(request),
  })
}

/**
 * Filtra productos por categoría (lógica del lado del cliente)
 */
export const obtenerProductosPorCategoria = async (
  categoria: string
): Promise<ProductoDto[]> => {
  const productos = await obtenerTodosProductos()
  return productos.filter(
    (p) => p.categoria.toLowerCase() === categoria.toLowerCase()
  )
}

/**
 * Busca productos por nombre (lógica del lado del cliente)
 */
export const buscarProductosPorNombre = async (
  termino: string
): Promise<ProductoDto[]> => {
  const productos = await obtenerTodosProductos()
  return productos.filter((p) =>
    p.nombre.toLowerCase().includes(termino.toLowerCase())
  )
}

export default {
  obtenerTodosProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  descontarStock,
  obtenerProductosPorCategoria,
  buscarProductosPorNombre,
}
