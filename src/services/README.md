# 🔌 Servicios de Microservicios

Esta carpeta contiene los servicios para conectar el frontend React con los microservicios de Spring Boot.

## 📁 Estructura

```
services/
├── apiClient.ts          # Cliente HTTP centralizado con manejo de JWT
├── usuarioService.ts     # Servicio de autenticación y usuarios (puerto 8081)
├── productosService.ts   # Servicio de productos (puerto 8082)
├── carritoService.ts     # Servicio de carrito de compras (puerto 8083)
├── pedidosService.ts     # Servicio de pedidos (puerto 8084)
└── postService.tsx       # (EJEMPLO) Servicio de prueba con JSONPlaceholder
```

## 🚀 Microservicios Disponibles

### 1. **Usuario Service** (puerto 8081)
- ✅ Registro de usuarios
- ✅ Login con JWT
- ✅ Gestión de usuarios (CRUD)
- ✅ Control de roles (ADMIN/CLIENTE)

### 2. **Productos Service** (puerto 8082)
- ✅ Listar productos
- ✅ Obtener producto por ID
- ✅ Crear, actualizar, eliminar productos (ADMIN)
- ✅ Descontar stock

### 3. **Carrito Service** (puerto 8083)
- ✅ Obtener carrito del usuario
- ✅ Agregar items al carrito
- ✅ Vaciar carrito

### 4. **Pedidos Service** (puerto 8084)
- ✅ Crear pedido desde carrito
- ✅ Listar pedidos
- ✅ Cambiar estado de pedido (ADMIN)

## 💡 Uso Básico

### Autenticación

```typescript
import { loginUsuario, logoutUsuario } from '../services/usuarioService'

// Login
const handleLogin = async () => {
  try {
    const response = await loginUsuario({
      email: 'usuario@ejemplo.com',
      password: 'password123'
    })
    console.log('Token:', response.token)
    console.log('Rol:', response.rol)
  } catch (error) {
    console.error('Error en login:', error)
  }
}

// Logout
const handleLogout = () => {
  logoutUsuario()
}
```

### Productos

```typescript
import { 
  obtenerTodosProductos, 
  crearProducto 
} from '../services/productosService'

// Listar productos
const cargarProductos = async () => {
  const productos = await obtenerTodosProductos()
  console.log(productos)
}

// Crear producto (requiere rol ADMIN)
const nuevoProducto = await crearProducto({
  nombre: 'Collar para perro',
  descripcion: 'Collar ajustable',
  precio: 15.99,
  stock: 50,
  categoria: 'Accesorios'
})
```

### Carrito

```typescript
import { 
  agregarItemCarritoActual,
  obtenerCarritoActual,
  vaciarCarritoActual
} from '../services/carritoService'

// Agregar producto al carrito
await agregarItemCarritoActual(productoId, cantidad)

// Obtener carrito
const carrito = await obtenerCarritoActual()
console.log('Total:', carrito.total)

// Vaciar carrito
await vaciarCarritoActual()
```

### Pedidos

```typescript
import { 
  crearPedidoActual,
  obtenerMisPedidos 
} from '../services/pedidosService'

// Crear pedido desde el carrito actual
const pedido = await crearPedidoActual()
console.log('Pedido creado:', pedido.id)

// Ver mis pedidos
const misPedidos = await obtenerMisPedidos()
```

## 🔑 Autenticación JWT

Los servicios manejan automáticamente el token JWT:

1. Al hacer login, el token se guarda en `localStorage`
2. Cada petición incluye el header `Authorization: Bearer <token>`
3. El backend verifica el token en cada request

## ⚙️ Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
REACT_APP_USUARIO_URL=http://localhost:8081
REACT_APP_PRODUCTOS_URL=http://localhost:8082
REACT_APP_CARRITO_URL=http://localhost:8083
REACT_APP_PEDIDOS_URL=http://localhost:8084
```

## 🛡️ Manejo de Errores

Todos los servicios lanzan errores que puedes capturar:

```typescript
try {
  const productos = await obtenerTodosProductos()
} catch (error) {
  console.error('Error:', error.message)
  // Mostrar mensaje al usuario
}
```

## 📝 TypeScript

Los tipos están definidos en `src/Types/ApiTypes.ts`:

- `UsuarioDto`
- `ProductoDto`
- `CarritoDto` / `CarritoItemDto`
- `PedidoDto` / `PedidoItemDto`
- `LoginRequest` / `LoginResponse`

## 🔄 Integración con Componentes

Ejemplo con un hook personalizado:

```typescript
import { useState, useEffect } from 'react'
import { obtenerTodosProductos } from '../services/productosService'

function ProductList() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await obtenerTodosProductos()
        setProductos(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    cargarProductos()
  }, [])

  if (loading) return <p>Cargando...</p>

  return (
    <div>
      {productos.map(p => (
        <div key={p.id}>{p.nombre} - ${p.precio}</div>
      ))}
    </div>
  )
}
```

## 🚦 Antes de Usar

1. ✅ Asegúrate de que los microservicios estén corriendo
2. ✅ Verifica que las bases de datos MySQL estén activas
3. ✅ Configura las variables de entorno
4. ✅ Haz login para obtener el token JWT

## 📚 Documentación de Microservicios

Cada microservicio tiene Swagger habilitado:

- Usuario: http://localhost:8081/swagger-ui/
- Productos: http://localhost:8082/swagger-ui/
- Carrito: http://localhost:8083/swagger-ui/
- Pedidos: http://localhost:8084/swagger-ui/
