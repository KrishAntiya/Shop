// Script to update admin user password
// Usage: node scripts/update-admin-password.js <email> <new_password>

const bcrypt = require('bcryptjs')
const mysql = require('mysql2/promise')
require('dotenv').config({ path: '.env.local' })

async function updateAdminPassword() {
  const email = process.argv[2]
  const password = process.argv[3]

  if (!email || !password) {
    console.error('Usage: node scripts/update-admin-password.js <email> <new_password>')
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

    // Update admin user password
    const [result] = await connection.execute(
      'UPDATE admins SET password = ? WHERE email = ?',
      [hashedPassword, email]
    )

    if (result.affectedRows === 0) {
      console.error(`No admin user found with email: ${email}`)
      process.exit(1)
    }

    console.log(`Admin password updated successfully!`)
    console.log(`Email: ${email}`)
    console.log(`You can now login with this password.`)

    await connection.end()
  } catch (error) {
    console.error('Error updating admin password:', error.message)
    process.exit(1)
  }
}

updateAdminPassword()

