# 🌐 Guía de Inicio - Proyecto Web React PetCare

Esta guía te ayudará a iniciar el proyecto web frontend de PetCare React, una tienda en línea moderna para productos de mascotas con arquitectura de microservicios.

---

## 📋 Pre-requisitos

Antes de iniciar el proyecto web, asegúrate de tener instalado:

- ✅ **Node.js 18 o superior** instalado ([Descargar Node.js](https://nodejs.org/))
- ✅ **npm** (viene con Node.js) versión 8 o superior
- ✅ **Git** (para clonar el repositorio) ([Descargar Git](https://git-scm.com/))
- ✅ **Editor de código** (recomendado: VS Code)
- ✅ Los **microservicios de Spring Boot corriendo** (ver documentación de microservicios)
- ✅ **MySQL** instalado y corriendo con las bases de datos creadas

---

## 🔍 Paso 1: Verificar Node.js y npm

Verifica que estén instalados correctamente. Abre PowerShell o CMD y ejecuta:

```bash
node --version
# Debería mostrar: v18.x.x o superior

npm --version
# Debería mostrar: 8.x.x o superior

git --version
# Debería mostrar: git version 2.x.x
```

**¿No tienes Node.js instalado?**
1. Descarga desde https://nodejs.org/
2. Instala la versión LTS (Long Term Support)
3. Reinicia tu terminal
4. Vuelve a verificar las versiones

---

## 📂 Paso 2: Clonar o Verificar el Proyecto

Si aún no tienes el proyecto:

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd petcare-react
```

Si ya tienes el proyecto, asegúrate de estar en la carpeta correcta:

```bash
cd petcare-react
ls  # Deberías ver: package.json, src/, public/, etc.
```

---

## 📦 Paso 3: Instalar Dependencias

En la raíz del proyecto (donde está `package.json`):

```bash
npm install
```

Este comando instalará todas las dependencias necesarias:
- ⚛️ **React 18.2** - Librería de interfaz de usuario
- 🛣️ **React Router DOM 6.26** - Navegación entre páginas
- ⚡ **Vite 5.4** - Build tool ultrarrápido
- 🎨 **Bootstrap 5.3** - Framework CSS para diseño responsivo
- 🔧 **TypeScript** - Tipado estático (opcional)

**Tiempo estimado**: 1-3 minutos dependiendo de tu conexión.

**Problemas comunes**:
- Si aparece "npm not found" → Reinstala Node.js
- Si falla la instalación → Elimina `node_modules` y `package-lock.json`, luego ejecuta `npm install` nuevamente

---

## ⚙️ Paso 4: Configurar Variables de Entorno

### ¿Por qué necesitas esto?

Las variables de entorno indican a React dónde están los microservicios backend.

### Crear archivo .env

**Opción A - Si existe .env.example:**
```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# Mac/Linux
cp .env.example .env
```

**Opción B - Crear manualmente:**
1. Crea un archivo llamado `.env` en la raíz del proyecto
2. Copia el contenido de abajo

### Contenido del archivo .env

```env
# URLs de los Microservicios
VITE_USUARIO_URL=http://localhost:8081
VITE_PRODUCTOS_URL=http://localhost:8082
VITE_CARRITO_URL=http://localhost:8083
VITE_PEDIDOS_URL=http://localhost:8084

# Configuración opcional
VITE_APP_NAME=PetCare
VITE_API_TIMEOUT=10000
```

**⚠️ Nota importante**: 
- Usa el prefijo `VITE_` (no `REACT_APP_`) para que Vite reconozca las variables
- Si cambiaste los puertos de los microservicios, actualiza estas URLs
- No uses comillas en los valores
- Reinicia el servidor de desarrollo después de cambiar el .env

---

## 🔌 Paso 5: Verificar que los Microservicios Estén Corriendo

**⚠️ MUY IMPORTANTE**: El frontend necesita que los 4 microservicios estén activos.

### Verificar Microservicios

Abre tu navegador y visita cada URL:

```bash
# Usuario Service
http://localhost:8081/actuator/health
# Debe mostrar: {"status":"UP"}

# Productos Service
http://localhost:8082/actuator/health
# Debe mostrar: {"status":"UP"}

# Carrito Service
http://localhost:8083/actuator/health
# Debe mostrar: {"status":"UP"}

# Pedidos Service
http://localhost:8084/actuator/health
# Debe mostrar: {"status":"UP"}
```

**Si alguno no responde:**
1. Ve a la carpeta del microservicio
2. Ejecuta: `./mvnw spring-boot:run` (o `mvnw.cmd spring-boot:run` en Windows)
3. Espera a ver: "Started XxxApplication in X seconds"

---

## 🚀 Paso 6: Iniciar el Proyecto Web

### Modo Desarrollo (Recomendado para desarrollo)

```bash
npm run dev
```

Verás algo como:

```
  VITE v5.4.8  ready in 523 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**✅ Abre tu navegador en: http://localhost:5173/**

### ¿Qué hace npm run dev?

- 🔄 Hot Module Replacement (HMR): Los cambios se reflejan inmediatamente sin recargar
- 🐛 Source Maps: Facilita la depuración del código
- ⚡ Build ultrarrápido con Vite
- 📱 Responsive por defecto

### Modo Producción (para pruebas finales)

```bash
# 1. Compilar el proyecto para producción
npm run build

# 2. Previsualizar la versión compilada
npm run preview
```

El comando `build` genera una carpeta `dist/` optimizada lista para desplegar en producción.

---

## ✅ Paso 7: Verificar que Funciona

Una vez que el proyecto esté corriendo en http://localhost:5173/

### 1. Página Principal
- ✅ Deberías ver el **logo de PetCare**
- ✅ Un **navbar** con menú de navegación
- ✅ **Productos destacados** en la página principal
- ✅ Un **footer** con información de contacto

### 2. Probar Navegación
Prueba cada enlace del menú:
- 🏠 **Inicio** → Página principal
- 🛍️ **Productos** → Catálogo completo con filtros por categoría
- ℹ️ **Nosotros** → Información de la tienda
- 📞 **Contacto** → Formulario de contacto
- 📝 **Blog** → Artículos sobre mascotas
- 🔐 **Iniciar Sesión** → Formulario de login
- 📦 **Carrito** (icono) → Ver productos en el carrito

### 3. Verificar Consola del Navegador
- Presiona **F12** para abrir DevTools
- Ve a la pestaña **Console**
- ✅ No deberías ver errores en rojo
- ✅ Podrías ver algunos logs informativos (esto es normal)

### 4. Verificar Conexión con Backend
Abre DevTools (F12) → Pestaña **Network**:
- Recarga la página (Ctrl+R)
- Deberías ver peticiones a `localhost:8082/productos` (Status 200 OK)
- Si ves Status 200 = ✅ Todo correcto
- Si ves Status 404/500 = ❌ Verifica que los microservicios estén corriendo

---

## 🔗 Rutas Disponibles

### Rutas Públicas (Sin autenticación requerida)

| Ruta | Descripción | Componente |
|------|-------------|------------|
| `/` | Página de inicio con productos destacados | `Home.jsx` |
| `/productos` | Catálogo completo con filtros por categoría | `Productos.jsx` |
| `/productos/:id` | Detalle de un producto específico | `ProductDetail.jsx` |
| `/ofertas` | Productos en oferta | `Ofertas.jsx` |
| `/nosotros` | Información de la tienda | `Nosotros.jsx` |
| `/contacto` | Formulario de contacto | `Contacto.jsx` |
| `/blog` | Blog principal sobre mascotas | `Blog.jsx` |
| `/blog/comida` | Artículo sobre alimentación | `BlogComida.jsx` |
| `/blog/vacuna` | Artículo sobre vacunación | `BlogVacuna.jsx` |
| `/login` | Iniciar sesión | `Login.jsx` |
| `/registro` | Registro de nuevo usuario | `Registro.jsx` |

### Rutas Protegidas (Requieren autenticación)

| Ruta | Descripción | Rol Requerido |
|------|-------------|---------------|
| `/carrito` | Ver carrito de compras | CLIENTE |
| `/checkout` | Proceso de pago | CLIENTE |
| `/pago` | Formulario de pago | CLIENTE |
| `/compra-exitosa` | Confirmación de compra | CLIENTE |
| `/mis-pedidos` | Historial de pedidos | CLIENTE |

### Rutas Administrativas (Solo ADMIN)

| Ruta | Descripción | Componente |
|------|-------------|------------|
| `/admin` | Dashboard administrativo | `AdminHome.jsx` |
| `/admin/productos` | Gestión de productos (CRUD) | `AdminProductos.jsx` |
| `/admin/usuarios` | Gestión de usuarios | `AdminUsuarios.jsx` |
| `/admin/pedidos` | Gestión de pedidos | `AdminPedidos.jsx` |

---

## 🧪 Paso 8: Probar la Conexión con Microservicios

### Flujo de Prueba Completo

#### 1️⃣ Registrar un Usuario

1. Ve a http://localhost:5173/registro
2. Llena el formulario:
   - **Nombre**: Juan
   - **Apellido**: Pérez
   - **Email**: juan@test.com
   - **Password**: 123456
   - **Dirección**: Calle Falsa 123
   - **Teléfono**: 123456789
3. Click en **"Registrarse"**
4. ✅ Deberías ver un mensaje de éxito

#### 2️⃣ Iniciar Sesión

1. Ve a http://localhost:5173/login
2. Ingresa:
   - **Email**: juan@test.com
   - **Password**: 123456
3. Click en **"Ingresar"**
4. ✅ Serás redirigido a la página principal
5. ✅ Verás tu nombre en el navbar

#### 3️⃣ Explorar Productos

1. Click en **"Productos"** en el menú
2. ✅ Deberías ver una lista de productos con imágenes
3. Prueba los **filtros de categoría**:
   - Todos
   - Alimentos
   - Accesorios
   - Juguetes
   - Higiene
4. Click en **"Ver Detalle"** de cualquier producto

#### 4️⃣ Agregar al Carrito

1. En el detalle del producto, selecciona cantidad
2. Click en **"Agregar al Carrito"**
3. ✅ El contador del carrito en el navbar debería aumentar
4. Click en el **ícono del carrito** 🛒

#### 5️⃣ Realizar una Compra

1. En el carrito, verifica los productos
2. Click en **"Proceder al Checkout"**
3. Completa los datos de envío
4. Click en **"Confirmar Pedido"**
5. ✅ Verás la página de "Compra Exitosa"
6. Ve a **"Mis Pedidos"** para ver el historial

### Opción B: Probar desde la Consola del Navegador

Abre DevTools (F12) → Console y ejecuta:

```javascript
// ✅ Verificar servicio de productos
fetch('http://localhost:8082/productos')
  .then(res => res.json())
  .then(data => console.log('✅ Productos cargados:', data.length))
  .catch(err => console.error('❌ Error:', err))

// ✅ Verificar servicio de usuarios
fetch('http://localhost:8081/actuator/health')
  .then(res => res.json())
  .then(data => console.log('✅ Usuario Service:', data.status))
  .catch(err => console.error('❌ Error:', err))
```

---

## 📊 Estructura del Proyecto

```
petcare-react/
├── public/                          # 📁 Archivos públicos estáticos
│   └── products.json               # Datos demo de productos (si aplica)
│
├── src/                             # 📁 Código fuente principal
│   ├── assets/                     # 🖼️ Recursos estáticos
│   │   └── images/                 # Imágenes (logo, banners, etc.)
│   │
│   ├── components/                 # 🧩 Componentes React reutilizables
│   │   ├── common/                 # Componentes comunes
│   │   │   └── ProductCard.jsx     # Tarjeta de producto
│   │   └── layout/                 # Componentes de layout
│   │       ├── Navbar.jsx          # Barra de navegación
│   │       └── Footer.jsx          # Pie de página
│   │
│   ├── contexts/                   # 🔄 Context API para estado global
│   │   ├── AuthContext.jsx         # Manejo de autenticación
│   │   └── CartContext.jsx         # Manejo del carrito
│   │
│   ├── hooks/                      # 🪝 Custom hooks
│   │   ├── useAuth.js              # Hook para autenticación
│   │   ├── useForm.js              # Hook para formularios
│   │   ├── useFetch.js             # Hook para peticiones HTTP
│   │   ├── useLocalStorage.js      # Hook para localStorage
│   │   └── useToggle.js            # Hook para toggle states
│   │
│   ├── pages/                      # 📄 Páginas de la aplicación
│   │   ├── admin/                  # Panel administrativo
│   │   │   ├── AdminHome.jsx       # Dashboard admin
│   │   │   ├── AdminProductos.jsx  # CRUD productos
│   │   │   ├── AdminUsuarios.jsx   # CRUD usuarios
│   │   │   └── AdminPedidos.jsx    # Gestión de pedidos
│   │   ├── auth/                   # Autenticación
│   │   │   ├── Login.jsx           # Página de login
│   │   │   └── Registro.jsx        # Página de registro
│   │   ├── blog/                   # Blog
│   │   │   ├── Blog.jsx            # Página principal del blog
│   │   │   ├── BlogComida.jsx      # Artículo sobre alimentación
│   │   │   └── BlogVacuna.jsx      # Artículo sobre vacunación
│   │   ├── public/                 # Páginas públicas
│   │   │   ├── Home.jsx            # Página de inicio
│   │   │   ├── Nosotros.jsx        # Acerca de nosotros
│   │   │   └── Contacto.jsx        # Formulario de contacto
│   │   └── shop/                   # Tienda en línea
│   │       ├── Productos.jsx       # Catálogo de productos
│   │       ├── ProductDetail.jsx   # Detalle de producto
│   │       ├── Carrito.jsx         # Carrito de compras
│   │       ├── Checkout.jsx        # Proceso de pago
│   │       ├── Pago.jsx            # Formulario de pago
│   │       ├── CompraExitosa.jsx   # Confirmación de compra
│   │       ├── MisPedidos.jsx      # Historial de pedidos
│   │       └── Ofertas.jsx         # Productos en oferta
│   │
│   ├── services/                   # 🔌 Servicios de API (Backend)
│   │   ├── apiClient.ts            # Cliente HTTP con JWT
│   │   ├── usuarioService.ts       # Servicio de usuarios (8081)
│   │   ├── productosService.ts     # Servicio de productos (8082)
│   │   ├── carritoService.ts       # Servicio de carrito (8083)
│   │   ├── pedidosService.ts       # Servicio de pedidos (8084)
│   │   └── README.md               # Documentación de servicios
│   │
│   ├── Types/                      # 📘 Tipos TypeScript
│   │   └── ApiTypes.ts             # Interfaces y tipos de datos
│   │
│   ├── data/                       # 📊 Datos estáticos (si aplica)
│   │   ├── data.js                 # Productos de ejemplo
│   │   └── usuarios.js             # Usuarios de prueba
│   │
│   ├── App.jsx                     # 🏠 Componente raíz
│   ├── main.jsx                    # 🚀 Entry point de la aplicación
│   └── index.css                   # 🎨 Estilos globales
│
├── .env                             # 🔐 Variables de entorno (crear)
├── .env.example                     # 📋 Template de variables
├── .gitignore                       # 🚫 Archivos ignorados por Git
├── package.json                     # 📦 Dependencias y scripts
├── package-lock.json                # 🔒 Versiones exactas de dependencias
├── vite.config.js                   # ⚙️ Configuración de Vite
├── index.html                       # 📄 HTML principal
├── README.md                        # 📖 Documentación del proyecto
├── GUIA_INICIO_PROYECTO_WEB.md     # 🌐 Esta guía
└── GUIA_CONEXION_COMPLETA.md       # 🔗 Guía de conexión con backend
```

### 🔑 Archivos Clave

- **`src/main.jsx`**: Punto de entrada, monta la aplicación en el DOM
- **`src/App.jsx`**: Componente principal con rutas
- **`src/services/apiClient.ts`**: Maneja todas las peticiones HTTP con JWT
- **`vite.config.js`**: Configuración del servidor de desarrollo
- **`.env`**: Variables de entorno (URLs de microservicios)

---

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Inicia servidor de desarrollo

# Producción
npm run build            # Compila para producción
npm run preview          # Previsualiza versión compilada

# Utilidades
npm run lint             # Ejecuta el linter
```

---

## 🐛 Solución de Problemas Comunes

### ❌ Error: "EADDRINUSE: address already in use :::5173"

**Causa**: El puerto 5173 ya está siendo usado por otro proceso.

**Solución 1 - Cambiar el puerto:**
Edita `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // Cambia a otro puerto
    open: true   // Abre el navegador automáticamente
  }
})
```

**Solución 2 - Liberar el puerto:**
```bash
# Windows - Encontrar y matar el proceso
netstat -ano | findstr :5173
taskkill /PID <número_de_pid> /F

# Mac/Linux
lsof -ti:5173 | xargs kill -9
```

---

### ❌ Error: "Failed to fetch" al llamar APIs

**Causa**: Los microservicios no están corriendo o hay problemas de conexión.

**Solución paso a paso**:

1. **Verifica que los microservicios respondan:**
```bash
# PowerShell o CMD
curl http://localhost:8081/actuator/health
curl http://localhost:8082/actuator/health
curl http://localhost:8083/actuator/health
curl http://localhost:8084/actuator/health

# Respuesta esperada: {"status":"UP"}
```

2. **Verifica las URLs en `.env`:**
```env
VITE_USUARIO_URL=http://localhost:8081
VITE_PRODUCTOS_URL=http://localhost:8082
VITE_CARRITO_URL=http://localhost:8083
VITE_PEDIDOS_URL=http://localhost:8084
```

3. **Reinicia el servidor de React después de cambiar `.env`:**
```bash
Ctrl+C   # Detener
npm run dev   # Iniciar de nuevo
```

4. **Verifica CORS (si persiste el error):**
- Los microservicios ya tienen `@CrossOrigin` configurado
- Usa `localhost` no `127.0.0.1`

---

### ❌ Error: "Module not found" o "Cannot find module"

**Causa**: Dependencias no instaladas o corruptas.

**Solución:**
```bash
# Windows PowerShell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

# Mac/Linux
rm -rf node_modules package-lock.json
npm install
```

---

### ❌ Cambios en el código no se reflejan

**Solución 1 - Guardar el archivo:**
- Presiona **Ctrl+S** para guardar
- Vite detecta cambios automáticamente

**Solución 2 - Limpiar caché y reiniciar:**
```bash
# Detener el servidor
Ctrl+C

# Limpiar caché de Vite
Remove-Item -Recurse -Force node_modules/.vite

# Reiniciar
npm run dev
```

**Solución 3 - Hard Refresh en el navegador:**
- **Ctrl+Shift+R** (Chrome/Edge)
- **Ctrl+F5** (Firefox)

---

### ❌ Error: "Cannot read property 'X' of undefined"

**Causa**: Intentas acceder a una propiedad de un objeto que es `null` o `undefined`.

**Solución:**

1. **Abre DevTools (F12)** → Console para ver el error completo
2. **Usa Optional Chaining:**
```javascript
// ❌ Esto puede fallar
const nombre = producto.categoria.nombre

// ✅ Forma segura
const nombre = producto?.categoria?.nombre ?? 'Sin categoría'
```

3. **Agrega validaciones:**
```javascript
{loading ? (
  <p>Cargando...</p>
) : error ? (
  <p>Error: {error}</p>
) : productos.length > 0 ? (
  productos.map(p => <ProductCard key={p.id} product={p} />)
) : (
  <p>No hay productos</p>
)}
```

---

### ❌ Error: "401 Unauthorized"

**Causa**: Token JWT inválido, expirado o no enviado.

**Solución:**
```javascript
// Hacer logout y volver a iniciar sesión
localStorage.clear()
// Redirigir a /login
```

---

### ❌ Error: "CORS policy has blocked"

**Mensaje completo**: `Access to fetch at 'http://localhost:8081' from origin 'http://localhost:5173' has been blocked by CORS policy`

**Solución en Backend (debería estar configurado):**
```java
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
@RestController
public class UsuarioController {
    // ...
}
```

**Solución temporal (para desarrollo):**
- Usa extensión de navegador "CORS Unblock"
- O ejecuta Chrome con `--disable-web-security`

---

### ❌ La aplicación se ve rota o sin estilos

**Causa**: Bootstrap no se está cargando.

**Solución:**
Verifica que en `src/main.jsx` esté:
```javascript
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
```

---

### ❌ Error: "React is not defined"

**Causa**: Falta importar React (en versiones antiguas).

**Solución:**
Con React 18+ no necesitas importar React, pero si tienes error:
```javascript
import React from 'react'
```

---

## 🎨 Personalización

### Cambiar el Puerto de Desarrollo

Edita `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,        // Tu puerto preferido
    open: true,        // Abre el navegador automáticamente
    host: true,        // Permite acceso desde otros dispositivos
    strictPort: true   // Falla si el puerto está ocupado
  }
})
```

### Cambiar el Título y el Icono

Edita `index.html`:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PetCare - Tu Título Personalizado</title>
    <meta name="description" content="Tienda online de productos para mascotas" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### Cambiar los Colores

Edita `src/index.css`:

```css
:root {
  --color-primary: #28a745;    /* Verde principal */
  --color-secondary: #6c757d;  /* Gris */
  --color-success: #28a745;
  --color-danger: #dc3545;
  --color-warning: #ffc107;
  --color-info: #17a2b8;
}

/* Sobrescribir colores de Bootstrap */
.btn-success {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}
```

---

## 📱 Acceder desde otros Dispositivos

Para acceder desde tu celular o tablet en la misma red:

```bash
npm run dev -- --host
```

Busca la línea que dice:
```
➜  Network: http://192.168.x.x:5173/
```

Usa esa URL en tu dispositivo móvil.

---

## 🔒 Modo Producción

### Compilar para Producción

```bash
npm run build
```

Esto crea una carpeta `dist/` con todos los archivos optimizados.

### Desplegar

Puedes desplegar la carpeta `dist/` en:
- **Netlify**: Arrastra la carpeta dist/
- **Vercel**: `vercel --prod`
- **GitHub Pages**: Sube a rama gh-pages
- **Servidor propio**: Copia dist/ a tu servidor

---

## 🛑 Detener el Proyecto

En la terminal donde está corriendo:

- **Windows**: `Ctrl + C` → `Y`
- **Mac/Linux**: `Ctrl + C`

---

## 🎯 Flujo de Trabajo Recomendado

### Desarrollo Diario:

1. **Iniciar Microservicios** (4 terminales)
   ```bash
   # Ver GUIA_INICIO_MICROSERVICIOS.md
   ```

2. **Iniciar React** (1 terminal)
   ```bash
   npm run dev
   ```

3. **Desarrollar**
   - Edita archivos en `src/`
   - Los cambios se reflejan automáticamente

4. **Detener Todo**
   - Ctrl+C en cada terminal

---

## 📚 Recursos de Aprendizaje

- **React**: https://react.dev/
- **React Router**: https://reactrouter.com/
- **Vite**: https://vitejs.dev/
- **Bootstrap**: https://getbootstrap.com/

---

## 🆘 Obtener Ayuda

Si tienes problemas:

1. Revisa los logs en la terminal
2. Revisa la consola del navegador (F12)
3. Verifica que los microservicios estén corriendo
4. Lee la documentación en `src/services/README.md`
5. Revisa `EJEMPLOS_INTEGRACION.js` para ver cómo usar los servicios

---

**✨ ¡Listo! Tu proyecto web debería estar corriendo en http://localhost:5173/**

---

## 🔗 Próximos Pasos

Ahora que tu proyecto está corriendo, ve a:

📄 **`GUIA_CONEXION_COMPLETA.md`** - Para entender cómo se conectan React y los microservicios
