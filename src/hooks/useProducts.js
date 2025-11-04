// src/hooks/useProducts.js
import { useEffect, useState } from 'react'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true // evitar actualizaciones si el componente se desmonta

    async function load() {
      try {
        const response = await fetch('/products.json')

        if (!response.ok) {
          throw new Error(`Error ${response.status}: No se pudo cargar products.json`)
        }

        const data = await response.json()
        if (isMounted) setProducts(data)
      } catch (err) {
        console.error('Error al cargar productos:', err)
        if (isMounted) setError(err.message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    load()

    // cleanup por seguridad
    return () => {
      isMounted = false
    }
  }, [])

  return { products, loading, error }
}
