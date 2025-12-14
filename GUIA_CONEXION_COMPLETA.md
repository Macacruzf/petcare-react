# 🔗 Guía de Conexión Completa - React + Microservicios

Esta guía explica cómo conectar correctamente tu frontend React (Vite) con los microservicios de Spring Boot del sistema PetCare, incluyendo el flujo completo de autenticación JWT, gestión de carrito y creación de pedidos.

---

## 📋 Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────┐
│                    NAVEGADOR WEB                         │
│              http://localhost:5173                       │
│                  (React + Vite)                          │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTP Requests (fetch)
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
┌───────────────┐         ┌───────────────┐
│  src/services │         │   apiClient   │
│               │◄────────┤   (JWT Auth)  │
└───────┬───────┘         └───────────────┘
        │
        │ Servicios React (TypeScript)
        │
        ├─── usuarioService.ts    ──► http://localhost:8081 (Usuario)
        ├─── productosService.ts  ──► http://localhost:8082 (Productos)
        ├─── carritoService.ts    ──► http://localhost:8083 (Carrito)
        └─── pedidosService.ts    ──► http://localhost:8084 (Pedidos)
                │
                │ REST API + JWT
                │
        ┌───────┴──────────────────────────────────┐
        │                                           │
        ▼                                           ▼
┌────────────────┐  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│   Usuario      │  │   Productos    │  │    Carrito     │  │    Pedidos     │
│   Service      │  │   Service      │  │    Service     │  │    Service     │
│   (8081)       │  │   (8082)       │  │    (8083)      │  │    (8084)      │
│ Spring Boot    │  │ Spring Boot    │  │  Spring Boot   │  │  Spring Boot   │
└───────┬────────┘  └───────┬────────┘  └───────┬────────┘  └───────┬────────┘
        │                   │                    │                   │
        ▼                   ▼                    ▼                   ▼
┌────────────────┐  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│ react_usuario  │  │ react_producto │  │ react_carrito  │  │ react_pedido   │
│    (MySQL)     │  │    (MySQL)     │  │    (MySQL)     │  │    (MySQL)     │
└────────────────┘  └────────────────┘  └────────────────┘  └────────────────┘
```

---

## 🚀 Paso 1: Iniciar Todo en el Orden Correcto

### 1.1 Iniciar MySQL

Asegúrate de que MySQL esté corriendo en tu sistema:

```bash
# Windows (PowerShell como Administrador)
net start MySQL80
# O: net start MySQL

# Mac
mysql.server start
# O: brew services start mysql

# Linux
sudo systemctl start mysql
# O: sudo service mysql start
```

**Verificar que MySQL está corriendo:**
```bash
mysql -u root -p
# Ingresa tu contraseña
# Si ves: mysql> significa que está corriendo correctamente
```

### 1.2 Verificar Bases de Datos

Asegúrate de que las 4 bases de datos estén creadas:

```sql
SHOW DATABASES;
-- Deberías ver:
-- react_usuario
-- react_producto
-- react_carrito
-- react_pedido
```

Si no existen, créalas:
```sql
CREATE DATABASE react_usuario;
CREATE DATABASE react_producto;
CREATE DATABASE react_carrito;
CREATE DATABASE react_pedido;
```

### 1.3 Iniciar Microservicios (4 terminales separadas)

**⚠️ IMPORTANTE**: Inicia en este orden para evitar errores de dependencias.

#### Terminal 1 - Usuario Service (puerto 8081)
```bash
cd microservicio_react_petcare/usuario/usuario
# Windows
mvnw.cmd spring-boot:run
# Mac/Linux
./mvnw spring-boot:run
```
✅ Espera hasta ver: `Started UsuarioApplication in X.XXX seconds`

#### Terminal 2 - Productos Service (puerto 8082)
```bash
cd microservicio_react_petcare/productos/productos
# Windows
mvnw.cmd spring-boot:run
# Mac/Linux
./mvnw spring-boot:run
```
✅ Espera hasta ver: `Started ProductosApplication in X.XXX seconds`

#### Terminal 3 - Carrito Service (puerto 8083)
```bash
cd microservicio_react_petcare/carrito/carrito
# Windows
mvnw.cmd spring-boot:run
# Mac/Linux
./mvnw spring-boot:run
```
✅ Espera hasta ver: `Started CarritoApplication in X.XXX seconds`

#### Terminal 4 - Pedidos Service (puerto 8084)
```bash
cd microservicio_react_petcare/pedidos/pedidos
# Windows
mvnw.cmd spring-boot:run
# Mac/Linux
./mvnw spring-boot:run
```
✅ Espera hasta ver: `Started PedidosApplication in X.XXX seconds`

### 1.4 Iniciar React Frontend (terminal 5)

```bash
# Terminal 5 - React Frontend (puerto 5173)
cd petcare-react
npm run dev
```

✅ Espera hasta ver:
```
  VITE v5.4.8  ready in 523 ms
  ➜  Local:   http://localhost:5173/
```

### 📋 Checklist de Inicio

Verifica que todo esté corriendo:

- [ ] ✅ MySQL en puerto 3306
- [ ] ✅ Usuario Service en puerto 8081
- [ ] ✅ Productos Service en puerto 8082
- [ ] ✅ Carrito Service en puerto 8083
- [ ] ✅ Pedidos Service en puerto 8084
- [ ] ✅ React Frontend en puerto 5173

---

## ✅ Paso 2: Verificar la Conexión

### 2.1 Verificar Microservicios con Health Endpoint

Cada microservicio tiene un endpoint de salud para verificar su estado.

**Opción A - Desde el navegador:**

Abre estas URLs en tu navegador:
- http://localhost:8081/actuator/health → Usuario Service
- http://localhost:8082/actuator/health → Productos Service
- http://localhost:8083/actuator/health → Carrito Service
- http://localhost:8084/actuator/health → Pedidos Service

**Respuesta esperada:**
```json
{"status":"UP"}
```

**Opción B - Desde PowerShell/CMD:**

```bash
# Verificar todos los servicios
curl http://localhost:8081/actuator/health
curl http://localhost:8082/actuator/health
curl http://localhost:8083/actuator/health
curl http://localhost:8084/actuator/health
```

**Si alguno responde con error:**
- ❌ `Could not connect` → El servicio no está corriendo
- ❌ `Connection refused` → El puerto no está escuchando
- ✅ `{"status":"UP"}` → Todo correcto

### 2.2 Verificar React Frontend

Abre en tu navegador: **http://localhost:5173/**

✅ **Deberías ver:**
- Logo de PetCare
- Navbar con menú de navegación
- Página principal con productos destacados
- Footer con información de contacto

❌ **Si no carga:**
- Verifica que `npm run dev` esté corriendo
- Revisa la consola del terminal por errores
- Verifica que el puerto 5173 no esté ocupado

### 2.3 Verificar Documentación Swagger (Opcional)

Spring Boot incluye Swagger UI para probar los endpoints:

- **Usuario Service**: http://localhost:8081/swagger-ui/index.html
- **Productos Service**: http://localhost:8082/swagger-ui/index.html
- **Carrito Service**: http://localhost:8083/swagger-ui/index.html
- **Pedidos Service**: http://localhost:8084/swagger-ui/index.html

Aquí puedes:
- 📖 Ver todos los endpoints disponibles
- 🧪 Probar peticiones directamente desde el navegador
- 📝 Ver los modelos de datos (DTOs)

### 2.4 Verificar Conectividad desde React

Abre DevTools en el navegador (F12) y ejecuta en la consola:

```javascript
// Test rápido de conectividad
fetch('http://localhost:8082/productos')
  .then(res => res.json())
  .then(data => console.log('✅ Productos cargados:', data.length))
  .catch(err => console.error('❌ Error de conexión:', err))
```

✅ **Si ves**: `✅ Productos cargados: 10` → Todo está conectado correctamente

❌ **Si ves error**: Revisa que los microservicios estén corriendo

---

## 🔐 Paso 3: Flujo de Autenticación Completo (JWT)

### 3.1 Registro de Usuario

#### Frontend (React) - `src/pages/auth/Registro.jsx`

```javascript
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registrarUsuario } from '../../services/usuarioService'
import { useForm } from '../../hooks'

export default function Registro() {
  const navigate = useNavigate()

  const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm(
    {
      nombre: '',
      apellido: '',
      email: '',
      password: '',
      direccion: '',
      telefono: '',
      rol: 'CLIENTE'
    },
    async (formValues) => {
      // 🔹 Llamar al servicio de registro
      await registrarUsuario(formValues)
      
      // ✅ Registro exitoso
      alert('¡Registro exitoso! Ahora puedes iniciar sesión')
      navigate('/login')
    }
  )

  return (
    <form onSubmit={handleSubmit}>
      {/* Formulario de registro */}
      <input name="nombre" value={values.nombre} onChange={handleChange} required />
      <input name="email" type="email" value={values.email} onChange={handleChange} required />
      <input name="password" type="password" value={values.password} onChange={handleChange} required />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Registrando...' : 'Registrarse'}
      </button>
    </form>
  )
}
```

#### Servicio - `src/services/usuarioService.ts`

```typescript
import { apiClient } from './apiClient'

export const registrarUsuario = async (userData: any) => {
  const response = await apiClient.post('/usuarios/registro', userData)
  return response.data
}
```

#### Backend responde (Spring Boot)

**Endpoint**: POST `http://localhost:8081/usuarios/registro`

**Request Body**:
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@ejemplo.com",
  "password": "password123",
  "direccion": "Calle Falsa 123",
  "telefono": "123456789",
  "rol": "CLIENTE"
}
```

**Response** (201 Created):
```json
{
  "id": 1,
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@ejemplo.com",
  "direccion": "Calle Falsa 123",
  "telefono": "123456789",
  "rol": "CLIENTE"
}
```

**⚠️ Nota**: El password NO se retorna por seguridad.

**¿Qué hace el backend?**
1. ✅ Valida que el email no esté registrado
2. ✅ Encripta el password con BCrypt
3. ✅ Guarda el usuario en `react_usuario.usuario`
4. ✅ Retorna el usuario creado (sin password)

### 3.2 Login

**Frontend (React)**:
```javascript
// src/pages/auth/Login.jsx
import { loginUsuario } from '../../services/usuarioService'

const handleLogin = async () => {
  try {
    const response = await loginUsuario({
      email: 'juan@ejemplo.com',
      password: 'password123'
    })
    console.log('Token JWT:', response.token)
    console.log('Rol:', response.rol)
    // Token ya se guardó en localStorage automáticamente
  } catch (error) {
    alert('Credenciales incorrectas')
  }
}
```

**Backend responde**:
- ✅ POST `http://localhost:8081/usuarios/login`
- Valida credenciales
- Genera token JWT
- Retorna: `{ token: "eyJhbG...", rol: "CLIENTE", userId: 1 }`

**Frontend guarda automáticamente**:
- `localStorage.setItem('token', response.token)`
- `localStorage.setItem('userId', response.userId)`
- `localStorage.setItem('userRole', response.rol)`

### 3.3 Peticiones Autenticadas

Todas las peticiones posteriores incluyen automáticamente el JWT:

```javascript
// src/services/apiClient.ts hace esto automáticamente
headers: {
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json'
}
```

---

## 🛒 Paso 4: Flujo Completo de Compra

### 4.1 Ver Productos

**Frontend**:
```javascript
// src/pages/shop/Productos.jsx
import { obtenerTodosProductos } from '../../services/productosService'

useEffect(() => {
  const cargar = async () => {
    const productos = await obtenerTodosProductos()
    setProductos(productos)
  }
  cargar()
}, [])
```

**Backend**:
- ✅ GET `http://localhost:8082/productos`
- Lee de `react_producto.producto`
- Retorna lista de productos

### 4.2 Agregar al Carrito

**Frontend**:
```javascript
// src/pages/shop/ProductDetail.jsx
import { agregarItemCarritoActual } from '../../services/carritoService'

const handleAgregar = async () => {
  await agregarItemCarritoActual(productoId, cantidad)
  alert('Agregado al carrito')
}
```

**Backend**:
- ✅ POST `http://localhost:8083/carrito/{usuarioId}/agregar`
- Body: `{ productoId: 1, cantidad: 2 }`
- Backend llama a Productos Service para obtener precio
- Guarda en `react_carrito.carrito_item`
- Retorna carrito actualizado

### 4.3 Ver Carrito

**Frontend**:
```javascript
// src/pages/shop/Carrito.jsx
import { obtenerCarritoActual } from '../../services/carritoService'

useEffect(() => {
  const cargar = async () => {
    const carrito = await obtenerCarritoActual()
    setCarrito(carrito)
  }
  cargar()
}, [])
```

**Backend**:
- ✅ GET `http://localhost:8083/carrito/{usuarioId}`
- Lee de `react_carrito`
- Retorna carrito con items y total

### 4.4 Crear Pedido

**Frontend**:
```javascript
// src/pages/shop/Checkout.jsx
import { crearPedidoActual } from '../../services/pedidosService'
import { vaciarCarritoActual } from '../../services/carritoService'

const handleConfirmar = async () => {
  const pedido = await crearPedidoActual()
  await vaciarCarritoActual()
  navigate(`/compra-exitosa?pedidoId=${pedido.id}`)
}
```

**Backend (Flujo complejo)**:
1. ✅ POST `http://localhost:8084/pedidos/crear/{usuarioId}`
2. Pedidos Service llama a Carrito Service (WebClient)
3. Obtiene items del carrito
4. Descuenta stock llamando a Productos Service
5. Crea el pedido en `react_pedido.pedido`
6. Retorna pedido creado

---

## 🔄 Paso 5: Manejo de Estados

### React Context para Carrito

```javascript
// src/contexts/CartContext.jsx
import { obtenerCarritoActual } from '../services/carritoService'

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(null)

  useEffect(() => {
    const cargar = async () => {
      const data = await obtenerCarritoActual()
      setCarrito(data)
    }
    cargar()
  }, [])

  return (
    <CartContext.Provider value={{ carrito, reloadCart: cargar }}>
      {children}
    </CartContext.Provider>
  )
}
```

---

## 🐛 Solución de Problemas de Conexión

### Error: "Failed to fetch"

**Causa 1**: Microservicio no está corriendo
```bash
# Verificar
curl http://localhost:8081/actuator/health
```

**Causa 2**: URL incorrecta en `.env`
```env
# Verificar
REACT_APP_USUARIO_URL=http://localhost:8081
```

**Causa 3**: CORS bloqueado
- Los microservicios ya tienen `@CrossOrigin` configurado
- Si persiste, verifica que sea `localhost` y no `127.0.0.1`

### Error: "401 Unauthorized"

**Causa**: Token JWT inválido o expirado

**Solución**:
```javascript
// Hacer logout y volver a login
import { logoutUsuario } from '../services/usuarioService'
logoutUsuario()
// Redirigir a login
```

### Error: "Network Error"

**Verificar**:
1. Microservicio corriendo: ✅
2. Puerto correcto: ✅
3. Firewall no bloqueando: ✅

### Error: "CORS policy"

**Si ves**: `Access to fetch at 'http://localhost:8081' from origin 'http://localhost:5173' has been blocked by CORS policy`

**Solución en Backend** (ya debería estar):
```java
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UsuarioController {
    // ...
}
```

---

## 📊 Monitoreo de Conexiones

### Usar DevTools del Navegador

1. Abre DevTools (F12)
2. Ve a la pestaña **Network**
3. Recarga la página
4. Observa las peticiones a `localhost:8081-8084`

**Código de respuesta esperado**:
- `200 OK` - Éxito
- `201 Created` - Recurso creado
- `401 Unauthorized` - No autenticado
- `403 Forbidden` - Sin permisos
- `404 Not Found` - Recurso no existe
- `500 Internal Server Error` - Error del servidor

### Logs en Terminal

**React (Terminal 5)**:
```
➜  Local:   http://localhost:5173/
```

**Microservicios (Terminales 1-4)**:
```
2024-11-27 10:30:45.123  INFO --- [  restartedMain] c.r.u.UsuarioApplication: Started
```

---

## 🎯 Checklist de Conexión Completa

Antes de empezar a desarrollar, verifica:

- [ ] MySQL corriendo
- [ ] 4 bases de datos creadas
- [ ] Usuario Service (8081) corriendo
- [ ] Productos Service (8082) corriendo
- [ ] Carrito Service (8083) corriendo
- [ ] Pedidos Service (8084) corriendo
- [ ] React (5173) corriendo
- [ ] Archivo `.env` creado con URLs correctas
- [ ] Swagger UI accesible en los 4 puertos
- [ ] Puedes hacer registro desde React
- [ ] Puedes hacer login desde React
- [ ] Token se guarda en localStorage
- [ ] Puedes ver productos desde React
- [ ] Puedes agregar al carrito
- [ ] Puedes crear un pedido

---

## 🔗 Flujo de Datos Resumido

```
1. Usuario → Login en React
2. React → POST http://localhost:8081/usuarios/login
3. Backend → Valida y genera JWT
4. React ← Recibe token y lo guarda
5. Usuario → Ve productos
6. React → GET http://localhost:8082/productos
7. Backend → Lee MySQL react_producto
8. React ← Muestra productos
9. Usuario → Agrega al carrito
10. React → POST http://localhost:8083/carrito/{userId}/agregar (con JWT)
11. Backend → Valida JWT, agrega item
12. React ← Carrito actualizado
13. Usuario → Confirma pedido
14. React → POST http://localhost:8084/pedidos/crear/{userId} (con JWT)
15. Backend → Crea pedido, descuenta stock, vacía carrito
16. React ← Pedido confirmado
```

---

## 📚 Recursos Adicionales

- **Documentación de servicios**: `src/services/README.md`
- **Ejemplos de código**: `EJEMPLOS_INTEGRACION.js`
- **Tipos TypeScript**: `src/Types/ApiTypes.ts`

---

**✨ ¡Tu sistema React + Microservicios está completamente conectado y funcionando!**
