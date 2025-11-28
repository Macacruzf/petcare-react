# 🌐 Guía de Inicio - Proyecto Web React

Esta guía te ayudará a iniciar el proyecto web frontend de PetCare React.

---

## 📋 Pre-requisitos

Antes de iniciar el proyecto web, asegúrate de tener:

- ✅ **Node.js 16 o superior** instalado
- ✅ **npm** (viene con Node.js) o **yarn**
- ✅ **Git** (para clonar el repositorio)
- ✅ Los **microservicios corriendo** (ver `microservicio_react_petcare/GUIA_INICIO_MICROSERVICIOS.md`)

---

## 🔍 Paso 1: Verificar Node.js y npm

Verifica que estén instalados correctamente:

```bash
node --version
# Debería mostrar: v16.x.x o superior

npm --version
# Debería mostrar: 8.x.x o superior
```

---

## 📦 Paso 2: Instalar Dependencias

En la raíz del proyecto (donde está `package.json`):

```bash
npm install
```

Este comando instalará todas las dependencias necesarias:
- React
- React Router DOM
- Vite
- Bootstrap
- Otras librerías

**Tiempo estimado**: 1-3 minutos dependiendo de tu conexión.

---

## ⚙️ Paso 3: Configurar Variables de Entorno

### Crear archivo .env

Copia el archivo de ejemplo:

```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# Mac/Linux
cp .env.example .env
```

### Editar el archivo .env

Abre el archivo `.env` y verifica que tenga las URLs correctas de tus microservicios:

```env
REACT_APP_USUARIO_URL=http://localhost:8081
REACT_APP_PRODUCTOS_URL=http://localhost:8082
REACT_APP_CARRITO_URL=http://localhost:8083
REACT_APP_PEDIDOS_URL=http://localhost:8084
```

**Nota**: Si cambiaste los puertos de los microservicios, actualiza estas URLs.

---

## 🚀 Paso 4: Iniciar el Proyecto Web

### Modo Desarrollo (Recomendado para desarrollo)

```bash
npm run dev
```

Verás algo como:

```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

Abre tu navegador en: **http://localhost:5173/**

### Modo Producción (para pruebas finales)

```bash
# 1. Compilar el proyecto
npm run build

# 2. Previsualizar la versión compilada
npm run preview
```

---

## ✅ Paso 5: Verificar que Funciona

Una vez que el proyecto esté corriendo:

### 1. Página Principal
- Abre: http://localhost:5173/
- Deberías ver la página de inicio de PetCare

### 2. Probar Navegación
- **Productos**: Click en "Productos" en el menú
- **Login**: Click en "Iniciar Sesión"
- **Nosotros**: Click en "Nosotros"

### 3. Verificar Consola del Navegador
- Abre DevTools (F12)
- No deberías ver errores en la consola

---

## 🔗 Rutas Disponibles

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio |
| `/productos` | Catálogo de productos |
| `/producto/:id` | Detalle de producto |
| `/carrito` | Carrito de compras |
| `/checkout` | Proceso de pago |
| `/login` | Iniciar sesión |
| `/registro` | Registro de usuario |
| `/nosotros` | Acerca de nosotros |
| `/contacto` | Formulario de contacto |
| `/blog` | Blog principal |
| `/admin` | Panel administrativo |

---

## 🧪 Paso 6: Probar la Conexión con Microservicios

### Opción A: Desde la Aplicación Web

1. Ve a http://localhost:5173/login
2. Intenta registrar un nuevo usuario
3. Inicia sesión con ese usuario
4. Ve a Productos y agrega algo al carrito

### Opción B: Desde la Consola del Navegador

Abre DevTools (F12) → Consola y ejecuta:

```javascript
// Verificar que los servicios estén disponibles
fetch('http://localhost:8082/productos')
  .then(res => res.json())
  .then(data => console.log('Productos:', data))
  .catch(err => console.error('Error:', err))
```

---

## 📊 Estructura del Proyecto

```
petcare-react/
├── public/                    # Archivos públicos estáticos
├── src/
│   ├── assets/               # Imágenes y recursos
│   ├── components/           # Componentes React
│   │   ├── common/          # Componentes reutilizables
│   │   └── layout/          # Navbar, Footer
│   ├── contexts/            # Context API (CartContext, AuthContext)
│   ├── hooks/               # Custom hooks
│   ├── pages/               # Páginas de la aplicación
│   │   ├── admin/          # Panel administrativo
│   │   ├── auth/           # Login, Registro
│   │   ├── blog/           # Blog
│   │   ├── public/         # Páginas públicas
│   │   └── shop/           # Tienda
│   ├── services/            # Servicios de API
│   ├── Types/               # TypeScript types
│   ├── App.jsx              # Componente principal
│   └── main.jsx             # Entry point
├── .env                      # Variables de entorno (crear)
├── .env.example             # Template de variables
├── package.json             # Dependencias
└── vite.config.js           # Configuración de Vite
```

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

### Error: "EADDRINUSE: address already in use :::5173"
**Solución**: El puerto 5173 está ocupado. Cierra otros procesos o cambia el puerto en `vite.config.js`:
```javascript
export default defineConfig({
  server: {
    port: 3000
  }
})
```

### Error: "Failed to fetch" al llamar APIs
**Causas posibles**:
1. Microservicios no están corriendo → Inicialos primero
2. URLs incorrectas en `.env` → Verifica las URLs
3. CORS bloqueado → Los microservicios ya tienen CORS configurado

**Solución**:
```bash
# Verifica que los microservicios respondan
curl http://localhost:8081/actuator/health
curl http://localhost:8082/actuator/health
curl http://localhost:8083/actuator/health
curl http://localhost:8084/actuator/health
```

### Error: "Module not found"
**Solución**: Reinstala dependencias:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Cambios en código no se reflejan
**Solución**: 
1. Guarda el archivo (Ctrl+S)
2. Si no funciona, reinicia el servidor:
   - Detén: Ctrl+C
   - Inicia: npm run dev

### Error: "Cannot read property of undefined"
**Solución**: Revisa la consola del navegador (F12) para ver qué propiedad falta.

---

## 🎨 Personalización

### Cambiar el Puerto de Desarrollo

Edita `vite.config.js`:

```javascript
export default defineConfig({
  server: {
    port: 3000,  // Cambia a tu puerto preferido
    open: true   // Abre el navegador automáticamente
  }
})
```

### Cambiar el Título de la Página

Edita `index.html`:

```html
<title>Tu Título Aquí</title>
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
