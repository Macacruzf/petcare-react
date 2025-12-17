import { useState, useEffect } from 'react'
import { obtenerTodosProductos } from '../services/productosService'
import { obtenerTodosPedidos } from '../services/pedidosService'

export const useNotificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([])
  const [loading, setLoading] = useState(true)

  const cargarNotificaciones = async () => {
    try {
      setLoading(true)
      const [productos, pedidos, mensajesContacto] = await Promise.all([
        obtenerTodosProductos(),
        obtenerTodosPedidos(),
        Promise.resolve(JSON.parse(localStorage.getItem('mensajesContacto') || '[]'))
      ])

      const nuevasNotificaciones = []

      // Obtener IDs vistos del localStorage
      const pedidosVistos = JSON.parse(localStorage.getItem('pedidosVistos') || '[]')
      const contactosVistos = JSON.parse(localStorage.getItem('contactosVistos') || '[]')
      const productosVistos = JSON.parse(localStorage.getItem('productosVistos') || '[]')

      // Notificaciones de nuevos pedidos
      pedidos.forEach(pedido => {
        if (!pedidosVistos.includes(pedido.id)) {
          nuevasNotificaciones.push({
            id: `pedido-${pedido.id}`,
            tipo: 'pedido',
            titulo: 'Nuevo pedido',
            mensaje: `Pedido #${pedido.id} - ${pedido.usuario?.nombre || 'Cliente'}`,
            fecha: new Date(pedido.fechaPedido),
            referencia: pedido.id,
            leida: false
          })
        }
      })

      // Notificaciones de nuevos mensajes de contacto
      mensajesContacto.forEach(mensaje => {
        if (!contactosVistos.includes(mensaje.id) && !mensaje.leido) {
          nuevasNotificaciones.push({
            id: `contacto-${mensaje.id}`,
            tipo: 'contacto',
            titulo: 'Nuevo mensaje de contacto',
            mensaje: `${mensaje.nombre} - ${mensaje.asunto}`,
            fecha: new Date(mensaje.fecha),
            referencia: mensaje.id,
            leida: false
          })
        }
      })

      // Notificaciones de productos sin stock
      productos.forEach(producto => {
        if (producto.stock === 0 && !productosVistos.includes(producto.id)) {
          nuevasNotificaciones.push({
            id: `producto-${producto.id}`,
            tipo: 'stock',
            titulo: 'Producto sin stock',
            mensaje: `${producto.nombre} - 0 unidades`,
            fecha: new Date(),
            referencia: producto.id,
            leida: false
          })
        }
      })

      // Ordenar por fecha (más recientes primero)
      nuevasNotificaciones.sort((a, b) => b.fecha - a.fecha)

      setNotificaciones(nuevasNotificaciones)
    } catch (error) {
      console.error('Error al cargar notificaciones:', error)
      setNotificaciones([])
    } finally {
      setLoading(false)
    }
  }

  const marcarComoLeida = (notificacion) => {
    const { tipo, referencia } = notificacion

    if (tipo === 'pedido') {
      const pedidosVistos = JSON.parse(localStorage.getItem('pedidosVistos') || '[]')
      if (!pedidosVistos.includes(referencia)) {
        pedidosVistos.push(referencia)
        localStorage.setItem('pedidosVistos', JSON.stringify(pedidosVistos))
      }
    } else if (tipo === 'contacto') {
      const contactosVistos = JSON.parse(localStorage.getItem('contactosVistos') || '[]')
      if (!contactosVistos.includes(referencia)) {
        contactosVistos.push(referencia)
        localStorage.setItem('contactosVistos', JSON.stringify(contactosVistos))
      }
    } else if (tipo === 'stock') {
      const productosVistos = JSON.parse(localStorage.getItem('productosVistos') || '[]')
      if (!productosVistos.includes(referencia)) {
        productosVistos.push(referencia)
        localStorage.setItem('productosVistos', JSON.stringify(productosVistos))
      }
    }

    // Actualizar el estado local
    setNotificaciones(prev => 
      prev.map(n => n.id === notificacion.id ? { ...n, leida: true } : n)
    )
  }

  const marcarTodasComoLeidas = () => {
    notificaciones.forEach(notificacion => {
      marcarComoLeida(notificacion)
    })
  }

  const contadorNoLeidas = () => {
    return notificaciones.filter(n => !n.leida).length
  }

  useEffect(() => {
    cargarNotificaciones()
    
    // Recargar notificaciones cada 5 segundos
    const interval = setInterval(cargarNotificaciones, 5000)
    
    return () => clearInterval(interval)
  }, [])

  return {
    notificaciones,
    loading,
    cargarNotificaciones,
    marcarComoLeida,
    marcarTodasComoLeidas,
    contadorNoLeidas: contadorNoLeidas()
  }
}
