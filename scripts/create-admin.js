// Script to create an admin user
// Usage: node scripts/create-admin.js <email> <password>

const bcrypt = require('bcryptjs')
const mysql = require('mysql2/promise')
require('dotenv').config({ path: '.env.local' })

async function createAdmin() {
  const email = process.argv[2]
  const password = process.argv[3]

  if (!email || !password) {
    console.error('Usage: node scripts/create-admin.js <email> <password>')
    process.exit(1)
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log('Password hashed successfully')

    // Connect to database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'swastik_pharma',
    })

    // Insert admin user
    const [result] = await connection.execute(
      'INSERT INTO admins (email, password, role) VALUES (?, ?, ?)',
      [email, hashedPassword, 'super_admin']
    )

    console.log(`Admin user created successfully!`)
    console.log(`Email: ${email}`)
    console.log(`ID: ${result.insertId}`)

    await connection.end()
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.error('Admin user with this email already exists')
    } else {
      console.error('Error creating admin user:', error.message)
    }
    process.exit(1)
  }
}

createAdmin()

