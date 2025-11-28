# 🔗 Guía de Conexión Completa - React + Microservicios

Esta guía explica cómo conectar correctamente tu frontend React con los microservicios de Spring Boot.

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
```bash
# Windows
net start MySQL80

# Mac
mysql.server start

# Linux
sudo systemctl start mysql
```

### 1.2 Iniciar Microservicios (4 terminales)

```bash
# Terminal 1 - Usuario (8081)
cd microservicio_react_petcare/usuario/usuario
./mvnw spring-boot:run

# Terminal 2 - Productos (8082)
cd microservicio_react_petcare/productos/productos
./mvnw spring-boot:run

# Terminal 3 - Carrito (8083)
cd microservicio_react_petcare/carrito/carrito
./mvnw spring-boot:run

# Terminal 4 - Pedidos (8084)
cd microservicio_react_petcare/pedidos/pedidos
./mvnw spring-boot:run
```

**Espera a que cada uno muestre**: `Started XxxApplication in X.XXX seconds`

### 1.3 Iniciar React (terminal 5)

```bash
# Terminal 5 - React Frontend
npm run dev
```

---

## ✅ Paso 2: Verificar la Conexión

### 2.1 Verificar Microservicios

Abre en tu navegador (o usa curl):

```bash
# Verificar que todos responden
curl http://localhost:8081/actuator/health
curl http://localhost:8082/actuator/health
curl http://localhost:8083/actuator/health
curl http://localhost:8084/actuator/health
```

**Respuesta esperada**: `{"status":"UP"}`

### 2.2 Verificar React

Abre: http://localhost:5173/

Deberías ver la página principal de PetCare.

### 2.3 Verificar Swagger (Opcional)

- http://localhost:8081/swagger-ui/
- http://localhost:8082/swagger-ui/
- http://localhost:8083/swagger-ui/
- http://localhost:8084/swagger-ui/

---

## 🔐 Paso 3: Flujo de Autenticación Completo

### 3.1 Registro de Usuario

**Frontend (React)**:
```javascript
// src/pages/auth/Registro.jsx
import { registrarUsuario } from '../../services/usuarioService'

const handleRegistro = async () => {
  try {
    await registrarUsuario({
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan@ejemplo.com',
      password: 'password123',
      direccion: 'Calle 123',
      telefono: '123456789',
      rol: 'CLIENTE'
    })
    alert('Registro exitoso')
  } catch (error) {
    console.error(error)
  }
}
```

**Backend responde**:
- ✅ POST `http://localhost:8081/usuarios/registro`
- Guarda usuario en `react_usuario.usuario`
- Retorna usuario creado (sin password)

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
