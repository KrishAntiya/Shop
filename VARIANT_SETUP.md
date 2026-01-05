# Product Variants/Packaging Setup Guide

## Overview
This feature allows products to have multiple packaging variants (e.g., 250mg, 500mg, 1kg, 10kg for solids, or 100ml, 500ml, 1L, 5L for liquids).

## Database Setup

1. Run the SQL script to create the variants table:
   ```sql
   -- Copy and paste the contents of lib/db-variants.sql into phpMyAdmin SQL tab
   ```

2. The script will:
   - Create `product_variants` table
   - Migrate existing products to have a default "Standard" variant
   - Set up proper indexes and foreign keys

## Usage

### Adding Variants to Products
Variants can be added through the admin panel (once implemented) or directly via SQL:
```sql
INSERT INTO product_variants (product_id, name, weight, unit, price, mrp, stock, is_default, status)
VALUES (1, '500mg', '500', 'mg', 299.00, 349.00, 50, FALSE, 'active');
```

### Variant Naming Convention
- Solids (tablets/powders): Use weight + unit (e.g., "250mg", "500mg", "1kg", "10kg", "20kg")
- Liquids (syrups/tonics): Use volume + unit (e.g., "100ml", "200ml", "500ml", "1L", "5L", "10L", "20L")
- Injections/Vaccines: Use volume (e.g., "10ml", "30ml")

## API Changes
The products API now includes a `variants` array with all available variants for each product.

## UI Changes
ProductCard component now shows a variant selector dropdown when multiple variants are available.

