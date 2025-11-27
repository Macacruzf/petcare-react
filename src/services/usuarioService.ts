// src/services/usuarioService.ts

/**
 * Servicio para interactuar con el microservicio de Usuarios
 * Puerto: 8081
 * Endpoints implementados según UsuarioController.java
 */

import { buildApiUrl, fetchApi } from './apiClient'
import { UsuarioDto, LoginRequest, LoginResponse } from '../Types/ApiTypes'

const SERVICE = 'USUARIO'

/**
 * Registra un nuevo usuario
 * POST /usuarios/registro
 */
export const registrarUsuario = async (
  usuario: UsuarioDto
): Promise<UsuarioDto> => {
  const url = buildApiUrl(SERVICE, '/usuarios/registro')
  return fetchApi<UsuarioDto>(url, {
    method: 'POST',
    body: JSON.stringify(usuario),
  })
}

/**
 * Inicia sesión y obtiene token JWT
 * POST /usuarios/login
 */
export const loginUsuario = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  const url = buildApiUrl(SERVICE, '/usuarios/login')
  const response = await fetchApi<LoginResponse>(url, {
    method: 'POST',
    body: JSON.stringify(credentials),
  })

  // Guardar token en localStorage
  if (response.token) {
    localStorage.setItem('token', response.token)
    localStorage.setItem('userId', response.userId.toString())
    localStorage.setItem('userRole', response.rol)
  }

  return response
}

/**
 * Cierra sesión (limpia localStorage)
 */
export const logoutUsuario = (): void => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('userRole')
}

/**
 * Obtiene un usuario por ID
 * GET /usuarios/{id}
 */
export const obtenerUsuarioPorId = async (id: number): Promise<UsuarioDto> => {
  const url = buildApiUrl(SERVICE, `/usuarios/${id}`)
  return fetchApi<UsuarioDto>(url, {
    method: 'GET',
  })
}

/**
 * Obtiene todos los usuarios (solo ADMIN)
 * GET /usuarios
 */
export const obtenerTodosUsuarios = async (): Promise<UsuarioDto[]> => {
  const url = buildApiUrl(SERVICE, '/usuarios')
  return fetchApi<UsuarioDto[]>(url, {
    method: 'GET',
  })
}

/**
 * Actualiza un usuario (solo ADMIN)
 * PUT /usuarios/{id}
 */
export const actualizarUsuario = async (
  id: number,
  usuario: UsuarioDto
): Promise<UsuarioDto> => {
  const url = buildApiUrl(SERVICE, `/usuarios/${id}`)
  return fetchApi<UsuarioDto>(url, {
    method: 'PUT',
    body: JSON.stringify(usuario),
  })
}

/**
 * Verifica si el usuario actual es administrador
 */
export const esAdministrador = (): boolean => {
  return localStorage.getItem('userRole') === 'ADMIN'
}

/**
 * Obtiene el ID del usuario actual
 */
export const obtenerUsuarioIdActual = (): number | null => {
  const userId = localStorage.getItem('userId')
  return userId ? parseInt(userId) : null
}

export default {
  registrarUsuario,
  loginUsuario,
  logoutUsuario,
  obtenerUsuarioPorId,
  obtenerTodosUsuarios,
  actualizarUsuario,
  esAdministrador,
  obtenerUsuarioIdActual,
}
