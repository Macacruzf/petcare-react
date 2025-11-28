// src/services/pedidosService.ts

/**
 * Servicio para interactuar con el microservicio de Pedidos
 * Puerto: 8084
 * Endpoints implementados según PedidoController.java
 */

import { buildApiUrl, fetchApi } from './apiClient'
import { PedidoDto, CambiarEstadoRequest } from '../Types/ApiTypes'

const SERVICE = 'PEDIDOS'

/**
 * Crea un pedido desde el carrito del usuario
 * POST /pedidos/crear/{usuarioId}
 */
export const crearPedidoDesdeCarrito = async (
  usuarioId: number
): Promise<PedidoDto> => {
  const url = buildApiUrl(SERVICE, `/pedidos/crear/${usuarioId}`)
  return fetchApi<PedidoDto>(url, {
    method: 'POST',
  })
}

/**
 * Obtiene un pedido por ID
 * GET /pedidos/{id}
 */
export const obtenerPedidoPorId = async (id: number): Promise<PedidoDto> => {
  const url = buildApiUrl(SERVICE, `/pedidos/${id}`)
  return fetchApi<PedidoDto>(url, {
    method: 'GET',
  })
}

/**
 * Obtiene todos los pedidos (solo ADMIN)
 * GET /pedidos
 */
export const obtenerTodosPedidos = async (): Promise<PedidoDto[]> => {
  const url = buildApiUrl(SERVICE, '/pedidos')
  return fetchApi<PedidoDto[]>(url, {
    method: 'GET',
  })
}

/**
 * Obtiene los pedidos de un usuario específico
 * GET /pedidos/usuario/{usuarioId}
 */
export const obtenerPedidosPorUsuario = async (
  usuarioId: number
): Promise<PedidoDto[]> => {
  const url = buildApiUrl(SERVICE, `/pedidos/usuario/${usuarioId}`)
  return fetchApi<PedidoDto[]>(url, {
    method: 'GET',
  })
}

/**
 * Cambia el estado de un pedido (solo ADMIN)
 * PUT /pedidos/{id}/estado?estado=NUEVO_ESTADO
 * Query param: estado
 */
export const cambiarEstadoPedido = async (
  id: number,
  nuevoEstado: 'PENDIENTE' | 'CONFIRMADO' | 'ENVIADO' | 'ENTREGADO' | 'CANCELADO'
): Promise<PedidoDto> => {
  const url = buildApiUrl(SERVICE, `/pedidos/${id}/estado?estado=${nuevoEstado}`)
  return fetchApi<PedidoDto>(url, {
    method: 'PUT',
  })
}

/**
 * Crea un pedido para el usuario actual
 */
export const crearPedidoActual = async (): Promise<PedidoDto> => {
  const userId = localStorage.getItem('userId')
  if (!userId) {
    throw new Error('Usuario no autenticado')
  }
  return crearPedidoDesdeCarrito(parseInt(userId))
}

/**
 * Obtiene los pedidos del usuario actual
 */
export const obtenerMisPedidos = async (): Promise<PedidoDto[]> => {
  const userId = localStorage.getItem('userId')
  if (!userId) {
    throw new Error('Usuario no autenticado')
  }
  return obtenerPedidosPorUsuario(parseInt(userId))
}

/**
 * Filtra pedidos por estado
 */
export const filtrarPedidosPorEstado = (
  pedidos: PedidoDto[],
  estado: 'PENDIENTE' | 'CONFIRMADO' | 'ENVIADO' | 'ENTREGADO' | 'CANCELADO'
): PedidoDto[] => {
  return pedidos.filter((pedido) => pedido.estado === estado)
}

/**
 * Calcula el total de un pedido
 */
export const calcularTotalPedido = (pedido: PedidoDto): number => {
  // El backend devuelve 'detalles' en lugar de 'items'
  const items = (pedido as any).detalles || pedido.items || []
  if (!items || items.length === 0) return pedido.total || 0
  
  return items.reduce((total: number, item: any) => {
    const precio = item.precioUnitario || item.precio || 0
    return total + precio * item.cantidad
  }, 0)
}

/**
 * Formatea la fecha del pedido
 */
export const formatearFechaPedido = (fecha: string): string => {
  return new Date(fecha).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default {
  crearPedidoDesdeCarrito,
  obtenerPedidoPorId,
  obtenerTodosPedidos,
  obtenerPedidosPorUsuario,
  cambiarEstadoPedido,
  crearPedidoActual,
  obtenerMisPedidos,
  filtrarPedidosPorEstado,
  calcularTotalPedido,
  formatearFechaPedido,
}
