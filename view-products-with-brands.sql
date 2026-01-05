-- Query to view products with their brand names
-- This shows how products are linked to brands using brand_id

SELECT 
    p.id,
    p.item_code,
    p.name AS product_name,
    b.name AS brand_name,
    p.category,
    p.mrp,
    p.price,
    p.stock,
    p.status,
    p.created_at
FROM products p
LEFT JOIN brands b ON p.brand_id = b.id
ORDER BY p.created_at DESC;

-- If you want to see only products that have a brand assigned:
-- SELECT 
--     p.id,
--     p.item_code,
--     p.name AS product_name,
--     b.name AS brand_name,
--     p.category,
--     p.mrp,
--     p.price,
--     p.stock,
--     p.status
-- FROM products p
-- INNER JOIN brands b ON p.brand_id = b.id
-- ORDER BY p.created_at DESC;

-- To see products without a brand:
-- SELECT 
--     p.id,
--     p.item_code,
--     p.name AS product_name,
--     p.brand_id,
--     p.category,
--     p.mrp,
--     p.price,
--     p.stock,
--     p.status
-- FROM products p
-- WHERE p.brand_id IS NULL;

