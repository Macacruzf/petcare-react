// src/hooks/useFetch.js
import { useState, useEffect } from 'react';

/**
 * Hook personalizado para realizar peticiones HTTP
 * @param {string} url - URL de la petición
 * @param {Object} options - Opciones de fetch
 * @returns {Object} - Objeto con data, loading, error y refetch
 */
export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (url) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  // Función para volver a hacer la petición manualmente
  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
};
