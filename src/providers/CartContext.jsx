import { createContext, useContext, useState, useMemo } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([]) // {id, name, price, qty}

  const addItem = (product, qty = 1) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === product.id)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty }
        return copy
      }
      return [...prev, { ...product, qty }]
    })
  }

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id))
  const clear = () => setItems([])

  const total = useMemo(() => items.reduce((acc, i) => acc + i.price * i.qty, 0), [items])
  const count = useMemo(() => items.reduce((acc, i) => acc + i.qty, 0), [items])

  const value = { items, addItem, removeItem, clear, total, count }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  return useContext(CartContext)
}
