-- 🔍 Script para verificar pedidos creados

-- Ver todos los pedidos
SELECT * FROM react_pedido.pedido 
ORDER BY fecha_creacion DESC;

-- Ver detalles de pedidos
SELECT 
    p.id as pedido_id,
    p.nombre_usuario,
    p.email_usuario,
    p.estado,
    p.total,
    p.fecha_creacion,
    dp.id as detalle_id,
    dp.producto_id,
    dp.nombre_producto,
    dp.cantidad,
    dp.precio,
    dp.subtotal
FROM react_pedido.pedido p
LEFT JOIN react_pedido.detalle_pedido dp ON p.id = dp.pedido_id
ORDER BY p.fecha_creacion DESC, dp.id;

-- Contar pedidos por estado
SELECT estado, COUNT(*) as cantidad
FROM react_pedido.pedido
GROUP BY estado;
