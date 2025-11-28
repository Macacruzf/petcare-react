-- Script para actualizar imágenes de productos
-- Las imágenes deben estar en la carpeta public/ del proyecto React
-- Ejecutar desde PowerShell:
-- & "C:\laragon\bin\mysql\mysql-8.4.3-winx64\bin\mysql.exe" -u root react_producto -e "source agregar_imagenes_productos.sql"

-- Las rutas apuntan a la carpeta public/ (accesibles como /imagen.jpg en el navegador)
UPDATE producto SET imagen = '/arnes.jpg' WHERE id = 1;
UPDATE producto SET imagen = '/cama.jpg' WHERE id = 2;
UPDATE producto SET imagen = '/casagato.jpg' WHERE id = 3;
UPDATE producto SET imagen = '/collar.jpg' WHERE id = 4;
UPDATE producto SET imagen = '/comidagato.jpg' WHERE id = 5;
UPDATE producto SET imagen = '/correa.jpg' WHERE id = 6;
UPDATE producto SET imagen = '/juguete.jpg' WHERE id = 7;
UPDATE producto SET imagen = '/plato.jpg' WHERE id = 8;
UPDATE producto SET imagen = '/shampo.jpg' WHERE id = 9;

-- Verificar las actualizaciones
SELECT id, nombre, imagen FROM react_producto.producto;
