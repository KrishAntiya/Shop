-- Add animal field to products table
-- This allows manually assigning products to specific animals

ALTER TABLE products 
ADD COLUMN animal VARCHAR(100) NULL AFTER category,
ADD INDEX idx_animal (animal);

-- Update existing products (optional - you can set these manually in admin panel)
-- Example:
-- UPDATE products SET animal = 'Dog' WHERE category LIKE '%Dog%';
-- UPDATE products SET animal = 'Cat' WHERE category LIKE '%Cat%';

