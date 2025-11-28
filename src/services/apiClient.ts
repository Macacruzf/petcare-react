// src/services/apiClient.ts

/**
 * Configuración centralizada para conectar con los microservicios de Spring Boot
 * Los microservicios corren en diferentes puertos:
 * - Usuario: 8081
 * - Productos: 8082
 * - Carrito: 8083
 * - Pedidos: 8084
 */

// URLs base de los microservicios (en producción usar variables de entorno)
const MICROSERVICES = {
  USUARIO: import.meta.env.VITE_USUARIO_URL || 'http://localhost:8081',
  PRODUCTOS: import.meta.env.VITE_PRODUCTOS_URL || 'http://localhost:8082',
  CARRITO: import.meta.env.VITE_CARRITO_URL || 'http://localhost:8083',
  PEDIDOS: import.meta.env.VITE_PEDIDOS_URL || 'http://localhost:8084',
}

/**
 * Construye la URL completa para un endpoint específico
 * @param service - Nombre del microservicio
 * @param path - Ruta del endpoint (debe empezar con /)
 */
export const buildApiUrl = (
  service: keyof typeof MICROSERVICES,
  path: string
): string => {
  return `${MICROSERVICES[service]}${path}`
}

/**
 * Obtiene los headers comunes para las peticiones
 * (Sin JWT - autenticación por roles solamente)
 */
export const getAuthHeaders = (): HeadersInit => {
  return {
    'Content-Type': 'application/json',
  }
}

/**
 * Función helper para hacer peticiones HTTP con manejo de errores
 */
export const fetchApi = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...getAuthHeaders(),
        ...options?.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: `HTTP ${response.status}: ${response.statusText}`,
      }))
      throw new Error(error.message || 'Error en la petición')
    }

    // Si la respuesta es 204 No Content, retornar null
    if (response.status === 204) {
      return null as T
    }

    return await response.json()
  } catch (error) {
    console.error('Error en fetchApi:', error)
    throw error
  }
}

export default { buildApiUrl, getAuthHeaders, fetchApi, MICROSERVICES }
