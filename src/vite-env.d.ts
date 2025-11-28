/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USUARIO_URL: string
  readonly VITE_PRODUCTOS_URL: string
  readonly VITE_CARRITO_URL: string
  readonly VITE_PEDIDOS_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
