// Script to update admin user email and/or password
// Usage: 
//   node scripts/update-admin.js <old_email> <new_email> <new_password>
//   node scripts/update-admin.js <old_email> --email <new_email>
//   node scripts/update-admin.js <old_email> --password <new_password>

const bcrypt = require('bcryptjs')
const mysql = require('mysql2/promise')
require('dotenv').config({ path: '.env.local' })

async function updateAdmin() {
  const args = process.argv.slice(2)
  
  if (args.length < 2) {
    console.error('Usage:')
    console.error('  Update both email and password:')
    console.error('    node scripts/update-admin.js <old_email> <new_email> <new_password>')
    console.error('  Update only email:')
    console.error('    node scripts/update-admin.js <old_email> --email <new_email>')
    console.error('  Update only password:')
    console.error('    node scripts/update-admin.js <old_email> --password <new_password>')
    process.exit(1)
  }

  const oldEmail = args[0]
  let newEmail = null
  let newPassword = null

  // Parse arguments
  if (args[1] === '--email') {
    newEmail = args[2]
  } else if (args[1] === '--password') {
    newPassword = args[2]
  } else {
    // Both email and password provided
    newEmail = args[1]
    newPassword = args[2]
  }

  if (!newEmail && !newPassword) {
    console.error('Error: You must provide either --email, --password, or both')
    process.exit(1)
  }

  try {
    // Hash password if provided
    let hashedPassword = null
    if (newPassword) {
      hashedPassword = await bcrypt.hash(newPassword, 10)
      console.log('Password hashed successfully')
    }

    // Connect to database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'swastik_pharma',
    })

    // Build update query
    const updates = []
    const params = []
    
    if (newEmail) {
      updates.push('email = ?')
      params.push(newEmail)
    }
    
    if (hashedPassword) {
      updates.push('password = ?')
      params.push(hashedPassword)
    }
    
    params.push(oldEmail) // For WHERE clause
    
    const [result] = await connection.execute(
      `UPDATE admins SET ${updates.join(', ')} WHERE email = ?`,
      params
    )

    if (result.affectedRows === 0) {
      console.error(`No admin user found with email: ${oldEmail}`)
      process.exit(1)
    }

    console.log('\n✅ Admin updated successfully!')
    if (newEmail) {
      console.log(`📧 Email: ${oldEmail} → ${newEmail}`)
    }
    if (newPassword) {
      console.log(`🔑 Password: Updated`)
    }
    console.log(`\nYou can now login with the new credentials.\n`)

    await connection.end()
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.error(`Error: Email "${newEmail}" already exists. Please use a different email.`)
    } else {
      console.error('Error updating admin:', error.message)
    }
    process.exit(1)
  }
}

updateAdmin()

