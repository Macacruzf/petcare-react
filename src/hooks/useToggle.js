// src/hooks/useToggle.js
import { useState, useCallback } from 'react';

/**
 * Hook personalizado para manejar estados booleanos
 * @param {boolean} initialValue - Valor inicial (por defecto false)
 * @returns {Array} - [valor, toggle, setTrue, setFalse]
 */
export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  // Alternar entre true/false
  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  // Establecer en true
  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  // Establecer en false
  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return [value, toggle, setTrue, setFalse];
};
