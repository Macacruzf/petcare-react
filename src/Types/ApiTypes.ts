// src/Types/ApiTypes.ts

/**
 * Interfaces que coinciden con los DTOs de los microservicios Java
 */

// ==================== USUARIO SERVICE ====================

export interface UsuarioDto {
  id?: number
  nombre: string
  apellido: string
  email: string
  password?: string // No se devuelve en respuestas, solo se envía al crear/actualizar
  direccion: string
  telefono: string
  rol?: 'ADMIN' | 'CLIENTE'
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  userId: number
  nombre: string
  apellido: string
  email: string
  rol: string
}

// ==================== PRODUCTOS SERVICE ====================

export interface CategoriaDto {
  id: number
  nombre: string
}

export interface ProductoDto {
  id?: number
  nombre: string
  descripcion: string
  precio: number
  stock: number
  categoria: CategoriaDto
  imagen?: string
  estado?: 'DISPONIBLE' | 'AGOTADO' | 'DESCONTINUADO'
}

export interface DescontarStockRequest {
  cantidad: number
}

// ==================== CARRITO SERVICE ====================

export interface CarritoDto {
  id?: number
  usuarioId: number
  items: CarritoItemDto[]
  total?: number
}

export interface CarritoItemDto {
  id?: number
  productoId: number
  cantidad: number
  precio: number
  subtotal?: number
  nombreProducto?: string
}

export interface AgregarItemRequest {
  productoId: number
  cantidad: number
}

// ==================== PEDIDOS SERVICE ====================

export interface PedidoDto {
  id?: number
  usuarioId: number
  nombreUsuario?: string
  emailUsuario?: string
  items?: PedidoItemDto[]  // Opcional para compatibilidad
  detalles?: PedidoItemDto[]  // Campo que realmente devuelve el backend
  total: number
  estado: 'PENDIENTE' | 'CONFIRMADO' | 'ENVIADO' | 'ENTREGADO' | 'CANCELADO' | 'POR_ENTREGAR'
  fechaCreacion?: string
}

export interface PedidoItemDto {
  id?: number
  productoId: number
  nombreProducto?: string
  cantidad: number
  precio?: number
  precioUnitario?: number
  subtotal?: number
}

export interface CambiarEstadoRequest {
  nuevoEstado: 'PENDIENTE' | 'CONFIRMADO' | 'ENVIADO' | 'ENTREGADO' | 'CANCELADO'
}

// ==================== RESPONSE GENERICS ====================

export interface ApiResponse<T> {
  data?: T
  message?: string
  error?: string
}

export interface ApiError {
  message: string
  status?: number
}
