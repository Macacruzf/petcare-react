// src/contexts/CartContext.jsx
import { createContext, useContext, useMemo, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage('cart', []);
  const [currentUserId, setCurrentUserId] = useState(localStorage.getItem('userId'));

  // Detectar cambio de usuario y limpiar carrito automaticamente
  useEffect(() => {
    const interval = setInterval(() => {
      const userId = localStorage.getItem('userId');
      
      if (userId !== currentUserId) {
        console.log('Usuario cambio, limpiando carrito...');
        setItems([]);
        setCurrentUserId(userId);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [currentUserId, setItems]);

  // Agregar producto al carrito
  const addItem = (product, qty = 1) => {
    if (qty <= 0) return;
    
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

  // Eliminar producto por ID
  const removeItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  // Incrementar cantidad de un producto
  const incrementItem = (id) => {
    setItems(prev => prev.map(i => 
      i.id === id ? { ...i, qty: i.qty + 1 } : i
    ));
  };

  // Decrementar cantidad de un producto
  const decrementItem = (id) => {
    setItems(prev => prev.map(i => 
      i.id === id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i
    ));
  };

  // Vaciar carrito completo
  const clearCart = () => {
    setItems([]);
  };

  // Calcular totales y conteo
  const total = useMemo(() => 
    items.reduce((acc, i) => acc + (i.precio || i.price || 0) * i.qty, 0), 
    [items]
  );
  
  const count = useMemo(() => 
    items.reduce((acc, i) => acc + i.qty, 0), 
    [items]
  );

  // Formateo de moneda (pesos chilenos)
  const formattedTotal = useMemo(() => {
    return new Intl.NumberFormat('es-CL', { 
      style: 'currency', 
      currency: 'CLP' 
    }).format(total);
  }, [total]);

  const value = { 
    items, 
    addItem, 
    removeItem, 
    incrementItem, 
    decrementItem, 
    clearCart, 
    total, 
    formattedTotal, 
    count 
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de un CartProvider');
  return context;
}
