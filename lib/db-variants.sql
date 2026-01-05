-- Product Variants Table for packaging/sizes
-- Run this SQL script to add variant support to existing database

USE swastik_pharma;

-- Create product_variants table
CREATE TABLE IF NOT EXISTS product_variants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  name VARCHAR(100) NOT NULL, -- e.g., "250mg", "500ml", "1kg", "10L"
  weight VARCHAR(50), -- e.g., "250", "500", "1"
  unit VARCHAR(20), -- e.g., "mg", "kg", "ml", "L", "g"
  price DECIMAL(10, 2) NOT NULL,
  mrp DECIMAL(10, 2) NOT NULL,
  stock INT DEFAULT 0,
  sku VARCHAR(100), -- Optional: unique SKU for this variant
  is_default BOOLEAN DEFAULT FALSE, -- Mark default variant
  status ENUM('active', 'inactive', 'out_of_stock') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_product_id (product_id),
  INDEX idx_sku (sku),
  INDEX idx_status (status),
  INDEX idx_is_default (is_default)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Migration: Create default variant for existing products
-- This creates a variant entry for each existing product using its current price/mrp
INSERT INTO product_variants (product_id, name, weight, unit, price, mrp, stock, is_default, status)
SELECT 
  id as product_id,
  'Standard' as name,
  NULL as weight,
  NULL as unit,
  price,
  mrp,
  stock,
  TRUE as is_default,
  status
FROM products
WHERE id NOT IN (SELECT DISTINCT product_id FROM product_variants WHERE product_variants.product_id = products.id);
