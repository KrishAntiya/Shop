# SwastikPharma Admin Panel Setup Guide

## Overview

This admin panel provides secure management of your veterinary pharmacy e-commerce website with the following features:

- **Admin Authentication** - Secure login with JWT tokens
- **Brand Management** - Create and manage product brands
- **Product Management** - Full CRUD operations for products
- **Bulk Product Upload** - Upload products from Marg ERP CSV/Excel files
- **Stock & Price Sync** - Sync stock and prices from Marg ERP
- **Orders Management** - View and manage customer orders
- **Dashboard** - Overview of key metrics

## Prerequisites

1. MySQL database server installed and running
2. Node.js 18+ installed
3. All npm packages installed (`npm install`)

## Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE swastik_pharma CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. Import the database schema:
```bash
mysql -u root -p swastik_pharma < lib/db-init.sql
```

Or manually run the SQL file `lib/db-init.sql` in your MySQL client.

3. Create your first admin user:
```sql
-- Generate a password hash using bcrypt (use an online tool or Node.js script)
-- Example: password "admin123" should be hashed
INSERT INTO admins (email, password, role) 
VALUES ('your-email@swastikpharma.in', '$2b$10$YOUR_HASHED_PASSWORD_HERE', 'super_admin');
```

**Important**: Change the default password immediately after first login!

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_database_password
DB_NAME=swastik_pharma

# JWT Secret (generate a random string for production)
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Node Environment
NODE_ENV=development
```

**Security Note**: Never commit `.env.local` to version control. Use strong, random values for `JWT_SECRET` in production.

## Installing Dependencies

The following packages are required (install with `npm install`):

- `mysql2` - MySQL database client
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token generation
- `xlsx` - Excel file parsing
- `papaparse` - CSV file parsing

All packages should already be installed. If not, run:
```bash
npm install mysql2 bcryptjs jsonwebtoken xlsx papaparse
```

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Access the admin panel:
```
http://localhost:3000/admin/login
```

3. Login with your admin credentials

## Admin Panel Features

### 1. Dashboard (`/admin`)
- Overview statistics (products, brands, orders, low stock)
- Quick action links

### 2. Brand Management (`/admin/brands`)
- Add, edit, delete brands
- Auto-generates slugs from brand names
- Upload brand logos

### 3. Product Management (`/admin/products`)
- List all products with pagination
- Search and filter by brand/status
- Edit product status (active/inactive/out_of_stock)
- Delete products
- Link to add/edit individual products

### 4. Bulk Product Upload (`/admin/upload`)
- Upload CSV or Excel files from Marg ERP
- Auto-creates brands if they don't exist
- Preview and validate data before saving
- Required columns: item_code, name, mrp, price
- Optional columns: stock, brand, category, description

### 5. Stock & Price Sync (`/admin/sync`)
- Upload Marg ERP export files
- Updates only stock and price fields
- Matches products by item_code
- Preserves images and descriptions

### 6. Orders Management (`/admin/orders`)
- View all customer orders
- Filter by order status
- View order details
- Update order and payment status

## File Upload Format

### Bulk Upload (CSV/Excel)
Required columns:
- `item_code` - Product SKU/Item Code
- `name` - Product Name
- `mrp` - Maximum Retail Price
- `price` - Selling Price

Optional columns:
- `stock` - Available Stock Quantity
- `brand` - Brand Name (will be created if doesn't exist)
- `category` - Product Category
- `description` - Product Description

### Stock Sync (CSV/Excel)
Required columns:
- `item_code` - Product SKU (for matching)
- `price` - Updated Selling Price (optional)
- `stock` - Updated Stock Quantity (optional)

## Security Features

1. **Authentication**: JWT-based authentication with HTTP-only cookies
2. **Route Protection**: All admin routes and APIs are protected
3. **Password Hashing**: Passwords are hashed using bcrypt
4. **Input Validation**: All inputs are validated and sanitized
5. **SQL Injection Protection**: Parameterized queries are used
6. **CSRF Protection**: HTTP-only cookies prevent CSRF attacks

## API Endpoints

All API endpoints are prefixed with `/api/admin` and require authentication:

- `POST /api/admin/auth/login` - Admin login
- `POST /api/admin/auth/logout` - Admin logout
- `GET /api/admin/auth/me` - Get current admin user
- `GET /api/admin/stats` - Get dashboard statistics
- `GET/POST /api/admin/brands` - List/Create brands
- `GET/PUT/DELETE /api/admin/brands/[id]` - Brand operations
- `GET/POST /api/admin/products` - List/Create products
- `GET/PUT/DELETE /api/admin/products/[id]` - Product operations
- `POST /api/admin/products/upload` - Bulk upload products
- `POST /api/admin/products/sync` - Sync stock and prices
- `GET /api/admin/orders` - List orders
- `GET/PUT /api/admin/orders/[id]` - Order operations

## Troubleshooting

### Database Connection Errors
- Verify MySQL is running
- Check database credentials in `.env.local`
- Ensure database exists and schema is imported

### Authentication Issues
- Clear browser cookies
- Verify JWT_SECRET is set in `.env.local`
- Check admin user exists in database

### File Upload Errors
- Verify file format (CSV or Excel)
- Check required columns are present
- Ensure file encoding is UTF-8 for CSV files

### Import Errors
- Check file format matches expected columns
- Verify data types (numbers for prices/stock)
- Review error messages for specific row issues

## Production Deployment

1. Set `NODE_ENV=production` in environment variables
2. Use strong, random `JWT_SECRET`
3. Use secure database credentials
4. Enable HTTPS
5. Set up database backups
6. Monitor error logs
7. Regularly update dependencies

## Support

For issues or questions, contact the development team.

