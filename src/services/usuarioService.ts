/**
 * Servicio para interactuar con el microservicio de Usuarios
 * Puerto: 8081
 */

import { buildApiUrl, fetchApi } from './apiClient'
import { UsuarioDto, LoginRequest, LoginResponse } from '../Types/ApiTypes'

const SERVICE = 'USUARIO'

// ======================================================
// REGISTRO
// POST /usuarios/registro
// ======================================================
export const registrarUsuario = async (
  usuario: UsuarioDto
): Promise<UsuarioDto> => {
  const url = buildApiUrl(SERVICE, '/usuarios/registro')
  return fetchApi<UsuarioDto>(url, {
    method: 'POST',
    body: JSON.stringify(usuario),
  })
}

// ======================================================
// LOGIN
// POST /usuarios/login
// ======================================================
export const loginUsuario = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  const url = buildApiUrl(SERVICE, '/usuarios/login')

  const response = await fetchApi<LoginResponse>(url, {
    method: 'POST',
    body: JSON.stringify(credentials),
  })

  // Guardar sesión
  localStorage.setItem('userId', response.userId.toString())
  localStorage.setItem('userRole', response.rol)
  localStorage.setItem('userName', response.nombre)
  localStorage.setItem('token', response.token) // JWT

  return response
}

// ======================================================
// LOGOUT
// ======================================================
export const logoutUsuario = (): void => {
  localStorage.removeItem('userId')
  localStorage.removeItem('userRole')
  localStorage.removeItem('userName')
  localStorage.removeItem('token')
}

// ======================================================
// OBTENER USUARIO POR ID
// GET /usuarios/{id}
// ======================================================
export const obtenerUsuarioPorId = async (id: number): Promise<UsuarioDto> => {
  const url = buildApiUrl(SERVICE, `/usuarios/${id}`)
  return fetchApi<UsuarioDto>(url, { method: 'GET' })
}

// ======================================================
// LISTAR USUARIOS
// GET /usuarios
// ======================================================
export const obtenerTodosUsuarios = async (): Promise<UsuarioDto[]> => {
  const url = buildApiUrl(SERVICE, '/usuarios')
  return fetchApi<UsuarioDto[]>(url, { method: 'GET' })
}

// ======================================================
// ACTUALIZAR USUARIO
// PUT /usuarios/{id}
// ======================================================
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

// ======================================================
// UTILIDADES
// ======================================================
export const esAdministrador = (): boolean => {
  return localStorage.getItem('userRole') === 'ADMIN'
}

export const obtenerUsuarioIdActual = (): number | null => {
  const userId = localStorage.getItem('userId')
  return userId ? parseInt(userId) : null
}

// ======================================================
// CAMBIAR CONTRASEÑA (JWT)
// PUT /usuarios/cambiar-password
// ======================================================
export const cambiarPassword = async (
  passwordActual: string,
  passwordNueva: string
): Promise<void> => {
  const url = buildApiUrl(SERVICE, '/usuarios/cambiar-password')

  return fetchApi<void>(url, {
    method: 'PUT',
    body: JSON.stringify({
      passwordActual,
      passwordNueva,
    }),
  })
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
  cambiarPassword,
}
