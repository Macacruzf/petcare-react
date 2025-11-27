// src/contexts/CartContext.jsx
import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks';

const CartContext = createContext();

export function CartProvider({ children }) {
  // 🎣 Hook personalizado useLocalStorage
  const [items, setItems] = useLocalStorage('cart', []);

  //  Agregar producto al carrito
  const addItem = (product, qty = 1) => {
    if (qty <= 0) return; // Evitar cantidades inválidas
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === product.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
        return copy;
      }
      return [...prev, { ...product, qty }];
    });
  };

  //  Eliminar producto por ID
  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));

  //  Vaciar carrito completo
  const clearCart = () => setItems([]);

  //  Calcular totales y conteo
  const total = useMemo(() => items.reduce((acc, i) => acc + i.price * i.qty, 0), [items]);
  const count = useMemo(() => items.reduce((acc, i) => acc + i.qty, 0), [items]);

  //  Formateo de moneda (pesos chilenos)
  const formattedTotal = useMemo(() => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(total);
  }, [total]);

  //  Contexto compartido
  const value = { items, addItem, removeItem, clearCart, total, formattedTotal, count };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

//  Hook personalizado con protección
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de un CartProvider');
  return context;
}
